import React from 'react';
import { ListOrdered } from 'lucide-react';

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav
      aria-label="Table of contents"
      className="my-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 sm:p-5"
    >
      <div className="flex items-center gap-2 pb-3 border-b border-neutral-800 text-sm font-bold text-white">
        <ListOrdered className="h-4 w-4 text-amber-400" />
        <span>In This Guide</span>
      </div>
      <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {items.map((item, idx) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-start gap-2 py-1 text-neutral-300 hover:text-amber-400 transition-colors focus:outline-none focus:text-amber-400"
            >
              <span className="font-mono text-neutral-500 font-semibold shrink-0">
                {String(idx + 1).padStart(2, '0')}.
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
