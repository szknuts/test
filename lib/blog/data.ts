/**
 * ブログ記事データ
 * 活動報告や試合結果などの記事をここに定義
 */
import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "title test",
    content: "content test",
    excerpt: "except test",
    author: "author test",
    date: "2024-03-15",
    category: "category test",
    slug: "slug-test",
  },
  {
    id: "2",
    title: "a",
    content: "...",
    excerpt: "a",
    author: "マネージャー",
    date: "2024-01-10",
    category: "a",
    slug: "a",
  },
];
