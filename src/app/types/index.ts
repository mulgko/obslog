// 마크다운 파일의 frontmatter 타입
export interface PostFrontmatter {
  title: string;
  subject: string;
  reference?: string;
  date: string;
  description?: string;
  tags?: string[];
  series?: string;
  seriesOrder?: number;
  published: boolean;
  thumbnail?: string;
}

// 포스트 목록에서 사용 가능 (본문없이 메타데이터만)
export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  thumbnail: string | null;
  originalFileName: string;
}

// 포스트 상세 페이지에서 사용 가능 (본문 포함)
export interface Post extends PostMeta {
  content: string;
}
