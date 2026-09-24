"use client";

import Image from "next/image";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/types";

export function Gallery({
  images,
  propertyName,
  morePhotosPending,
}: {
  images: GalleryImage[];
  propertyName: string;
  morePhotosPending?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const count = images.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count]
  );

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-panel bg-divider sm:aspect-[16/9]">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 z-0 h-full w-full cursor-zoom-in"
          aria-label={`Open fullscreen gallery, image ${active + 1} of ${count}`}
        >
          <Image
            key={images[active].src}
            src={images[active].src}
            alt={images[active].alt}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover motion-safe:transition-opacity motion-safe:duration-200"
            priority={active === 0}
          />
        </button>

        {count > 1 ? (
          <>
            <GalleryArrow direction="prev" onClick={() => goTo(active - 1)} />
            <GalleryArrow direction="next" onClick={() => goTo(active + 1)} />
          </>
        ) : null}

        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-xs text-white">
          {active + 1} / {count}
        </span>
      </div>

      {count > 1 || morePhotosPending ? (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show image ${index + 1} of ${count}: ${image.alt}`}
              aria-current={index === active}
              className={clsx(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-background transition-shadow",
                index === active ? "ring-gold" : "ring-transparent"
              )}
            >
              <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
          {morePhotosPending ? (
            <div className="flex h-16 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-divider text-center text-[10px] leading-tight text-ink-soft">
              <Images size={16} aria-hidden="true" />
              More photos
              <br />
              coming soon
            </div>
          ) : null}
        </div>
      ) : null}

      {lightboxOpen ? (
        <Lightbox
          images={images}
          active={active}
          propertyName={propertyName}
          onClose={() => setLightboxOpen(false)}
          onNavigate={goTo}
        />
      ) : null}
    </div>
  );
}

function GalleryArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={clsx(
        "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-colors hover:bg-white",
        direction === "prev" ? "left-3" : "right-3"
      )}
    >
      {direction === "prev" ? (
        <ChevronLeft size={20} aria-hidden="true" />
      ) : (
        <ChevronRight size={20} aria-hidden="true" />
      )}
    </button>
  );
}

function Lightbox({
  images,
  active,
  propertyName,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  active: number;
  propertyName: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const count = images.length;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(active - 1);
      if (e.key === "ArrowRight") onNavigate(active + 1);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [active, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${propertyName} photo gallery`}
      className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 sm:p-8"
    >
      <div className="flex items-center justify-between text-white">
        <span className="text-sm">
          {active + 1} / {count}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>

      <div className="relative mt-4 flex-1">
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          sizes="100vw"
          className="object-contain"
        />
        {count > 1 ? (
          <>
            <GalleryArrow direction="prev" onClick={() => onNavigate(active - 1)} />
            <GalleryArrow direction="next" onClick={() => onNavigate(active + 1)} />
          </>
        ) : null}
      </div>
    </div>
  );
}
