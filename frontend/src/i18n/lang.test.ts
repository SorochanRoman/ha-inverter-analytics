import { afterEach, describe, expect, it, vi } from "vitest";
import {
  _resetLangForTests,
  currentLang,
  currentLocale,
  localeFor,
  messagesForLocale,
  noteHaLanguage,
  resolveLang,
  setLang,
  subscribe,
} from "./lang";
import { en } from "./en";
import { uk } from "./uk";

function fakeStorage(initial: Record<string, string> = {}) {
  const data = { ...initial };
  return {
    getItem: (key: string) => (key in data ? data[key] : null),
    setItem: (key: string, value: string) => {
      data[key] = value;
    },
    data,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  _resetLangForTests();
});

describe("resolveLang", () => {
  it("prefers a stored choice", () => {
    expect(resolveLang("uk", "en")).toBe("uk");
    expect(resolveLang("en", "uk")).toBe("en");
  });

  it("follows Home Assistant's language when nothing is stored", () => {
    expect(resolveLang(null, "uk")).toBe("uk");
    expect(resolveLang(null, "uk-UA")).toBe("uk");
    expect(resolveLang(null, "de")).toBe("en");
    expect(resolveLang(null, undefined)).toBe("en");
  });

  it("ignores a stored value it does not know", () => {
    expect(resolveLang("fr", "uk")).toBe("uk");
  });
});

describe("localeFor", () => {
  it("formats in Ukrainian when the panel is Ukrainian", () => {
    expect(localeFor("uk", "en-GB")).toBe("uk");
  });

  it("keeps Home Assistant's locale for an English panel", () => {
    expect(localeFor("en", "en-GB")).toBe("en-GB");
    expect(localeFor("en", "de")).toBe("de");
  });

  it("does not format an English panel in Ukrainian", () => {
    // The locale is how pure helpers tell which units to print, so an
    // English panel must never carry a Ukrainian locale.
    expect(localeFor("en", "uk-UA")).toBe("en");
  });
});

describe("messagesForLocale", () => {
  it("maps a locale back to its dictionary", () => {
    expect(messagesForLocale("uk")).toBe(uk);
    expect(messagesForLocale("en-GB")).toBe(en);
  });
});

describe("the store", () => {
  it("reads the stored choice once and writes a new one", () => {
    const storage = fakeStorage({ "inverter-analytics.lang": "uk" });
    vi.stubGlobal("localStorage", storage);
    expect(currentLang()).toBe("uk");
    setLang("en");
    expect(currentLang()).toBe("en");
    expect(storage.data["inverter-analytics.lang"]).toBe("en");
  });

  it("follows Home Assistant's language until a choice is made", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    noteHaLanguage("uk-UA");
    expect(currentLang()).toBe("uk");
    expect(currentLocale()).toBe("uk");
  });

  it("survives a browser that refuses storage", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new Error("denied");
      },
    });
    expect(currentLang()).toBe("en");
    setLang("uk");
    expect(currentLang()).toBe("uk");
  });

  it("tells subscribers about a change and stops when asked", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    const listener = vi.fn();
    const unsubscribe = subscribe(listener);
    setLang("uk");
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    setLang("en");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("tells subscribers when Home Assistant's language changes the result", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    const listener = vi.fn();
    subscribe(listener);
    noteHaLanguage("en");
    noteHaLanguage("uk");
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
