import type { Category, SourceFilter, StatusFilter } from "../types";

const STATUS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "missing", label: "Missing" },
  { value: "have", label: "Collected" },
];

const SOURCES: { value: SourceFilter; label: string }[] = [
  { value: "any", label: "Any source" },
  { value: "base", label: "Base game" },
  { value: "pl", label: "Phantom Liberty" },
  { value: "bonus", label: "Bonus / promo" },
  { value: "crafted", label: "Crafted" },
  { value: "missable", label: "Missable / route-locked" },
];

interface ToolbarProps {
  query: string;
  onQuery: (q: string) => void;
  status: StatusFilter;
  onStatus: (s: StatusFilter) => void;
  source: SourceFilter;
  onSource: (s: SourceFilter) => void;
  categories: Category[];
  owned: Set<string>;
}

export function Toolbar({ query, onQuery, status, onStatus, source, onSource, categories, owned }: ToolbarProps) {
  return (
    // Phones: search/filters scroll away (display: contents) and only the class nav sticks.
    // Tablet and up: the whole toolbar is sticky.
    <div className="contents md:sticky md:top-[env(safe-area-inset-top,0px)] md:z-10 md:block md:border-b md:border-line md:bg-bg md:pt-3 md:pb-2.5">
      <div className="mt-3 flex flex-wrap gap-2 md:mt-0">
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search weapon, quest or place"
          aria-label="Search"
          className="min-w-0 flex-[1_1_220px] rounded-sm border border-line bg-surface px-3 py-3 md:py-2.5"
        />
        <div role="group" aria-label="Show" className="flex w-full border border-line bg-surface md:w-auto">
          {STATUS.map((s) => (
            <button
              key={s.value}
              type="button"
              aria-pressed={status === s.value}
              onClick={() => onStatus(s.value)}
              className="min-h-11 flex-1 cursor-pointer px-3 py-2 font-semibold aria-pressed:bg-text aria-pressed:text-bg md:min-h-0 md:flex-none"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label="Filter by source" className="no-scrollbar -mx-4 mt-2 flex gap-1.5 overflow-x-auto px-4 pb-0.5 md:mx-0 md:px-0">
        {SOURCES.map((s) => (
          <button
            key={s.value}
            type="button"
            aria-pressed={source === s.value}
            onClick={() => onSource(s.value)}
            className="min-h-9 flex-none cursor-pointer rounded-sm border border-line bg-chip px-3 py-1 text-sm md:min-h-0 md:px-2.5 font-medium whitespace-nowrap aria-pressed:border-cyan aria-pressed:bg-cyan-soft aria-pressed:text-cyan"
          >
            {s.label}
          </button>
        ))}
      </div>

      <nav
        aria-label="Weapon classes"
        className="no-scrollbar sticky top-[env(safe-area-inset-top,0px)] z-10 mt-2 -mx-4 flex gap-1.5 overflow-x-auto border-b border-line bg-bg px-4 md:static md:mx-0 md:border-b-0 md:px-0"
      >
        {categories.map((c) => {
          const h = c.weapons.filter((w) => owned.has(w.id)).length;
          const done = h === c.weapons.length;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`flex-none border-b-2 border-transparent px-2.5 py-2.5 md:px-2 md:py-1.5 font-display text-[15px] font-semibold hover:border-line hover:text-text ${done ? "text-cyan" : "text-muted"}`}
            >
              {c.label} {h}/{c.weapons.length}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
