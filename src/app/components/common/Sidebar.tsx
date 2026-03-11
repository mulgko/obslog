import React from "react";
import Image from "next/image";
import TagFilter from "./TagFilter";
import Comment from "./Comment";
import TagResetButton from "./TagResetButton";

const Sidebar = ({ tags = [] }: { tags?: string[] }) => {
  return (
    <aside>
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-black">Tags</h2>
          <TagResetButton />
        </div>
        {tags.length === 0 ? (
          <p className="text-xs text-neutral-400">태그가 없습니다.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {tags.map((tag) => (
              <TagFilter key={tag} tag={tag} />
            ))}
          </ul>
        )}
      </section>

      <section className="inline-flex flex-col items-start gap-5 mt-10">
        <Comment />
      </section>
    </aside>
  );
};

export default Sidebar;
