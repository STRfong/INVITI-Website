// Simple markdown parser to convert markdown to HTML
// This is a basic parser - for production, consider using a library like marked or remark

export interface ParsedMarkdown {
  frontmatter: {
    author?: string;
    date?: string;
    category?: string;
    readTime?: number;
  };
  content: string;
  excerpt: string;
}

export function parseMarkdown(markdown: string): ParsedMarkdown {
  const lines = markdown.split('\n');
  const frontmatter: ParsedMarkdown['frontmatter'] = {};
  let frontmatterEnd = 0;
  let hasFrontmatter = false;
  
  // Parse frontmatter (first few lines with key: value format)
  // Only parse if we find frontmatter keys, otherwise treat everything as content
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i];
    if (line.includes('撰寫人:')) {
      frontmatter.author = line.split('撰寫人:')[1]?.trim() || '';
      hasFrontmatter = true;
    } else if (line.includes('撰寫時間:')) {
      frontmatter.date = line.split('撰寫時間:')[1]?.trim() || '';
      hasFrontmatter = true;
    } else if (line.includes('種類:')) {
      frontmatter.category = line.split('種類:')[1]?.trim() || '';
      hasFrontmatter = true;
    } else if (line.includes('閱讀時間（分鐘）:')) {
      const timeStr = line.split('閱讀時間（分鐘）:')[1]?.trim() || '0';
      frontmatter.readTime = parseInt(timeStr, 10);
      hasFrontmatter = true;
    } else if (line.startsWith('#') && hasFrontmatter) {
      // First heading after frontmatter - content starts here (include the heading)
      frontmatterEnd = i;
      break;
    }
  }
  
  // If no frontmatter found, use all content (including all headings)
  // If frontmatter found, skip only the frontmatter lines but keep all headings
  let contentLines = hasFrontmatter && frontmatterEnd > 0 
    ? lines.slice(frontmatterEnd)  // Include the heading line
    : lines;  // Use all lines if no frontmatter
  
  // Remove the first line if it starts with '# ' (single hash with space)
  if (contentLines.length > 0 && contentLines[0].trim().startsWith('# ')) {
    contentLines = contentLines.slice(1);
  }
  
  const content = markdownToHTML(contentLines.join('\n'));
  
  // Generate excerpt (first paragraph or first 200 chars)
  const excerpt = generateExcerpt(contentLines.join('\n'));
  
  return {
    frontmatter,
    content,
    excerpt
  };
}

function generateExcerpt(markdown: string): string {
  // Remove markdown syntax for excerpt
  let text = markdown
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
    .replace(/^[-*+]\s+/gm, '') // Remove list markers
    .replace(/^>\s+/gm, '') // Remove blockquotes
    .trim();
  
  // Get first paragraph or first 200 characters
  const firstParagraph = text.split('\n\n')[0] || text;
  if (firstParagraph.length > 200) {
    return firstParagraph.substring(0, 200) + '...';
  }
  return firstParagraph;
}

function markdownToHTML(markdown: string): string {
  let html = markdown;
  
  // IMPORTANT: Process images FIRST, before links and other markdown
  // This prevents images from being converted to links
  html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, (match, alt, src) => {
    // Extract filename from path (handle URL encoded paths and various path formats)
    let filename = '';
    try {
      // Try to decode the path
      const decodedPath = decodeURIComponent(src);
      // Extract filename (last part after / or \)
      filename = decodedPath.split('/').pop() || decodedPath.split('\\').pop() || '';
      // Remove any query parameters or fragments
      filename = filename.split('?')[0].split('#')[0];
    } catch (e) {
      // If decoding fails, try to extract from original path
      filename = src.split('/').pop() || src.split('\\').pop() || '';
      filename = filename.split('?')[0].split('#')[0];
    }
    
    // Clean up filename - handle special cases like "場次邀請表單 1.png" -> "場次邀請表單.png"
    // Remove trailing numbers before extension (e.g., " 1.png" -> ".png")
    filename = filename.replace(/\s+\d+(?=\.(png|jpg|jpeg|gif|webp|svg)$)/i, '');
    
    // If no filename or doesn't look like an image, return original
    if (!filename || !filename.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
      return match;
    }
    
    // Use data attribute to identify images that need path resolution in InstructionPostPage
    // The actual path will be resolved using Vite's glob import
    return `<img data-instruction-image="${filename}" alt="${alt || ''}" style="max-width: 100%; height: auto;" />`;
  });
  
  // Headers with IDs for anchor links
  html = html.replace(/^### (.*$)/gim, (match, text) => {
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]/g, '')
      .replace(/[？?！!。，,]/g, '');
    return `<h3 id="${id}" data-anchor="${id}">${text}</h3>`;
  });
  html = html.replace(/^## (.*$)/gim, (match, text) => {
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]/g, '')
      .replace(/[？?！!。，,]/g, '');
    return `<h2 id="${id}" data-anchor="${id}">${text}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, (match, text) => {
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]/g, '')
      .replace(/[？?！!。，,]/g, '');
    return `<h1 id="${id}" data-anchor="${id}">${text}</h1>`;
  });
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links (images are already processed above, so this won't match them)
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (match, text, href) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr/>');
  
  // Blockquotes
  html = html.replace(/^>\s+(.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Process lists line by line to handle them correctly
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inUnorderedList = false;
  let inOrderedList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check for unordered list item
    const unorderedMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (unorderedMatch) {
      if (!inUnorderedList) {
        if (inOrderedList) {
          processedLines.push('</ol>');
          inOrderedList = false;
        }
        processedLines.push('<ul>');
        inUnorderedList = true;
      }
      processedLines.push(`<li>${unorderedMatch[1]}</li>`);
      continue;
    }
    
    // Check for ordered list item
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      if (!inOrderedList) {
        if (inUnorderedList) {
          processedLines.push('</ul>');
          inUnorderedList = false;
        }
        processedLines.push('<ol>');
        inOrderedList = true;
      }
      processedLines.push(`<li>${orderedMatch[1]}</li>`);
      continue;
    }
    
    // Not a list item - close any open lists
    if (inUnorderedList) {
      processedLines.push('</ul>');
      inUnorderedList = false;
    }
    if (inOrderedList) {
      processedLines.push('</ol>');
      inOrderedList = false;
    }
    
    processedLines.push(line);
  }
  
  // Close any remaining open lists
  if (inUnorderedList) {
    processedLines.push('</ul>');
  }
  if (inOrderedList) {
    processedLines.push('</ol>');
  }
  
  html = processedLines.join('\n');
  
  // Paragraphs (lines that aren't already HTML tags)
  // Don't wrap img tags in paragraphs - they should be standalone
  html = html.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return trimmed; // Already HTML (including img tags)
    return '<p>' + trimmed + '</p>';
  }).join('\n');
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  // Clean up nested lists
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  html = html.replace(/<\/ol>\s*<ol>/g, '');
  
  // Clean up paragraphs that contain only img tags (img should not be in p tags)
  html = html.replace(/<p>(<img[^>]*>)<\/p>/g, '$1');
  
  return html;
}

