import React from "react";
import { PostMeta } from "../../types";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "../../lib/config";

const PRIORITY_TAGS = siteConfig.sidebarTags;

const getSortedTags = (tags: string[]): string[] =>
  [...tags]
    .sort((a, b) => {
      const aIdx = PRIORITY_TAGS.indexOf(a);
      const bIdx = PRIORITY_TAGS.indexOf(b);
      if (aIdx === -1 && bIdx === -1) return 0;
      if (aIdx === -1) return 1;
      if (bIdx === -1) return -1;
      return aIdx - bIdx;
    })
    .slice(0, 2);

const PostCard = ({ post }: { post: PostMeta }) => {
  const tags = getSortedTags(post.frontmatter.tags ?? []);

  const [year, month, day] = post.frontmatter.date.split("-");
  const formattedDate = `${year.slice(2)}.${month}.${day.slice(0, 2)}`;

  return (
    <article>
      <Link href={`/posts/${post.slug}`}>
        <div className="flex  justify-between h-35">
          <div className="w-110 flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="flex capitalize mb-1 text-[14px] font-bold leading-[17px] text-[#6D496F]">
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3 className="font-bold text-[28px] leading-[33px] mb-2">
                {post.frontmatter.title}
              </h3>
              <p className="line-clamp-2 leading-6 text-[18px]">
                {post.frontmatter.description}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#9f9f9f]">{formattedDate}</p>
            </div>
          </div>
          <div className="relative w-75 rounded-lg overflow-hidden">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full" />
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
