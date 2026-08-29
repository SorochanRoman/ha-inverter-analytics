import { BarChart, LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

echarts.use([BarChart, LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

@customElement("ia-chart")
export class IaChart extends LitElement {
  @property({ attribute: false }) public option?: Record<string, unknown>;
  @property({ type: String }) public height = "280px";

  private chart?: echarts.ECharts;
  private observer?: ResizeObserver;

  protected firstUpdated(): void {
    const host = this.renderRoot.querySelector(".canvas") as HTMLElement;
    this.chart = echarts.init(host, undefined, { renderer: "canvas" });
    this.observer = new ResizeObserver(() => this.chart?.resize());
    this.observer.observe(host);
    this.applyOption();
  }

  protected updated(): void {
    this.applyOption();
  }

  public disconnectedCallback(): void {
    this.observer?.disconnect();
    this.chart?.dispose();
    this.chart = undefined;
    super.disconnectedCallback();
  }

  private applyOption(): void {
    if (this.chart && this.option) {
      this.chart.setOption(this.option, true);
    }
  }

  protected render() {
    return html`<div class="canvas" style="height:${this.height}"></div>`;
  }

  static styles = css`
    :host { display: block; }
    .canvas { width: 100%; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-chart": IaChart;
  }
}
