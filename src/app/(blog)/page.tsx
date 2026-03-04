import React from "react";
import { Metadata } from "next";
import PostCard from "../components/common/PostCard";
import { getPaginatedPosts } from "../lib/posts";
import Pagination from "../components/common/Pagination";
import { siteConfig } from "../lib/config";

export const metadata: Metadata = {
  title: `Home | ${siteConfig.siteName}`,
  description: "blog main page",
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;

  const paginatedPosts = getPaginatedPosts(
    currentPage,
    siteConfig.postsPerPage,
    resolvedSearchParams.tag?.split(",").filter(Boolean) || [],
  );

  return (
    <section className="border border-amber-400">
      <ul className="flex flex-col gap-4">
        {paginatedPosts.posts.map((post) => (
          <li key={post.slug} className="border border-amber-400">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      <Pagination totalPages={paginatedPosts.totalPages} />
    </section>
  );
};

export default page;
