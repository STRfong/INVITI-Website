// Blog data utility - parses CSV and maps to markdown files

// Import CSV as raw text
// @ts-ignore - Vite handles ?raw imports
import blogListCsv from '../assets/Blog/lists.csv?raw';

// Import all markdown files at build time using Vite's glob
// @ts-ignore - Vite's import.meta.glob is not in TypeScript types
const markdownModules = import.meta.glob('../assets/Blog/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
}) as Record<string, string>;

export interface BlogPostMetadata {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  markdownPath: string;
}

export interface BlogPost extends BlogPostMetadata {
  excerpt: string;
  content: string;
}

/** Parse date string from blog CSV (e.g. "2025年11月27日", "2026年2月6日") to timestamp for sorting. */
function parseBlogDate(dateStr: string): number {
  if (!dateStr || !dateStr.trim()) return 0;
  const s = dateStr.trim();
  const match = s.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);
  if (match) {
    const [, y, m, d] = match;
    const date = new Date(parseInt(y!, 10), parseInt(m!, 10) - 1, parseInt(d!, 10));
    return date.getTime();
  }
  return new Date(s).getTime();
}

// Parse CSV data with proper handling of quoted fields
function parseCSV(csvText: string): BlogPostMetadata[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  // Find column indices
  const nameIdx = headers.findIndex(h => h.includes('名稱'));
  const authorIdx = headers.findIndex(h => h.includes('撰寫人'));
  const dateIdx = headers.findIndex(h => h.includes('撰寫時間'));
  const categoryIdx = headers.findIndex(h => h.includes('種類'));
  const readTimeIdx = headers.findIndex(h => h.includes('閱讀時間'));

  const posts: BlogPostMetadata[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Handle CSV parsing with quoted fields
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Last value
    
    const title = values[nameIdx]?.trim() || '';
    if (!title) continue;
    
    // Generate ID from title - use a simple hash-based approach
    // Create a URL-safe slug from title
    let id = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]/g, '') // Keep Chinese characters, word chars, and hyphens
      .substring(0, 100);
    
    // If ID is empty or too short, use index as fallback
    if (!id || id.length < 3) {
      id = `post-${i}`;
    }
    
    // Find matching markdown file by title
    // Files are named like: "標題 hash.md"
    const markdownPath = Object.keys(markdownModules).find(path => {
      try {
        const decodedPath = decodeURIComponent(path);
        // Check if path contains the title (before the hash)
        // Remove file extension and hash for comparison
        const pathWithoutExt = decodedPath.replace(/\.md$/, '').replace(/\s+[a-f0-9]+$/i, '');
        return pathWithoutExt.includes(title) || decodedPath.includes(title);
      } catch (e) {
        // If decode fails, try direct comparison
        return path.includes(encodeURIComponent(title));
      }
    }) || '';
    
    posts.push({
      id,
      title,
      author: values[authorIdx]?.trim() || '',
      date: values[dateIdx]?.trim() || '',
      category: values[categoryIdx]?.trim() || '',
      readTime: parseInt(values[readTimeIdx]?.trim() || '0', 10),
      markdownPath
    });
  }
  
  return posts;
}

// Get all blog posts metadata, sorted newest first
export function getAllBlogPosts(): BlogPostMetadata[] {
  const posts = parseCSV(blogListCsv);
  const sorted = [...posts].sort((a, b) => {
    const dateA = parseBlogDate(a.date || '');
    const dateB = parseBlogDate(b.date || '');
    return dateB - dateA; // 從新到舊
  });
  if (import.meta.env?.DEV) {
    console.debug('[getAllBlogPosts] sort (newest first):', sorted.map((p, i) => ({
      order: i + 1,
      title: p.title.slice(0, 30),
      rawDate: p.date,
      parsed: parseBlogDate(p.date) ? new Date(parseBlogDate(p.date)).toISOString().slice(0, 10) : 'invalid',
    })));
  }
  return sorted;
}

// Get blog post by ID
export function getBlogPostById(id: string): BlogPostMetadata | undefined {
  const posts = getAllBlogPosts();
  return posts.find(post => post.id === id);
}

// Get markdown content by path
export function getMarkdownContent(markdownPath: string): string {
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

// Find markdown file by title
export function findMarkdownByTitle(title: string): string {
  const posts = getAllBlogPosts();
  const post = posts.find(p => p.title === title);
  if (post && post.markdownPath) {
    return getMarkdownContent(post.markdownPath);
  }
  
  // Fallback: search all markdown files
  for (const [path, content] of Object.entries(markdownModules)) {
    const decodedPath = decodeURIComponent(path);
    if (decodedPath.includes(title)) {
      return content as string;
    }
  }
  
  return '';
}

