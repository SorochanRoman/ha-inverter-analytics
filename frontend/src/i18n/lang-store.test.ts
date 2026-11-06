import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * The panel and the Battery time card are separate bundles, each with its
 * own copy of this store. A switch in one must reach the other at once.
 */

type Store = typeof import("./lang-store");

async function freshStore(): Promise<Store> {
  vi.resetModules();
  return import("./lang-store");
}

function fakeStorage() {
  const data: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in data ? data[key] : null),
    setItem: (key: string, value: string) => {
      data[key] = value;
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("two store instances on one page", () => {
  it("a switch in one reaches the other and tells its subscribers", async () => {
    vi.stubGlobal("window", new EventTarget());
    vi.stubGlobal("localStorage", fakeStorage());
    const panel = await freshStore();
    const card = await freshStore();
    expect(card).not.toBe(panel);
    expect(card.currentLang()).toBe("en");
    const seen = vi.fn();
    card.subscribe(seen);
    const panelSeen = vi.fn();
    panel.subscribe(panelSeen);

    panel.setLang("uk");

    expect(card.currentLang()).toBe("uk");
    expect(seen).toHaveBeenCalledTimes(1);
    // The instance that dispatched it does not hear itself a second time.
    expect(panelSeen).toHaveBeenCalledTimes(1);
  });

  it("follows a switch made in another tab", async () => {
    vi.stubGlobal("window", new EventTarget());
    vi.stubGlobal("localStorage", fakeStorage());
    const card = await freshStore();
    expect(card.currentLang()).toBe("en");
    const seen = vi.fn();
    card.subscribe(seen);

    const other = Object.assign(new Event("storage"), { key: "unrelated", newValue: "uk" });
    window.dispatchEvent(other);
    expect(seen).not.toHaveBeenCalled();

    const event = Object.assign(new Event("storage"), {
      key: "inverter-analytics.lang",
      newValue: "uk",
    });
    window.dispatchEvent(event);
    expect(card.currentLang()).toBe("uk");
    expect(seen).toHaveBeenCalledTimes(1);

    window.dispatchEvent(event);
    expect(seen).toHaveBeenCalledTimes(1);
  });
});
