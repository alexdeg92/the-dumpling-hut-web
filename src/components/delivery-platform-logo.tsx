import Image from "next/image";
import type { DeliveryPlatform } from "@/lib/content";

export function DeliveryPlatformLogo({
  platform,
  className,
}: {
  platform: Pick<
    DeliveryPlatform,
    "logoSrc" | "name" | "logoWidth" | "logoHeight" | "logoClassName"
  >;
  className?: string;
}) {
  return (
    <Image
      src={platform.logoSrc}
      alt={platform.name}
      width={platform.logoWidth}
      height={platform.logoHeight}
      className={className ?? platform.logoClassName}
      unoptimized
    />
  );
}
