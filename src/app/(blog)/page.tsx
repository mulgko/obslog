import React from "react";
import { Metadata } from "next";
import PostCard from "../components/common/PostCard";
import { getPaginatedPosts } from "../lib/posts";
import Pagination from "../components/common/Pagination";

export const metadata: Metadata = {
  title: "Home | Obslog",
  description: "blog main page",
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;
  console.log("currnetPage:", currentPage);

  const paginatedPosts = getPaginatedPosts(currentPage, 4);

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
