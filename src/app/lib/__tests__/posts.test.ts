import { describe, it, expect, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import {
  getAllPosts,
  getPostBySlug,
  getAllTags,
  getPostsByTag,
  getAllSeries,
  savePost,
  deletePost,
} from "../posts";

const TEST_SLUG = "__test-post__";
const postDirectory = path.join(process.cwd(), "content", "posts");
const testFilePath = path.join(postDirectory, `${TEST_SLUG}.md`);

afterEach(() => {
  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath);
  }
});

// ─────────────────────────────────────────
// getAllPosts
// ─────────────────────────────────────────
describe("getAllPosts()", () => {
  it("PostMeta[] 배열을 반환한다", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    posts.forEach((post) => {
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("frontmatter");
      expect(typeof post.slug).toBe("string");
      expect(typeof post.frontmatter.title).toBe("string");
      expect(Array.isArray(post.frontmatter.tags)).toBe(true);
    });
  });

  it("날짜 내림차순으로 정렬되어 있다", () => {
    const posts = getAllPosts();
    for (let i = 0; i < posts.length - 1; i++) {
      expect(posts[i].frontmatter.date >= posts[i + 1].frontmatter.date).toBe(
        true,
      );
    }
  });
});

// ─────────────────────────────────────────
// getPostBySlug
// ─────────────────────────────────────────
describe("getPostBySlug(slug)", () => {
  it("유효한 slug로 Post(content 포함)를 반환한다", () => {
    const firstSlug = getAllPosts()[0]?.slug;
    if (!firstSlug) return; // 포스트가 없으면 건너뜀

    const post = getPostBySlug(firstSlug);
    expect(post).not.toBeNull();
    expect(post!.slug).toBe(firstSlug);
    expect(post!).toHaveProperty("content");
    expect(typeof post!.content).toBe("string");
    expect(post!).toHaveProperty("frontmatter");
  });

  it("존재하지 않는 slug는 null을 반환한다", () => {
    const result = getPostBySlug("slug-that-does-not-exist-xyz");
    expect(result).toBeNull();
  });
});

// ─────────────────────────────────────────
// getAllTags
// ─────────────────────────────────────────
describe("getAllTags()", () => {
  it("string[] 배열을 반환한다", () => {
    const tags = getAllTags();
    expect(Array.isArray(tags)).toBe(true);
    tags.forEach((tag) => expect(typeof tag).toBe("string"));
  });

  it("중복 태그가 없다", () => {
    const tags = getAllTags();
    const unique = [...new Set(tags)];
    expect(tags.length).toBe(unique.length);
  });
});

// ─────────────────────────────────────────
// getPostsByTag
// ─────────────────────────────────────────
describe("getPostsByTag(tag)", () => {
  it("해당 태그를 가진 포스트만 반환한다", () => {
    const tags = getAllTags();
    if (tags.length === 0) return;

    const targetTag = tags[0];
    const filtered = getPostsByTag(targetTag);
    expect(Array.isArray(filtered)).toBe(true);
    filtered.forEach((post) => {
      expect(post.frontmatter.tags).toContain(targetTag);
    });
  });

  it("존재하지 않는 태그는 빈 배열을 반환한다", () => {
    const result = getPostsByTag("tag-that-does-not-exist-xyz");
    expect(result).toEqual([]);
  });
});

// ─────────────────────────────────────────
// getAllSeries
// ─────────────────────────────────────────
describe("getAllSeries()", () => {
  it("string[] 배열을 반환한다", () => {
    const series = getAllSeries();
    expect(Array.isArray(series)).toBe(true);
    series.forEach((s) => expect(typeof s).toBe("string"));
  });

  it("중복 시리즈가 없다", () => {
    const series = getAllSeries();
    const unique = [...new Set(series)];
    expect(series.length).toBe(unique.length);
  });

  it("series가 빈 포스트는 제외된다", () => {
    const series = getAllSeries();
    series.forEach((s) => expect(s).toBeTruthy());
  });
});

// ─────────────────────────────────────────
// savePost + deletePost
// ─────────────────────────────────────────
describe("savePost() + deletePost()", () => {
  it("savePost()가 파일을 생성한다", () => {
    savePost({
      slug: TEST_SLUG,
      frontmatter: {
        title: "테스트 포스트",
        subject: "",
        reference: "",
        date: "2026-01-01",
        description: "vitest 테스트용 임시 포스트",
        tags: ["test"],
        series: "",
        seriesOrder: 0,
        published: false,
      },
      content: "테스트 본문입니다.",
    });

    expect(fs.existsSync(testFilePath)).toBe(true);
  });

  it("deletePost()가 파일을 삭제한다", () => {
    // 먼저 파일 생성
    savePost({
      slug: TEST_SLUG,
      frontmatter: {
        title: "삭제용 테스트 포스트",
        subject: "",
        reference: "",
        date: "2026-01-01",
        description: "삭제 테스트용",
        tags: ["test"],
        series: "",
        seriesOrder: 0,
        published: false,
      },
      content: "삭제될 본문.",
    });
    expect(fs.existsSync(testFilePath)).toBe(true);

    // 삭제
    deletePost(TEST_SLUG);
    expect(fs.existsSync(testFilePath)).toBe(false);
  });

  it("없는 slug를 deletePost()해도 에러가 발생하지 않는다", () => {
    expect(() => deletePost("slug-that-does-not-exist-xyz")).not.toThrow();
  });
});
