# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Acquia Program Control Tower** — an executive dashboard for program management. The entire frontend is a single file (`index.html`). There is no build system, no package manager, and no test suite. All dependencies are loaded from CDN at runtime.

The backend is a **Google Apps Script** (`timesheetgs.txt` contains the source). Deploy it separately via Google Apps Script editor; the deployed web app URL goes into `CONFIG.API_URL` in `index.html`.

## Development Workflow

Open `index.html` directly in a browser (no server needed for local inspection). To test against the live API, the `CONFIG.API_URL` must point to a deployed Google Apps Script web app URL.

To update the backend: copy the contents of `timesheetgs.txt` into the Google Apps Script editor and redeploy as a web app.

`control_tower_final_themes.html` is a standalone theme prototype — not part of the main app.

## Architecture

### Data Flow

```
Google Apps Script (doGet) → fetchData() → globalData → processData() → updateUI()
```

- `fetchData()` calls the Apps Script endpoint and populates `globalData` on load; auto-refreshes every 15 minutes via `silentFetch`.
- `processData()` aggregates `globalData.actuals` and `globalData.plan` into two derived objects: `weeks` (ISO Monday → weekly metrics) and `people` (person name → per-person stats). All financial KPIs (EAC, burn rate, runway) are computed here.
- `updateUI()` re-renders all Chart.js charts, KPI cards, and tables from the `weeks`/`people` objects.

### Central Objects

| Object | Purpose |
|---|---|
| `CONFIG` | Single source of truth: API URL, work hours (10:00–18:00 IST), SLA thresholds, holidays, chart colors |
| `globalData` | Raw API response: `actuals[]`, `plan[]`, `rawPhases[]`, `milestones[]`, `jiraIssues[]`, `jiraSummary[]`, `leaves` |
| `weeks` | Derived: ISO Monday → `{ burn, hours, plan, billable, nonBillable, people }` |
| `people` | Derived: person name → `{ weeksWorked, billableWeeks, rates, plannedSpan, actualSpan }` |

### Tab Renderers

Each of the four tabs has a dedicated render function:

| Tab | Render function | Content |
|---|---|---|
| Overview | `updateUI()` | S-curve, utilization heatmap, KPI strip, insight banner |
| Sprint | `jRenderSprintView()` | Burndown, SLA risk queue, stage pipeline |
| Delivery | `renderJiraTab()` | High-priority issues, aging analysis |
| Planning | `renderCapacity()` | Per-developer capacity sliders with PTO deduction |

### Phase Matching

`matchTaskPhase(taskName)` and `matchPlanPhase(phaseName)` normalize freeform text from timesheet entries and plan rows into structured phase keys. Phases are sourced from the `Phases` sheet in the spreadsheet and passed through `globalData.rawPhases`.

### Working Hours Engine

`workingHoursElapsed_(from, to, personName)` calculates elapsed business hours between two timestamps. Respects 10:00–18:00 schedule, skips weekends, skips Indian public holidays (hardcoded 2026–2027 set in `CONFIG`), and applies fuzzy-matched PTO from `globalData.leaves`.

### Theming

Light/dark mode is toggled via `document.documentElement.setAttribute('data-theme', ...)`. All colors are CSS custom properties under `:root` and `[data-theme="dark"]`. No JS color values — always use CSS tokens.

## Backend Data Sources (Google Sheets)

| Sheet | `globalData` key | Description |
|---|---|---|
| `TimeEntries` | `actuals` | Hours, rates, task names per person per date |
| `ResourcePlan` | `plan` | Matrix layout: role/person rows × week columns |
| `Phases` | `rawPhases` | Phase name → week date mappings |
| `Jira_CT` | `jiraIssues` | Live ticket status, story points, sprints |
| `Jira_Summary` | `jiraSummary` | Board-level metadata |
| `Teamleaves` | `leaves` | Per-person PTO dates |

## Pending Refactoring (REFACTORING_GUIDE.md)

The guide documents a planned migration from the current matrix `ResourcePlan` layout to a vertical/relational format (`Person | Role | Start | End | Hours/Week`). Key items not yet implemented:

- Replace hardcoded `CAP_DATA` with data from `ResourcePlan`
- Merge `fetchData` and `silentFetch` into a single `loadData(isSilent)` function
- Populate `CONFIG` dynamically from a `Settings` sheet instead of hardcoding values
- Apps Script date-expansion logic to flatten the vertical plan into weekly JSON
