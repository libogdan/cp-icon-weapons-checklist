import { useEffect, useRef, useState } from "react";

interface FooterProps {
  exportCode: () => string;
  importCode: (code: string) => number | null;
  reset: () => void;
}

export function Footer({ exportCode, importCode, reset }: FooterProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [armed, setArmed] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(""), 4000);
    return () => clearTimeout(t);
  }, [msg]);

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(t);
  }, [armed]);

  const toggleBackup = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      setCode(exportCode());
      requestAnimationFrame(() => textRef.current?.select());
    }
  };

  const restore = () => {
    const n = importCode(code);
    setMsg(n === null ? "That code isn’t a valid backup. Paste the full code from “Back up or restore”." : `Restored ${n} weapons.`);
  };

  const onReset = () => {
    if (!armed) return setArmed(true);
    reset();
    setArmed(false);
    setMsg("Progress reset.");
  };

  const btn = "cursor-pointer rounded-sm border bg-surface px-3 py-2 font-semibold";

  return (
    <footer className="mt-10 mb-12 border-t border-line pt-4.5 text-sm text-muted">
      <div className="mb-3.5 flex flex-wrap gap-2">
        <button type="button" onClick={toggleBackup} className={`${btn} border-line text-text`}>
          Back up or restore
        </button>
        <button type="button" onClick={onReset} className={`${btn} border-red text-red`}>
          {armed ? "Tap again to reset" : "Reset progress"}
        </button>
      </div>

      {open && (
        <div className="mb-3.5">
          <label htmlFor="backup-code">Your backup code. Copy it somewhere safe, or paste one here to restore.</label>
          <textarea
            id="backup-code"
            ref={textRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="mt-1 min-h-20 w-full resize-y border border-line bg-surface p-2.5 font-mono text-sm text-text"
          />
          <button type="button" onClick={restore} className={`${btn} mt-2 border-line text-text`}>
            Restore from code
          </button>
        </div>
      )}

      <p role="status" className="min-h-[1.5em] font-semibold text-cyan">
        {msg}
      </p>
      <p>
        Covers the base game, Phantom Liberty and bonus/promo iconics through update 2.1x, based on RPG Site’s iconic
        weapon guide. Tags marked in red are missable or locked to one route or ending. Herold, the Dogtown black market
        vendor, sells some missed iconics, but not all.
      </p>
    </footer>
  );
}
