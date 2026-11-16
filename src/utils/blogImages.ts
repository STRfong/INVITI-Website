// 文章封面圖：產品更新文章依標題配專屬插圖，其他文章依序使用原本的照片
// （原本依文章排序位置配圖，新增文章後順序一變，圖就會配錯）
import blog1 from '../assets/Blog/img/blog1.jpeg.webp';
import blog2 from '../assets/Blog/img/blog2.jpeg.webp';
import blog3 from '../assets/Blog/img/blog3.jpeg.webp';
import blog4 from '../assets/Blog/img/blog4.jpeg.webp';
import blog5 from '../assets/Blog/img/blog5.jpeg.webp';
import blog6 from '../assets/Blog/img/blog6.jpeg.webp';
import blog7 from '../assets/Blog/img/blog7.jpeg.webp';
import blogUpdate1 from '../assets/Blog/img/blog_update1.webp';
import blogUpdate2 from '../assets/Blog/img/blog_update2.webp';
import blogUpdate3 from '../assets/Blog/img/blog_update3.webp';
import blogUpdate4 from '../assets/Blog/img/blog_update4.webp';
import blogUpdate5 from '../assets/Blog/img/blog_update5.webp';

const IMAGE_BY_TITLE: Array<[string, string]> = [
  ['邀請說帖', blogUpdate1],
  ['引導式教學', blogUpdate2],
  ['場次表單開關', blogUpdate3],
  ['貴賓自助調整出席', blogUpdate4],
  ['邀請表單欄位設定', blogUpdate5],
];

const FALLBACK_IMAGES = [blog1, blog2, blog3, blog4, blog5, blog6, blog7, blog1];

/** 依文章列表（已排序）回傳 { 文章 id: 封面圖 } */
export function getBlogImageMap(posts: Array<{ id: string; title: string }>): Record<string, string> {
  const map: Record<string, string> = {};
  let next = 0;
  for (const post of posts) {
    const hit = IMAGE_BY_TITLE.find(([keyword]) => post.title.includes(keyword));
    map[post.id] = hit ? hit[1] : (FALLBACK_IMAGES[next++] || '');
  }
  return map;
}
