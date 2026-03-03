"use client";
import React from "react";

import { useSearchParams, useRouter } from "next/navigation";

const TagFilter = ({ tag }: { tag: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const checked = searchParams.getAll("tag").includes(tag);

  const onChange = () => {
    const tags = searchParams.getAll("tag");
    if (checked) {
      tags.splice(tags.indexOf(tag), 1);
    } else {
      tags.push(tag);
    }
    router.push(`/tags?tag=${tags.join(",")}`);
  };

  return (
    <div className="flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 transition-colors">
      <input
        type="checkbox"
        value={tag}
        checked={checked}
        onChange={onChange}
      />
      {tag}
    </div>
  );
};

export default TagFilter;
