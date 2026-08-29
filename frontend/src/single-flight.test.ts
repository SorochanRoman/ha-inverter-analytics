import { describe, expect, it } from "vitest";
import { singleFlight } from "./single-flight";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("singleFlight", () => {
  it("does not start a second call while the first is in flight", async () => {
    const gate = deferred<string>();
    let calls = 0;
    const load = singleFlight(() => {
      calls += 1;
      return gate.promise;
    });

    const first = load();
    const second = load();
    expect(calls).toBe(1);

    gate.resolve("config");
    expect(await first).toBe("config");
    expect(await second).toBe("config");
  });

  it("starts a fresh call once the previous one has settled", async () => {
    let calls = 0;
    const load = singleFlight(async () => {
      calls += 1;
      return calls;
    });

    expect(await load()).toBe(1);
    expect(await load()).toBe(2);
  });

  it("does not wedge after a failure", async () => {
    let calls = 0;
    const load = singleFlight(async () => {
      calls += 1;
      if (calls === 1) throw new Error("nope");
      return "recovered";
    });

    await expect(load()).rejects.toThrow("nope");
    expect(await load()).toBe("recovered");
  });
});
