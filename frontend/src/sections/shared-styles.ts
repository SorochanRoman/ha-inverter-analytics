import { css } from "lit";

/**
 * Card, section and table styling shared by the tab sections.
 *
 * The Load tab established this idiom and every section that joins it has to
 * match, so the rules live in one place rather than being copied into each
 * component's static styles and drifting apart.
 */
export const sectionStyles = css`
  section {
    background: var(--card-background-color);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
  }
  h2 {
    font-size: 15px;
    font-weight: 500;
    margin: 0 0 12px;
  }
  h3 {
    font-size: 13px;
    font-weight: 500;
    margin: 16px 0 8px;
    color: var(--secondary-text-color);
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
  .card {
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .card .name {
    font-size: 13px;
    font-weight: 500;
  }
  .card .value {
    font-size: 20px;
    font-weight: 500;
  }
  .row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--secondary-text-color);
  }
  .note {
    font-size: 12px;
    color: var(--secondary-text-color);
    margin: 8px 0 0;
  }
  .warn {
    color: var(--warning-color);
    font-size: 13px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  th,
  td {
    text-align: left;
    padding: 6px 8px;
    border-bottom: 1px solid var(--divider-color);
  }
  .empty {
    color: var(--secondary-text-color);
    margin: 0;
  }
`;
