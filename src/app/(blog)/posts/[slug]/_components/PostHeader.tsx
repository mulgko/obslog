import React from "react";

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
}

const PostHeader = ({ title, date, tags }: PostHeaderProps) => {
  const [year, month, day] = date.split("-");
  const formattedDate = `${year.slice(2)}.${month}.${day.slice(0, 2)}`;

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] font-bold capitalize text-[#6D496F] dark:text-[#c4a0c6] px-2.5 first:pl-0 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostHeader;
