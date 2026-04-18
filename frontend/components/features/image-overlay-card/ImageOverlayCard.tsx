"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  image: string;

  title?: string;
  description?: string;

  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";

  avatar?: {
    src?: string;
    fallback?: string;
  };

  contentPosition?: string;
  badgePosition?: string;
  avatarPosition?: string;

  className?: string;
};

export function ImageOverlayCard({
  image,
  title,
  description,
  badge,
  badgeVariant = "default",
  avatar,
  contentPosition = "top-4 left-4",
  badgePosition = "top-4 right-4",
  avatarPosition = "bottom-4 left-4",
  className,
}: Props) {
  return (
    <div className={`relative w-full h-[400px] overflow-hidden ${className}`}>
      
      {/* 🖼 IMAGE */}
      <Image
        src={image}
        alt={title ?? "image"}
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* 🔵 TITLE + DESCRIPTION */}
      {(title || description) && (
        <div className={`absolute z-10 ${contentPosition}`}>
          {title && (
            <h3 className="text-white font-semibold text-lg leading-tight drop-shadow">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-white/90 text-sm drop-shadow">
              {description}
            </p>
          )}
        </div>
      )}

      {/* 🟡 BADGE */}
      {badge && (
        <div className={`absolute z-10 ${badgePosition}`}>
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}

      {/* 🟢 AVATAR */}
      {avatar && (
        <div className={`absolute z-10 ${avatarPosition}`}>
          <Avatar className="h-10 w-10 border border-white">
            {avatar.src ? (
              <AvatarImage src={avatar.src} />
            ) : (
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            )}
          </Avatar>
        </div>
      )}

      {/* 🔥 overlay gradient (optional snygghet) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}