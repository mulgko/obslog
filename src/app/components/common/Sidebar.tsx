import React from "react";
import Link from "next/link";

type TagGroup = {
  letter: string;
  tags: string[];
};

const groupTagsByLetter = (tags: string[]): TagGroup[] => {
  const groups: Record<string, string[]> = {};

  for (const tag of tags) {
    const first = tag[0]?.toUpperCase() ?? "#";
    if (!groups[first]) groups[first] = [];
    groups[first].push(tag);
  }

  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b, "ko"))
    .map(([letter, items]) => ({ letter, tags: items.sort((a, b) => a.localeCompare(b, "ko")) }));
};

const Sidebar = ({ tags = [] }: { tags?: string[] }) => {
  const groups = groupTagsByLetter(tags);

  return (
    <aside className="space-y-5 text-right">
      <h2 className="font-semibold text-sm text-neutral-900">Tags</h2>
      {groups.length === 0 ? (
        <p className="text-xs text-neutral-400">태그가 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {groups.map(({ letter, tags: groupTags }) => (
            <div key={letter}>
              <p className="text-xs font-medium text-neutral-400 mb-1.5">{letter}</p>
              <div className="flex flex-col gap-1 items-end">
                {groupTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
