// Заглушка. Справжній бандл збирається з frontend/ через Vite (Task 12).
class InverterAnalyticsPanel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<p style='padding:16px'>Inverter Analytics: фронтенд ще не зібрано.</p>";
  }
}
customElements.define("inverter-analytics-panel", InverterAnalyticsPanel);
