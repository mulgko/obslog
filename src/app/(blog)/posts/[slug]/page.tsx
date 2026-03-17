import React from "react";

import { markdownToHtml } from "@/src/app/lib/markdown";
import { notFound } from "next/navigation";
import PostContent from "./_components/PostContent";
import PostHeader from "./_components/PostHeader";
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

  const html = await markdownToHtml(post.content);

  return (
    <div>
      <PostHeader
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags || []}
      />
      <PostContent html={html} />
    </div>
  );
};

export default page;
