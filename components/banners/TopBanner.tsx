"use client";

import { useEffect, useState } from "react";

type TopBannerProps = {
  text: string;
  dismissible?: boolean;
};

const storageKey = "olson-top-banner-dismissed";

export function TopBanner({ text, dismissible = true }: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!dismissible) {
      return;
    }

    const dismissed = window.localStorage.getItem(storageKey);
    if (dismissed === "1") {
      setIsVisible(false);
    }
  }, [dismissible]);

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="border-b border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <p className="flex-1 text-center">{text}</p>
        {dismissible ? (
          <button
            type="button"
            className="rounded border border-slate-500 px-2 py-1 text-xs hover:bg-slate-800"
            onClick={() => {
              setIsVisible(false);
              window.localStorage.setItem(storageKey, "1");
            }}
          >
            Dismiss
          </button>
        ) : null}
      </div>
    </aside>
  );
}
