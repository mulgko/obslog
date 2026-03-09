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
    <section className="flex flex-col md:justify-between h-[1500px]  md:h-[889px] ">
      <div className="md:mb-0 mb-10">
        <h1 className="text-[24px] font-bold mb-18">모든 글 모아보기</h1>

        {paginatedPosts.posts.length === 0 ? (
          <p className="text-center text-gray-500">포스트가 없습니다</p>
        ) : (
          <ul className="flex flex-col gap-10 ">
            {paginatedPosts.posts.map((post) => (
              <li key={post.slug} className="">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-start  w-full">
        <Pagination totalPages={paginatedPosts.totalPages} />
      </div>
    </section>
  );
};

export default page;
