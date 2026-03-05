import React from "react";
import Image from "next/image";
import TagFilter from "./TagFilter";
import Comment from "./Comment";

const Sidebar = ({ tags = [] }: { tags?: string[] }) => {
  return (
    <aside>
      <section className="space-y-5">
        <h2 className="font-bold text-sm text-black">Tags</h2>
        {tags.length === 0 ? (
          <p className="text-xs text-neutral-400">태그가 없습니다.</p>
        ) : (
          <ul className="flex flex-col gap-[15px]">
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
