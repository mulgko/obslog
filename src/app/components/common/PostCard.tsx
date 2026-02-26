import React from "react";
import { PostMeta } from "../../types";
import Link from "next/link";
import Image from "next/image";

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article>
      <Link href={`/posts/${post.slug}`}>
        <div className="flex gap-4 justify-between">
          <div>
            <div>
              {post.frontmatter.tags?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h3>{post.frontmatter.title}</h3>
            <p>{post.frontmatter.date}</p>
          </div>
          <div className="relative w-80 h-20">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-gray-200 w-80 h-20" />
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
