"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Heading } from "@/src/app/types";

interface HeadingNode extends Heading {
  children: HeadingNode[];
}

function buildTree(headings: Heading[]): HeadingNode[] {
  const root: HeadingNode[] = [];
  const stack: HeadingNode[] = [];

  for (const heading of headings) {
    const node: HeadingNode = { ...heading, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  return root;
}

interface Props {
  headings: Heading[];
}

interface TreeProps {
  nodes: HeadingNode[];
  activeId: string;
  handleClick: (e: React.MouseEvent, heading: Heading) => void;
}

function HeadingTree({ nodes, activeId, handleClick }: TreeProps) {
  return (
    <>
      {nodes.map((node) => {
        const isActive = activeId === node.id;
        const hasChildren = node.children.length > 0;

        return (
          <div key={node.id}>
            <a
              href={`#${node.id}`}
              title={node.text}
              className="flex items-center gap-1 py-1 text-[12px] leading-snug transition-colors duration-150"
              style={{
                color: isActive ? "#6D496F" : "var(--color-text-subtle)",
                fontWeight: isActive ? 600 : 400,
              }}
              onClick={(e) => handleClick(e, node)}
            >
              {hasChildren ? (
                <CaretDown size={10} className="shrink-0 opacity-50" />
              ) : (
                <span className="w-[10px] shrink-0" />
              )}
              <span className="truncate">{node.text}</span>
            </a>

            {hasChildren && (
              <div
                className="ml-[5px] pl-3 border-l"
                style={{ borderColor: "var(--color-border)" }}
              >
                <HeadingTree
                  nodes={node.children}
                  activeId={activeId}
                  handleClick={handleClick}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const isManualScrolling = useRef(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-10% 0% -80% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent, heading: Heading) => {
    e.preventDefault();
    setActiveId(heading.id);

    const el = document.getElementById(heading.id);
    if (!el) return;

    isManualScrolling.current = true;

    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - window.innerHeight * 0.3, behavior: "smooth" });

    let done = false;
    const flash = () => {
      if (done) return;
      done = true;
      clearTimeout(fallback);
      isManualScrolling.current = false;
      el.classList.remove("heading-highlight");
      void el.offsetHeight;
      el.classList.add("heading-highlight");
      el.addEventListener("animationend", () => el.classList.remove("heading-highlight"), {
        once: true,
      });
    };

    window.addEventListener("scrollend", flash, { once: true });
    const fallback = setTimeout(flash, 500);
  };

  const tree = buildTree(headings);

  return (
    <nav>
      <p
        className="text-[11px] uppercase tracking-widest font-semibold mb-4"
        style={{ color: "var(--color-text-subtle)" }}
      >
        On this page
      </p>
      <HeadingTree nodes={tree} activeId={activeId} handleClick={handleClick} />
    </nav>
  );
}
