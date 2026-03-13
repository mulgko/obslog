// Obslog에서 마크다운 파일을 읽어 포스트 목록을 만드는 패턴의 시작 부분.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMeta, PostFrontmatter, Post } from "../types";

const postDirectory = path.join(process.cwd(), "content", "posts");

function toPostFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  return {
    title: String(data.title ?? ""),
    subject: String(data.subject ?? ""),
    reference: String(data.reference ?? ""),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    series: String(data.series ?? ""),
    seriesOrder:
      typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
    published: Boolean(data.published),
    thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : undefined,
  };
}

function safeSlug(slug: string): string {
  // path.basename으로 디렉터리 구분자 제거 (../../ 등 경로 탈출 방지)
  const base = path.basename(slug);
  // 허용 문자: 영문자·숫자·하이픈·언더스코어만 허용
  if (!/^[a-zA-Z0-9_-]+$/.test(base)) {
    throw new Error(`Invalid slug: "${slug}"`);
  }
  return base;
}

// 비즈니스 로직 (순수 함수)
// 마크다운 CRUD

// !  구현할 함수 목록
// - getAllPosts()
export function getAllPosts(): PostMeta[] {
  // 01. content/posts/ 폴더의 모든 .md 파일 읽기
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postDirectory);
  } catch {
    return [];
  }
  // => Obslog.md 파일 여러 개 등

  // 02. 각 파일을 PostMeta로 변환
  const posts = fileNames
    .filter((filename) => filename.endsWith(".md"))
    // => md 파일만 필터링 (.DS_Store 등 제외)
    .map((fileName) => {
      // 03. slug = 파일명에서 .md 제거
      const slug = fileName
        .replace(/\.md$/, "")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-"); // 연속된 - 를 하나로
      // => "Obslog"

      // 파일 내용 읽기
      const fullPath = path.join(postDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // frontmatter 파싱
      const { data, content } = matter(fileContents);
      // => { title: "...", date: "26-01-01", tags: [...], ...}

      // PostMeta 타입에 맞게 반환
      return {
        slug,
        frontmatter: toPostFrontmatter(data),
        thumbnail: toPostFrontmatter(data).thumbnail ?? null,
        originalFileName: fileName,
      };
    });

  // 4. 날짜 내림차순 정렬
  return posts.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1,
  );
}
// ✅ getallPosts 핵심 포인트
// readdirSync => 폴더 안의 파일 목록 (이름만)
// readFileSync => 파일 내용 읽기

// - getPostBySlug(slug)
export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  const found = posts.find((p) => p.slug === slug);
  if (!found) return null;

  // 01. slug 검증 후 파일 경로 조합
  const fullPath = path.join(postDirectory, found.originalFileName);

  // 02. 파일 존재 여부 확인
  // if (!fs.existsSync(fullPath)) return null;
  // => 없는 slug 요청 시 null 반환 (404처리를 호출부에서)

  // 03. 파일 내용 읽기
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 04. frontmatter + 본문 동시에 파싱
  const { data, content } = matter(fileContents);
  //      frontmatter,      본문

  // 05. Post 타입으로 반환
  return {
    slug,
    frontmatter: toPostFrontmatter(data),
    content, // getAllPosts와 달리 content 포함
    thumbnail: toPostFrontmatter(data).thumbnail ?? null,
    originalFileName: found.originalFileName,
  };
}

// - getAllTags()
export function getAllTags(): string[] {
  const posts = getAllPosts();
  //    → PostMeta[] (이미 만든 함수 재사용)

  // 1. 모든 포스트의 tags 배열을 하나로 합치기
  const allTags = posts.flatMap((post) => post.frontmatter.tags ?? []);
  //    → ["javascript", "react", "javascript", "next.js", ...]
  //       중복 있음

  // 2. 중복 제거
  const uniqueTags = [...new Set(allTags)];
  //    → ["javascript", "react", "next.js", ...]

  return uniqueTags;
}

// - getPostsByTag(tag)
export function getPostsByTag(tag: string): PostMeta[] {
  const posts = getAllPosts();
  //    → PostMeta[] (날짜 내림차순 정렬된 전체 포스트)

  // 해당 태그를 가진 포스트만 필터링
  return posts.filter((post) => post.frontmatter.tags?.includes(tag));
  //    → tag가 "react"라면
  //      tags에 "react"가 포함된 포스트만 반환
}

// - getAllSeries()
export function getAllSeries(): string[] {
  const posts = getAllPosts();

  // 1. series가 있는 포스트만 필터링
  const seriesPosts = posts.filter((post) => post.frontmatter.series);
  //    → series가 빈 문자열("") 또는 undefined인 포스트 제외

  // 2. series 이름만 추출
  const allSeries = seriesPosts.map(
    (post) => post.frontmatter.series as string,
  );
  //    → ["Next.js 입문", "Next.js 입문", "TypeScript 기초", ...]
  //       중복 있음

  // 3. 중복 제거
  return [...new Set(allSeries)];
  //    → ["Next.js 입문", "TypeScript 기초", ...]
  //  tags는 포스트 하나에 여러 개, series는 포스트 하나에 하나라서 flatMap 대신 map을 씁니다.
}
// - savePost()
export function savePost(post: Post, { overwrite = false } = {}): void {
  // 1. slug 검증 후 파일 경로 조립
  const fullPath = path.join(postDirectory, `${safeSlug(post.slug)}.md`);
  //    → /Users/dk/projects/obslog/content/posts/next-intro.md

  // 2. 중복 파일 체크
  if (fs.existsSync(fullPath) && !overwrite) {
    throw new Error(
      `Post already exists: "${post.slug}". Pass { overwrite: true } to update.`,
    );
  }

  // 3. frontmatter를 YAML 문자열로 변환
  const fileContents = matter.stringify(post.content, post.frontmatter);
  //    ---
  //    title: "Next.js 입문"
  //    date: "2024-01-01"
  //    tags:
  //      - javascript
  //      - react
  //    published: true
  //    ---
  //
  //    본문 내용...

  // 4. 파일 쓰기
  try {
    fs.writeFileSync(fullPath, fileContents, "utf8");
  } catch (err) {
    throw new Error(
      `Failed to write post "${post.slug}": ${err instanceof Error ? err.message : err}`,
    );
  }
}

// - deletePost()
export function deletePost(slug: string): void {
  // 1. slug 검증 후 파일 경로 조립
  const fullPath = path.join(postDirectory, `${safeSlug(slug)}.md`);
  //    → /Users/dk/projects/obslog/content/posts/next-intro.md

  // 2. 파일 존재 여부 확인
  if (!fs.existsSync(fullPath)) return;
  //    → 없는 파일 삭제 시도 시 에러 방지

  // 3. 파일 삭제 Unix 시스템에서 파일 삭제를 unlink라고 부르는 관습에서 왔습니다.
  fs.unlinkSync(fullPath);
}

// lib/posts.ts — 본문 첫 이미지 추출 (frontmatter thumbnail 필드로 대체)
// function extractFirstImage(content: string): string | null {
//   const match = content.match(/!\[.*?\]\((.*?)\)/);
// ![alt](https://img.png "title") 입력 시 URL에 "title"이 붙어 잘못된 썸네일 src가 만들어질 수 있습니다. =>
// +  const match = content.match(/!\[[^\]]*]\(([^\s)]+)/);
//   return match ? match[1] : null;
// }

export function getPaginatedPosts(
  page: number,
  pageSize: number,
  tags?: string[],
): { posts: PostMeta[]; totalPages: number; currentPage: number } {
  const safePageSize = Math.max(1, pageSize);
  const safePage = Math.max(1, page);

  const allPosts = getAllPosts();
  let filteredPosts = allPosts;

  if (tags && tags.length > 0) {
    const normalize = (str: string) => str.trim().toLowerCase();
    const tagsNormalized = tags.map(normalize);
    filteredPosts = filteredPosts.filter((post) => {
      return post.frontmatter.tags?.some((tag) =>
        tagsNormalized.includes(normalize(tag)),
      );
    });
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / safePageSize),
  );
  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * safePageSize;
  const end = start + safePageSize;
  const posts = filteredPosts.slice(start, end);

  return { posts, totalPages, currentPage };
}
