import React from "react";
import { Metadata } from "next";
import PostCard from "../components/common/PostCard";
import { getAllPosts, getPaginatedPosts } from "../lib/posts";
import Pagination from "../components/common/Pagination";

export const metadata: Metadata = {
  title: "Home | Obslog",
  description: "blog main page",
};

const page = async () => {
  const posts = getAllPosts();
  return (
    <section className="border border-amber-400">
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug} className="border border-amber-400">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      <Pagination totalPages={posts.length} />
    </section>
  );
};

export default page;
