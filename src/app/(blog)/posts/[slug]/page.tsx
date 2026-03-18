import React from "react";

import { extractHeadings, markdownToHtml } from "@/src/app/lib/markdown";
import { notFound } from "next/navigation";
import PostContent from "./_components/PostContent";
import PostHeader from "./_components/PostHeader";
import TableOfContents from "./_components/TableOfContents";
import { getAllPosts, getPostBySlug } from "@/src/app/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug((await params).slug);
  return {
    title: post?.frontmatter.title,
    description: post?.frontmatter.description,
  };
}

const page = async ({ params }: Props) => {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [html, headings] = await Promise.all([
    markdownToHtml(post.content),
    Promise.resolve(extractHeadings(post.content)),
  ]);

  return (
    <div className="flex gap-10 items-start">
      <div className="flex-1 min-w-0">
        <PostHeader
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags || []}
        />
        <PostContent html={html} />
      </div>
      <aside className="w-48 shrink-0 hidden lg:block sticky top-24">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  );
};

export default page;
