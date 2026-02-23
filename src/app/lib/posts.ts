// Obslog에서 마크다운 파일을 읽어 포스트 목록을 만드는 패턴의 시작 부분.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMeta, PostFrontmatter, Post } from "../types";

const postDirectory = path.join(process.cwd(), "content", "posts");

// 비즈니스 로직 (순수 함수)
// 마크다운 CRUD

// !  구현할 함수 목록
// - getAllPosts()
export function getAllPosts(): PostMeta[] {
  // 01. content/posts/ 폴더의 모든 .md 파일 읽기
  const fileNames = fs.readdirSync(postDirectory);
  // => Obslog.md 파일 여러 개 등

  // 02. 각 파일을 PostMeta로 변환
  const posts = fileNames
    .filter((filename) => filename.endsWith(".md"))
    // => md 파일만 필터링 (.DS_Store 등 제외)
    .map((fileName) => {
      // 03. slug = 파일명에서 .md 제거
      const slug = fileName.replace(/\.md$/, "");
      // => "Obslog"

      // 파일 내용 읽기
      const fullPath = path.join(postDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // frontmatter 파싱
      const { data } = matter(fileContents);
      // => { title: "...", date: "26-01-01", tags: [...], ...}

      // PostMeta 타입에 맞게 반환
      return {
        slug,
        frontmatter: data as PostFrontmatter,
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
  // 01. slug로 파일 경로 조합
  const fullPath = path.join(postDirectory, `${slug}.md`);

  // 02. 파일 존재 여부 확인
  if (!fs.existsSync(fullPath)) return null;
  // => 없는 slug 요청 시 null 반환 (404처리를 호출부에서)

  // 03. 파일 내용 읽기
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 04. frontmatter + 본문 동시에 파싱
  const { data, content } = matter(fileContents);
  //      frontmatter,      본문

  // 05. Post 타입으로 반환
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content, // getAllPosts와 달리 content 포함
  };
}

// - getAllTags()
export function getAllTags(): string[] {
  const posts = getAllPosts();
  //    → PostMeta[] (이미 만든 함수 재사용)

  // 1. 모든 포스트의 tags 배열을 하나로 합치기
  const allTags = posts.flatMap((post) => post.frontmatter.tags);
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
  return posts.filter((post) => post.frontmatter.tags.includes(tag));
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
  const allSeries = seriesPosts.map((post) => post.frontmatter.series);
  //    → ["Next.js 입문", "Next.js 입문", "TypeScript 기초", ...]
  //       중복 있음

  // 3. 중복 제거
  return [...new Set(allSeries)];
  //    → ["Next.js 입문", "TypeScript 기초", ...]
  //  tags는 포스트 하나에 여러 개, series는 포스트 하나에 하나라서 flatMap 대신 map을 씁니다.
}
// - savePost()
export function savePost(post: Post): void {
  // 1. frontmatter를 YAML 문자열로 변환
  const fileContents = matter.stringify(post.content, post.frontmatter);
  //    → 아래 형태의 문자열 생성
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

  // 2. 파일 경로 조립
  const fullPath = path.join(postDirectory, `${post.slug}.md`);
  //    → /Users/dk/projects/obslog/content/posts/next-intro.md

  // 3. 파일 쓰기
  fs.writeFileSync(fullPath, fileContents, "utf8");
  //    → 파일이 없으면 생성, 있으면 덮어쓰기
}

// - deletePost()
export function deletePost(slug: string): void {
  // 1. 파일 경로 조립
  const fullPath = path.join(postDirectory, `${slug}.md`);
  //    → /Users/dk/projects/obslog/content/posts/next-intro.md

  // 2. 파일 존재 여부 확인
  if (!fs.existsSync(fullPath)) return;
  //    → 없는 파일 삭제 시도 시 에러 방지

  // 3. 파일 삭제 Unix 시스템에서 파일 삭제를 unlink라고 부르는 관습에서 왔습니다.
  fs.unlinkSync(fullPath);
}
