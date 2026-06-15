#!/usr/bin/env python3
"""Generate favicons from dumpling-mark.png.

Produces transparent-background icons with:
  - black stroke outline (from source mark)
  - white fill inside the dumpling body only
  - fully transparent exterior (no white square canvas)
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SOURCE = PUBLIC / "dumpling-mark.png"

FAVICON_SIZES = (16, 32, 48)
APPLE_ICON_SIZE = 180


def _is_stroke(r: int, g: int, b: int, a: int, *, alpha_threshold: int = 64) -> bool:
    if a < alpha_threshold:
        return False
    return (r + g + b) < 384


def _build_stroke_mask(source: Image.Image, *, dilate_radius: int = 2) -> Image.Image:
    """Return an L-mode mask (255 = stroke wall) with gaps closed via dilation."""
    rgba = source.convert("RGBA")
    width, height = rgba.size
    stroke = Image.new("L", (width, height), 0)
    pixels = rgba.load()
    stroke_pixels = stroke.load()

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if _is_stroke(r, g, b, a):
                stroke_pixels[x, y] = 255

    if dilate_radius > 0:
        size = dilate_radius * 2 + 1
        stroke = stroke.filter(ImageFilter.MaxFilter(size))

    return stroke


def _exterior_mask(stroke_mask: Image.Image) -> Image.Image:
    """Mark pixels reachable from image edges without crossing stroke walls."""
    width, height = stroke_mask.size
    # 0 = unknown, 128 = exterior, 255 = stroke wall
    regions = stroke_mask.point(lambda value: 255 if value > 127 else 0)
    flood_base = regions.copy()
    draw = ImageDraw.Draw(flood_base)

    seeds = []
    for x in range(width):
        seeds.extend([(x, 0), (x, height - 1)])
    for y in range(height):
        seeds.extend([(0, y), (width - 1, y)])

    for x, y in seeds:
        if flood_base.getpixel((x, y)) == 0:
            ImageDraw.floodfill(flood_base, (x, y), 128, thresh=0)

    exterior = Image.new("L", (width, height), 0)
    flood_pixels = flood_base.load()
    exterior_pixels = exterior.load()
    for y in range(height):
        for x in range(width):
            if flood_pixels[x, y] == 128:
                exterior_pixels[x, y] = 255

    return exterior


def render_favicon_mark(
    source: Image.Image,
    *,
    dilate_radius: int = 2,
    padding_ratio: float = 0.08,
) -> Image.Image:
    """Render a transparent favicon-sized mark with white interior fill."""
    stroke_mask = _build_stroke_mask(source, dilate_radius=dilate_radius)
    exterior = _exterior_mask(stroke_mask)

    width, height = source.size
    rgba = source.convert("RGBA")
    src_pixels = rgba.load()
    stroke_pixels = stroke_mask.load()
    exterior_pixels = exterior.load()

    result = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    out_pixels = result.load()

    for y in range(height):
        for x in range(width):
            if stroke_pixels[x, y]:
                r, g, b, a = src_pixels[x, y]
                if _is_stroke(r, g, b, a):
                    out_pixels[x, y] = (0, 0, 0, a)
                else:
                    out_pixels[x, y] = (0, 0, 0, 255)
            elif not exterior_pixels[x, y]:
                out_pixels[x, y] = (255, 255, 255, 255)

    if padding_ratio > 0:
        bbox = result.getbbox()
        if bbox is None:
            return result

        content = result.crop(bbox)
        pad = max(1, round(max(content.size) * padding_ratio))
        padded_size = (
            content.width + pad * 2,
            content.height + pad * 2,
        )
        padded = Image.new("RGBA", padded_size, (0, 0, 0, 0))
        padded.paste(content, (pad, pad))
        result = padded

    return result


def _resize_mark(mark: Image.Image, size: int) -> Image.Image:
    return mark.resize((size, size), Image.Resampling.LANCZOS)


def generate_favicons(
    source_path: Path = SOURCE,
    output_dir: Path = PUBLIC,
    *,
    dilate_radius: int = 2,
) -> None:
    source = Image.open(source_path).convert("RGBA")
    base_mark = render_favicon_mark(source, dilate_radius=dilate_radius)

    png_outputs: list[tuple[str, int]] = [
        ("favicon-16x16.png", 16),
        ("favicon-32x32.png", 32),
        ("favicon-48x48.png", 48),
        ("apple-icon.png", APPLE_ICON_SIZE),
    ]

    for filename, size in png_outputs:
        icon = _resize_mark(base_mark, size)
        icon.save(output_dir / filename, format="PNG", optimize=True)

    # Pillow derives each embedded ICO size from the largest source frame.
    _resize_mark(base_mark, max(FAVICON_SIZES)).save(
        output_dir / "favicon.ico",
        format="ICO",
        sizes=[(size, size) for size in FAVICON_SIZES],
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        type=Path,
        default=SOURCE,
        help="Path to dumpling-mark.png",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=PUBLIC,
        help="Directory for generated favicon files",
    )
    parser.add_argument(
        "--dilate",
        type=int,
        default=2,
        help="Stroke dilation radius to close outline gaps (default: 2)",
    )
    args = parser.parse_args()
    generate_favicons(args.source, args.output_dir, dilate_radius=args.dilate)
    print(f"Generated favicons in {args.output_dir}")


if __name__ == "__main__":
    main()
