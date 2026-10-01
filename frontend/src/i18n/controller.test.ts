import type { ReactiveController, ReactiveControllerHost } from "lit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { I18nController } from "./controller";
import { en } from "./en";
import { _resetLangForTests, setLang } from "./lang";
import { uk } from "./uk";

/**
 * There is no DOM here, but the controller only talks to its host through
 * addController and requestUpdate, so a plain object stands in for the element.
 */
function fakeHost() {
  const controllers: ReactiveController[] = [];
  const host = {
    addController: vi.fn((controller: ReactiveController) => {
      controllers.push(controller);
    }),
    removeController: vi.fn(),
    requestUpdate: vi.fn(),
    updateComplete: Promise.resolve(true),
  };
  return { host: host as typeof host & ReactiveControllerHost, controllers };
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
  _resetLangForTests();
});

describe("I18nController", () => {
  it("registers itself with its host", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    const { host, controllers } = fakeHost();
    const controller = new I18nController(host);
    expect(host.addController).toHaveBeenCalledTimes(1);
    expect(controllers).toEqual([controller]);
  });

  it("re-renders the host on a switch only while connected", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    const { host } = fakeHost();
    const controller = new I18nController(host);
    controller.hostConnected();
    setLang("uk");
    expect(host.requestUpdate).toHaveBeenCalledTimes(1);
    controller.hostDisconnected();
    setLang("en");
    expect(host.requestUpdate).toHaveBeenCalledTimes(1);
  });

  it("reads the dictionary, locale and language from the store", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    const { host } = fakeHost();
    const controller = new I18nController(host);
    setLang("en");
    expect(controller.lang).toBe("en");
    expect(controller.m).toBe(en);
    setLang("uk");
    expect(controller.lang).toBe("uk");
    expect(controller.m).toBe(uk);
    expect(controller.locale).toBe("uk");
  });
});
