import { useDeferredValue, useMemo, useState } from "react";
import { CategorySection } from "./components/CategorySection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Toolbar } from "./components/Toolbar";
import { ALL_WEAPONS, CATEGORIES } from "./data/weapons";
import { useOwned } from "./hooks/useOwned";
import type { SourceFilter, StatusFilter, Weapon } from "./types";

export default function App() {
  const { owned, toggle, reset, exportCode, importCode } = useOwned();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [source, setSource] = useState<SourceFilter>("any");
  const q = useDeferredValue(query.trim().toLowerCase());

  const matches = useMemo(() => {
    return (w: Weapon) => {
      if (status === "have" && !owned.has(w.id)) return false;
      if (status === "missing" && owned.has(w.id)) return false;
      if ((source === "base" || source === "pl" || source === "bonus") && w.source !== source) return false;
      if (source === "crafted" && !w.crafted) return false;
      if (source === "missable" && !w.missable) return false;
      if (q && !`${w.name} ${w.type} ${w.how} ${w.missable ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    };
  }, [status, source, q, owned]);

  const sections = CATEGORIES.map((c) => ({ category: c, visible: c.weapons.filter(matches) })).filter(
    (s) => s.visible.length > 0,
  );

  return (
    <div className="app-shell mx-auto max-w-[860px] lg:max-w-[1120px]">
      <Hero categories={CATEGORIES} owned={owned} total={ALL_WEAPONS.length} />
      <Toolbar
        query={query}
        onQuery={setQuery}
        status={status}
        onStatus={setStatus}
        source={source}
        onSource={setSource}
        categories={CATEGORIES}
        owned={owned}
      />
      <main>
        {sections.length ? (
          sections.map(({ category, visible }) => (
            <CategorySection key={category.id} category={category} visible={visible} owned={owned} onToggle={toggle} />
          ))
        ) : (
          <div className="mt-6.5 border border-dashed border-line px-4 py-8 text-center text-muted">
            No weapons match these filters. Clear the search or pick “Any source”.
          </div>
        )}
      </main>
      <Footer exportCode={exportCode} importCode={importCode} reset={reset} />
    </div>
  );
}
