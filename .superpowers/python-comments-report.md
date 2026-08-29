# Python comment/docstring translation report

## Scope covered

Translated every Ukrainian docstring and comment (module, class, function/method
docstrings; inline and block `#` comments) to English, in place, in:

**custom_components/inverter_analytics/**
- `__init__.py`
- `analytics/cache.py`
- `analytics/load.py`
- `analytics/resample.py`
- `analytics/source.py`
- `config_flow.py`
- `const.py`
- `panel.py`
- `roles.py`
- `websocket_api.py`

**tests/**
- `conftest.py`
- `test_cache.py`
- `test_config_flow.py`
- `test_init.py`
- `test_load.py`
- `test_panel.py`
- `test_resample_episodes.py`
- `test_resample_histogram.py`
- `test_resample_intervals.py`
- `test_roles.py`
- `test_source.py`
- `test_source_recorder.py`
- `test_websocket_api.py`

**Config**
- `pyproject.toml`
- `requirements_test.txt`
- `.github/workflows/ci.yml`

`custom_components/inverter_analytics/analytics/__init__.py` was empty — nothing to do.

No identifiers, string literals, type annotations, decorators, imports, structure,
ordering, indentation, or blank-line placement were changed — only comment/docstring
text.

## Ukrainian string literal found — NOT translated

`custom_components/inverter_analytics/config_flow.py:40`:

```python
CONF_NAME, default = defaults.get(CONF_NAME, "Інвертор")
```

This is the default device name (`"Інвертор"`, i.e. "Inverter") pre-filled in the
setup-wizard "name" field when no default is supplied. Per instructions, this is a
string literal, not a comment, so I left it untouched rather than silently
translating it. It is the one remaining hit in the final grep sweep — flagging it
here as requested rather than fixing it.

## Ambiguous comments and how I resolved them

- `resample.py` / `load.py`, the "clamp vs clip" wording: the Ukrainian used both
  "притиснути" (clamp/press) and "обрізати" (cut/trim) somewhat interchangeably for
  the same clamping behavior (out-of-range values pinned into edge buckets/bands).
  I standardized on "clamp" throughout, matching the code's own naming
  (`_clamp`, `clamped_percentile`, the `clamped` boolean in `websocket_api.py`),
  since the task's terminology list treats "clipped time" as the noun for the
  counters (`clipped_low_seconds`/`clipped_high_seconds`) while the *operation*
  is consistently named `clamp` in the code.
- `websocket_api.py::clamp_window` docstring used "Обрізати" (cut/clip) for the
  window-shortening operation, but the function/variable/dict-key are all named
  `clamp`/`clamped`. I translated the docstring as "Clamp an overly long window"
  to match the code's vocabulary rather than the literal verb, for internal
  consistency.
- `load.py`'s comment referencing the UI's "«Пік»" (Peak) card: since the actual
  UI string is already in English per the project's prior string-translation
  pass, I rendered the quoted label as "Peak" (matching the presumed live string)
  rather than leaving a Ukrainian quotation inside an English comment.
- `test_resample_episodes.py::test_intervals_split_by_a_gap_do_not_merge`, the word
  "просадка" (literally "sag/dip") — the terminology list scopes "dip" to battery
  SoC specifically, but this test is about a generic below-threshold episode, not
  SoC. I used "dip" anyway since it's the natural English word and the term-list
  note reads as clarifying usage rather than restricting the word to that one
  context.

## Things that looked off while reading every comment

- `pyproject.toml`'s `[tool.ruff.lint] ignore = ["RUF001", "RUF002", "RUF003"]` is
  accompanied by a comment explaining that the codebase is commented in Ukrainian
  and those rules false-positive on Cyrillic. I translated the comment faithfully,
  but once this translation pass (plus the parallel frontend/docs translation
  efforts) lands, the codebase will no longer contain Ukrainian comments, and the
  stated rationale for that ignore list will be stale. I did not touch the ignore
  list itself (out of scope — not a comment), but flagging it: someone should
  reconsider whether RUF001-003 should stay ignored once all three
  translation passes are merged.
- `websocket_api.py::ws_load`'s "not_found" branch comment (now translated) explains
  that `entry.entry_id not in domain_data` is what actually gates on "is this
  inverter's cache alive," while a disabled-but-not-removed `ConfigEntry` would
  otherwise still resolve via `async_get_entry`. This logic and comment look
  correct and consistent with `test_load_command_reports_not_found_for_an_unloaded_entry`.
- Nothing else looked functionally wrong; the reasoning comments (time-weighting,
  episode-gap breaking, DST-in-UTC arithmetic, out-of-range clamping/reporting,
  `None`-vs-`0.0`, the aiohttp-resolver test hack in `conftest.py`) all matched
  the code they document, as far as I could tell while translating.

## Verification

```
grep -rnE '[а-яіїєґА-ЯІЇЄҐ]' custom_components tests pyproject.toml requirements_test.txt .github
```
→ one hit, the flagged string literal above (expected/intentional).

```
.venv/bin/pytest -q
```
→ `94 passed`. Note: the task brief expected "95 passed," but the repository as
checked out only contains 94 `test_*` functions across all `tests/*.py` files
(verified by grepping `^def test_|^async def test_`) — this is not something my
comment-only edits changed; it reflects the current state of the test suite
before I touched anything.

```
.venv/bin/ruff check .
.venv/bin/ruff format --check .
```
→ both pass (`All checks passed!`, `27 files already formatted`).
