import { memo, type ReactNode } from "react";
import type { Source, Weapon } from "../types";

const SOURCE_LABEL: Record<Source, string> = {
  base: "Base game",
  pl: "Phantom Liberty",
  bonus: "Bonus / promo",
};

interface WeaponRowProps {
  weapon: Weapon;
  checked: boolean;
  onToggle: (id: string, value: boolean) => void;
}

export const WeaponRow = memo(function WeaponRow({ weapon: w, checked, onToggle }: WeaponRowProps) {
  return (
    <li className="border-line not-first:border-t">
      <label
        className={`grid cursor-pointer grid-cols-[auto_1fr] gap-3 border-l-[3px] px-3.5 py-3 hover:bg-cyan-soft ${checked ? "border-cyan" : "border-transparent"}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onToggle(w.id, e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`clip-box mt-0.5 grid size-[22px] place-items-center border-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan ${checked ? "border-cyan bg-cyan" : "border-muted"}`}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.6" className={`size-3.5 text-bg ${checked ? "opacity-100" : "opacity-0"}`}>
            <path d="M3 8.5l3.2 3L13 4.5" />
          </svg>
        </span>

        <div>
          <div className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-display text-[19px] leading-tight font-bold ${checked ? "text-cyan" : ""}`}>
            {w.name}
            <span className="font-body text-[13px] font-medium text-muted">{w.type}</span>
          </div>
          <p className="mt-1 max-w-[70ch] text-[14.5px] text-muted">{w.how}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <Tag tone={w.source === "pl" ? "cyan" : "plain"}>{SOURCE_LABEL[w.source]}</Tag>
            {w.crafted && <Tag>Crafted</Tag>}
            {w.missable && <Tag tone="red">{w.missable}</Tag>}
          </div>
        </div>
      </label>
    </li>
  );
});

function Tag({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "cyan" | "red" }) {
  const toneClass = {
    plain: "border-line text-muted",
    cyan: "border-cyan text-cyan",
    red: "border-red text-red",
  }[tone];
  return <span className={`rounded-sm border px-[7px] py-px text-[12.5px] font-semibold ${toneClass}`}>{children}</span>;
}
