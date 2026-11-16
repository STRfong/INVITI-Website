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

export interface Heading {
  id: string;
  text: string;
  level: number;
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
  
  // Process lists line by line to handle them correctly with indentation support
  const lines = html.split('\n');
  const processedLines: string[] = [];
  
  // Track list state at each indentation level
  // 每一層清單各自記錄是否有還沒關的 <li>，子清單要先關、再關外層的 <li>，HTML 結構才會正確
  // （原本只記一個 <li>，子清單後面接回上一層時會先關 </li> 再關 </ul>，造成結構錯亂、間距跑掉）
  interface ListState {
    type: 'ul' | 'ol';
    level: number;
    liOpen: boolean;
  }
  const listStack: ListState[] = [];

  function getIndentLevel(line: string): number {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  }

  function closeTop() {
    const state = listStack.pop()!;
    if (state.liOpen) processedLines.push('</li>');
    processedLines.push(state.type === 'ul' ? '</ul>' : '</ol>');
  }

  function closeAllLists() {
    while (listStack.length > 0) closeTop();
  }

  function openListItem(type: 'ul' | 'ol', indentLevel: number, liHtml: string) {
    // 比這一層深的清單先全部關掉
    while (listStack.length > 0 && listStack[listStack.length - 1].level > indentLevel) {
      closeTop();
    }
    let top = listStack.length > 0 ? listStack[listStack.length - 1] : null;
    if (top && top.level === indentLevel && top.type !== type) {
      closeTop();
      top = listStack.length > 0 ? listStack[listStack.length - 1] : null;
    }
    if (top && top.level === indentLevel) {
      // 同一層的下一個項目：關掉上一個 <li>
      if (top.liOpen) processedLines.push('</li>');
    } else {
      // 新的一層（第一層或子清單）：外層的 <li> 保持開著，子清單放在裡面
      top = { type, level: indentLevel, liOpen: false };
      listStack.push(top);
      processedLines.push(type === 'ul' ? '<ul>' : '<ol>');
    }
    processedLines.push(liHtml);
    top.liOpen = true;
  }

  function isListLine(line: string): boolean {
    return /^\s*([-*+]|\d+\.)\s+/.test(line);
  }

  function nextNonEmpty(from: number): string | null {
    for (let j = from; j < lines.length; j++) {
      if (lines[j].trim()) return lines[j];
    }
    return null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const indentLevel = getIndentLevel(line);

    if (!trimmed) {
      // 空行：後面還是條列、或是縮排的說明文字（Notion 匯出常見），清單就不要斷開
      const next = nextNonEmpty(i + 1);
      const continues = listStack.length > 0 && next !== null &&
        (isListLine(next) || getIndentLevel(next) > listStack[0].level);
      if (!continues) {
        closeAllLists();
        processedLines.push('');
      }
      continue;
    }

    // 縮排的一般文字（不是條列）：屬於上方條列項目的說明段落，放進該項目裡
    const isImage = trimmed.startsWith('<img');
    // 緊接在條列項目下一行、沒有空行的文字，就算沒縮排也算同一個項目的延續（Markdown 的規則）
    const prevLine = i > 0 ? lines[i - 1] : '';
    const isLazyContinuation = listStack.length > 0 && prevLine.trim() !== '' && indentLevel <= listStack[0].level;
    if (listStack.length > 0 && (indentLevel > listStack[0].level || isLazyContinuation) &&
        !isListLine(line) && (isImage || !trimmed.startsWith('<'))) {
      while (listStack.length > 1 && listStack[listStack.length - 1].level >= indentLevel) {
        closeTop();
      }
      if (isImage) {
        processedLines.push(trimmed);
      } else if (trimmed.startsWith('｜')) {
        // 「｜」開頭：條列項目底下的補充提醒（細字，跟上一行的第一個字對齊）
        processedLines.push(`<p class="list-note">${trimmed}</p>`);
      } else {
        processedLines.push(`<p>${trimmed}</p>`);
      }
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (unorderedMatch) {
      openListItem('ul', indentLevel, `<li>${unorderedMatch[1]}`);
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      // Preserve the original numbering by using the value attribute
      openListItem('ol', indentLevel, `<li value="${orderedMatch[1]}">${orderedMatch[2]}`);
      continue;
    }

    // Not a list item - close all lists
    closeAllLists();
    processedLines.push(line);
  }

  // Close any remaining open lists
  closeAllLists();

  html = processedLines.join('\n');
  
  // Paragraphs (lines that aren't already HTML tags)
  // Don't wrap img tags in paragraphs - they should be standalone
  html = html.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    // Already HTML (including img tags)；粗體、連結等行內標籤開頭的仍是一般段落，要包成 <p>
    if (trimmed.startsWith('<') && !/^<(strong|em|b|i|a|code)[\s>]/.test(trimmed)) return trimmed;
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

// Extract H2 headings from markdown content
export function extractH2Headings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Match H2 headings (## heading)
    const h2Match = trimmed.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = h2Match[1]
        .replace(/\*\*/g, '') // Remove bold markers
        .trim();
      
      // Generate ID using the same logic as markdownToHTML
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u4e00-\u9fff-]/g, '')
        .replace(/[？?！!。，,]/g, '');
      
      headings.push({
        id,
        text,
        level: 2
      });
    }
  }
  
  return headings;
}

