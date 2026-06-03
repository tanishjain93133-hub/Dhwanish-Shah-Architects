import React, { useState } from "react";
import { cn } from "../lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  objectFit?: "cover" | "contain" | "fill" | "none";
  size?: "small" | "medium" | "large" | "hero";
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className,
  objectFit = "cover",
  size,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full bg-neutral-950 overflow-hidden flex items-center justify-center">
      {/* Skeleton screen loader */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-linear-to-r from-zinc-900/50 via-zinc-800/40 to-zinc-900/50 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="w-5 h-5 rounded-full border-t-2 border-blue-500 animate-spin" />
            <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">LOAD_IMAGE</span>
          </div>
        </div>
      )}

      {/* Fallback pattern in case of Google Drive loading block */}
      {error && (
        <div className="absolute inset-0 bg-neutral-900 border border-zinc-800 flex flex-col items-center justify-center text-center p-4">
          <span className="text-zinc-600 font-mono text-[10px] tracking-[0.2em] mb-1">IMAGE TEMPORARILY OFFLINE</span>
          <span className="text-zinc-500 font-sans text-[11px] leading-tight">
            Connecting direct render cache...
          </span>
        </div>
      )}

      <img
        src={src}
        alt={alt || "Architectural Composition"}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          const img = e.currentTarget;
          const match = src?.match(/\/images\/(1[a-zA-Z0-9_-]{32})\.jpg/);
          if (match && !img.dataset.fallbackTried) {
            img.dataset.fallbackTried = "true";
            img.src = `https://lh3.googleusercontent.com/d/${match[1]}`;
          } else {
            setError(true);
          }
        }}
        className={cn(
          "w-full h-full transition-all duration-1000 ease-out",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          loaded ? "opacity-100 blur-none scale-100" : "opacity-0 blur-xs scale-105",
          className
        )}
        {...props}
      />
    </div>
  );
};
