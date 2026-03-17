import React from "react";

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
}

const PostHeader = ({ title, date, tags }: PostHeaderProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <ul>
        {tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostHeader;
