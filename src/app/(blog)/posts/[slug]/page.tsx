import React from "react";
import { getPostBySlug } from "@/src/app/lib/posts";
import { markdownToHtml } from "@/src/app/lib/markdown";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const page = async ({ params }: Props) => {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = await markdownToHtml(post.content);

  return <div>{html}</div>;
};

export default page;
