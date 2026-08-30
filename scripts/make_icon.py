"""Draw the brand icon.

Run with any Python that has Pillow: `python scripts/make_icon.py`.
Writes brand/icon.png and brand/icon@2x.png.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

# Drawn at four times the largest output and downsampled, which is cheaper than
# fighting PIL's aliasing on the rounded ends.
SCALE = 4
SIZE = 512 * SCALE

AMBER = (247, 179, 43, 255)  # SERIES.pv, the colour solar wears throughout the app
BLUE = (47, 126, 216, 255)  # SERIES.load

# Three bars falling away: the load duration curve. Three rather than four
# because at the 32 pixels the integrations list gives them, four bars go too
# thin to hold their colour.
HEIGHTS = (1.00, 0.80, 0.60)
COLOURS = (AMBER, AMBER, BLUE)
GAP = 34 * SCALE


def draw_icon() -> Image.Image:
    """The mark, at SIZE by SIZE, flush to every edge."""
    width = (SIZE - GAP * (len(HEIGHTS) - 1)) // len(HEIGHTS)
    image = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    radius = width // 2

    for index, (share, colour) in enumerate(zip(HEIGHTS, COLOURS, strict=True)):
        left = index * (width + GAP)
        # Extending past the bottom edge leaves only the tops rounded.
        draw.rounded_rectangle(
            [left, SIZE - int(SIZE * share), left + width, SIZE + radius],
            radius=radius,
            fill=colour,
        )
    return image


def main() -> None:
    """Write both sizes and refuse to ship an untrimmed one."""
    target = Path(__file__).resolve().parent.parent / "brand"
    target.mkdir(exist_ok=True)
    icon = draw_icon()

    for name, size in (("icon.png", 256), ("icon@2x.png", 512)):
        scaled = icon.resize((size, size), Image.LANCZOS)
        # The brands repository requires a trimmed image, and a transparent
        # border is the kind of thing that survives a redesign unnoticed.
        if scaled.getbbox() != (0, 0, size, size):
            raise SystemExit(f"{name} has transparent padding: {scaled.getbbox()}")
        scaled.save(target / name)
        print(f"wrote brand/{name}")


if __name__ == "__main__":
    main()
