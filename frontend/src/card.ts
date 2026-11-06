import { LitElement, html } from "lit";

class InverterAnalyticsBatteryTime extends LitElement {
  setConfig(): void {}
  render() {
    return html`<ha-card>Battery time</ha-card>`;
  }
}

if (!customElements.get("inverter-analytics-battery-time")) {
  customElements.define("inverter-analytics-battery-time", InverterAnalyticsBatteryTime);
}
const cards = ((window as any).customCards ??= []);
if (!cards.some((card: { type: string }) => card.type === "inverter-analytics-battery-time")) {
  cards.push({
    type: "inverter-analytics-battery-time",
    name: "Battery time",
    description: "Time until the battery is full or reaches its floor, at the current power.",
  });
}
