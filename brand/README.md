# Brand assets

`icon.png` (256×256) and `icon@2x.png` (512×512), both trimmed and on a
transparent background, as the [home-assistant/brands][brands] repository
requires.

Home Assistant does not read these files. Every integration icon in the
interface is fetched from `brands.home-assistant.io`, and a domain that is not
in that repository renders as the grey "icon not available" placeholder no
matter what the integration itself ships. They live here so the source of the
mark is versioned with the project.

## Getting the icon to appear

Open a pull request against [home-assistant/brands][brands] adding:

```
custom_integrations/inverter_analytics/icon.png
custom_integrations/inverter_analytics/icon@2x.png
```

The domain directory name must be exactly `inverter_analytics`, matching
`manifest.json`. Once the pull request is merged the icon appears for everyone,
including installations already running — the images are served from a CDN, not
shipped with the integration, so no update is needed.

## The mark

Three bars falling away: the load duration curve, which is the first chart this
project built and the one that answers the question it was started for — what
share of the time the inverter spends at what power.

The colours are the palette the charts themselves use: `#f7b32b` for solar and
`#2f7ed8` for load. Three bars rather than four because at the 32 pixels the
integrations list gives them, four go too thin to hold their colour.

Regenerate with `scripts/make_icon.py`.

[brands]: https://github.com/home-assistant/brands
