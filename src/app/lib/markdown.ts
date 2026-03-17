import { remark } from "remark";
import remarkHtml from "remark-html";
import { Heading } from "@/src/app/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-")
    .trim();
}

export function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const seen = new Map<string, number>();
  const headings: Heading[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const base = slugify(text);

    const count = seen.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    seen.set(base, count + 1);

    headings.push({ id, text, level });
  }

  return headings;
}

export async function markdownToHtml(content: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(content);
  let html = result.toString();

  const seen = new Map<string, number>();
  html = html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const base = slugify(text);

    const count = seen.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    seen.set(base, count + 1);

    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return html;
}
