"use client";
import React from "react";

import { useSearchParams, useRouter } from "next/navigation";

const TagFilter = ({ tag }: { tag: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tags = searchParams.get("tag")?.split(",").filter(Boolean) || [];

  const checked = tags.includes(tag);

  const onChange = () => {
    if (checked) {
      tags.splice(tags.indexOf(tag), 1);
    } else {
      tags.push(tag);
    }
    const query = tags.length > 0 ? `?tag=${tags.join(",")}` : "";

    router.push(`/tags${query}`);
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
