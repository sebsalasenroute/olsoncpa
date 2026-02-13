"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type TopBannerProps = {
  text: string;
  imageSrc?: string;
  dismissible?: boolean;
};

const storageKey = "olson-top-banner-dismissed";

export function TopBanner({ text, imageSrc, dismissible = true }: TopBannerProps) {
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
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Top banner"
            width={44}
            height={24}
            className="hidden rounded object-cover sm:block"
          />
        ) : null}
        <p className="flex-1">{text}</p>
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
