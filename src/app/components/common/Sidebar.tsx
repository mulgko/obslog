import React from "react";
import TagFilter from "./TagFilter";

const Sidebar = ({ tags = [] }: { tags?: string[] }) => {
  return (
    <aside className="space-y-5">
      <h2 className="font-semibold text-sm text-neutral-900">Tags</h2>
      {tags.length === 0 ? (
        <p className="text-xs text-neutral-400">태그가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-1">
          {tags.map((tag) => (
            <TagFilter key={tag} tag={tag} />
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
