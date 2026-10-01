import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Messages } from "./en";
import { currentLang, currentLocale, messagesFor, subscribe, type Lang } from "./lang";

/**
 * Gives a component the current dictionary and re-renders it on a switch.
 *
 * Create one as a field — `private i18n = new I18nController(this)` — and
 * read `this.i18n.m` and `this.i18n.locale` in render(). Nothing has to be
 * passed down the tree: every component asks the same store.
 */
export class I18nController implements ReactiveController {
  private unsubscribe?: () => void;

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    this.unsubscribe = subscribe(() => this.host.requestUpdate());
  }

  hostDisconnected(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }

  get lang(): Lang {
    return currentLang();
  }

  get m(): Messages {
    return messagesFor(currentLang());
  }

  get locale(): string {
    return currentLocale();
  }
}
