import Image from "next/image";
import type { DeliveryPlatform } from "@/lib/content";

export function DeliveryPlatformLogo({
  platform,
  className,
  forFooter,
}: {
  platform: Pick<
    DeliveryPlatform,
    "logoSrc" | "footerLogoSrc" | "name" | "logoWidth" | "logoHeight" | "logoClassName"
  >;
  className?: string;
  forFooter?: boolean;
}) {
  const src =
    forFooter && platform.footerLogoSrc ? platform.footerLogoSrc : platform.logoSrc;

  return (
    <Image
      src={src}
      alt={platform.name}
      width={platform.logoWidth}
      height={platform.logoHeight}
      className={className ?? platform.logoClassName}
      unoptimized
    />
  );
}
