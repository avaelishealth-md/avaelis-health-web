export type Audience = "public" | "clinician";
export type PostStatus = "draft" | "published";

// A verified citation carried over from the content engine (Europe PMC / PubMed).
export interface PostRef {
  title: string;
  authors?: string;
  journal?: string;
  year?: string;
  url: string;
  pmid?: string;
  pubTypes?: string[];
  citedBy?: number;
}

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
  refs: PostRef[] | null;
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
