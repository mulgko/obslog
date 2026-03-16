import React from "react";

const PostContent = ({ html }: { html: string }) => {
  return (
    <article
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default PostContent;
