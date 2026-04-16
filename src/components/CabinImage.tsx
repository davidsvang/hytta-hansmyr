"use client";

import Image from "next/image";
import { useState } from "react";

interface CabinImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export default function CabinImage({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
}: CabinImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-[#2C2A1E]/10 flex flex-col items-center justify-center ${fill ? "absolute inset-0" : ""} ${className}`}>
        <div className="text-3xl mb-2 opacity-40">📷</div>
        <p className="label-caps text-[#5F5E5A]/60 text-center px-4 text-[10px]">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
