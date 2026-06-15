export type Audience = "public" | "clinician";
export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_image: string | null;
  audience: Audience;
  status: PostStatus;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  read_minutes: number | null;
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
