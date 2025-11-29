// Instruction data utility - reads markdown files from Instruction folder

// Import all markdown files at build time using Vite's glob
// @ts-ignore - Vite's import.meta.glob is not in TypeScript types
const markdownModules = import.meta.glob('../assets/Instruction/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
}) as Record<string, string>;

export interface InstructionMetadata {
  id: string;
  title: string;
  markdownPath: string;
}

// Extract metadata from markdown file
function extractMetadata(markdownPath: string, content: string): InstructionMetadata | null {
  // Priority 1: Extract title from markdown content (first # heading)
  let title = '';
  const lines = content.split('\n');
  for (let i = 0; i < Math.min(20, lines.length); i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').trim();
      break;
    }
  }
  
  // Priority 2: If no title in content, extract from filename
  if (!title) {
    const filename = markdownPath.split('/').pop() || '';
    title = filename.replace(/\.md$/, '');
    
    // Remove hash suffix (format: " title hash.md" -> " title")
    // Hash is typically 32 hex characters, but we'll match any trailing hex string after space
    title = title.replace(/\s+[a-f0-9]{8,}$/i, '');
  }
  
  // Priority 3: Fallback to filename without extension
  if (!title) {
    const filename = markdownPath.split('/').pop() || '';
    title = filename.replace(/\.md$/, '').replace(/[_-]/g, ' ');
  }
  
  if (!title) return null;
  
  // Generate ID from filename (for consistent routing)
  // Use filename to generate ID so links work correctly
  const filename = markdownPath.split('/').pop() || '';
  const filenameWithoutExt = filename.replace(/\.md$/, '').replace(/\s+[a-f0-9]{8,}$/i, '');
  const id = filenameWithoutExt
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '') // Keep Chinese characters, word chars, and hyphens
    .substring(0, 100);
  
  return {
    id: id || markdownPath,
    title, // Use title from markdown content
    markdownPath
  };
}

// Get all instruction posts metadata
export function getAllInstructions(): InstructionMetadata[] {
  const instructions: InstructionMetadata[] = [];
  
  for (const [path, content] of Object.entries(markdownModules)) {
    const metadata = extractMetadata(path, content as string);
    if (metadata) {
      instructions.push(metadata);
    }
  }
  
  return instructions;
}

// Get instruction by ID
export function getInstructionById(id: string): InstructionMetadata | undefined {
  const instructions = getAllInstructions();
  return instructions.find(instruction => instruction.id === id);
}

// Get markdown content by path
export function getInstructionContent(markdownPath: string): string {
  if (!markdownPath) return '';
  
  // Direct lookup first
  if (markdownModules[markdownPath]) {
    const content = markdownModules[markdownPath];
    return typeof content === 'string' ? content : (content as any)?.default || '';
  }
  
  // Find the matching module by comparing paths
  const moduleKey = Object.keys(markdownModules).find(key => {
    try {
      // Normalize paths for comparison
      const normalizedKey = decodeURIComponent(key);
      const normalizedPath = decodeURIComponent(markdownPath);
      
      // Check various matching strategies
      return key === markdownPath || 
             normalizedKey === normalizedPath ||
             normalizedKey.includes(normalizedPath) ||
             normalizedPath.includes(normalizedKey) ||
             key.includes(markdownPath.split('/').pop() || '');
    } catch (e) {
      // Fallback to simple string matching
      return key.includes(markdownPath) || markdownPath.includes(key);
    }
  });
  
  if (moduleKey && markdownModules[moduleKey]) {
    const content = markdownModules[moduleKey];
    // Handle both string and default export
    return typeof content === 'string' ? content : (content as any)?.default || '';
  }
  
  return '';
}

// Search result interface
export interface SearchResult {
  instruction: InstructionMetadata;
  matches: {
    line: number;
    text: string;
    context: string; // Surrounding text for context
  }[];
  score: number; // Relevance score
}

// Search all instruction markdown files
export function searchInstructions(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.trim().toLowerCase();
  const results: SearchResult[] = [];
  const allInstructions = getAllInstructions();

  for (const instruction of allInstructions) {
    const content = getInstructionContent(instruction.markdownPath);
    if (!content) continue;

    const lines = content.split('\n');
    const matches: SearchResult['matches'] = [];

    // Search through each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes(searchTerm)) {
        // Find all occurrences in this line
        let searchIndex = 0;
        while ((searchIndex = lowerLine.indexOf(searchTerm, searchIndex)) !== -1) {
          // Get context (previous and next lines)
          const contextLines: string[] = [];
          const contextRange = 1; // Number of lines before/after to include
          
          for (let j = Math.max(0, i - contextRange); j <= Math.min(lines.length - 1, i + contextRange); j++) {
            if (j !== i) {
              contextLines.push(lines[j].trim());
            }
          }
          
          // Extract a snippet around the match (up to 100 chars before and after)
          const start = Math.max(0, searchIndex - 50);
          const end = Math.min(line.length, searchIndex + searchTerm.length + 50);
          const snippet = line.substring(start, end);
          
          matches.push({
            line: i + 1, // 1-indexed line number
            text: line.trim(),
            context: contextLines.join(' | ')
          });
          
          searchIndex += searchTerm.length;
        }
      }
    }

    if (matches.length > 0) {
      // Calculate relevance score
      // Higher score for:
      // - More matches
      // - Matches in title/headings
      // - Matches near the beginning of the document
      let score = matches.length;
      
      // Check if query matches title
      if (instruction.title.toLowerCase().includes(searchTerm)) {
        score += 10;
      }
      
      // Boost score for matches in headings
      for (const match of matches) {
        if (match.text.startsWith('#')) {
          score += 5;
        }
      }
      
      // Boost score for matches near the beginning
      const avgLineNumber = matches.reduce((sum, m) => sum + m.line, 0) / matches.length;
      score += Math.max(0, 10 - Math.floor(avgLineNumber / 10));

      results.push({
        instruction,
        matches: matches.slice(0, 5), // Limit to 5 matches per document
        score
      });
    }
  }

  // Sort by relevance score (descending)
  results.sort((a, b) => b.score - a.score);

  return results;
}

