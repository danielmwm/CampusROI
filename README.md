# CampusROI

**Canadian university degree ROI calculator** — calculate the real financial return of any Canadian university program, model co-op earnings, and compare up to 3 programs side-by-side.

Live at [campusroi.ca](https://campusroi.ca)

---

## What It Does

CampusROI takes your university, program, co-op status, graduation year, and target city, then produces:

- **Net degree cost** — total tuition minus co-op earnings and bursaries
- **10-year net worth projection** — degree path vs. entering workforce immediately
- **Break-even year** — when your degree investment pays off
- **Salary progression** — 10-year salary trajectory at your chosen growth rate
- **Dynamic insights** — auto-generated observations about your specific scenario
- **Shareable URLs** — every scenario encodes to a URL you can share

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 (custom config, no templates) |
| Charts | Recharts |
| Routing | React Router v6 |
| Data | Static JSON (`src/data/programs.json`) |
| Backend | None — fully client-side |

---

## Running Locally

```bash
git clone https://github.com/campusroi/campusroi
cd campusroi
npm install
npm run dev
```

Opens at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, feature overview, teaser chart |
| `/calculator` | Main ROI calculator — two-panel input/output layout |
| `/compare` | Side-by-side comparison of up to 3 programs |
| `/methodology` | Data sources, formulas, and assumptions |

---

## Data Sources

All data targets 2024–25 academic year figures.

**Tuition**
- Each university's official registrar website (linked in `/methodology`)
- Cross-referenced with Statistics Canada Tuition and Living Accommodation Costs survey

**Co-op Salaries**
- University of Waterloo Co-op Employment Report (primary source)
- Glassdoor Canada, LinkedIn Salary Insights

**Starting Salaries**
- Statistics Canada Labour Force Survey (LFS)
- OUAC Graduate Outcomes Survey (Ontario)
- Engineering Canada Salary Survey

**Cost of Living**
- Numbeo Canadian city data
- CMHC Rental Market Report

**Financial Model Assumptions**
- Investment return: 7% (historical S&P/TSX real return)
- Salary growth: 4% (Bank of Canada wage growth data)
- Baseline no-degree salary: $42,000/yr (Statistics Canada)

Full methodology at `/methodology`.

---

## File Structure

```
src/
  components/
    Navbar.jsx
    Footer.jsx
    charts/
      NetWorthChart.jsx          # Line chart — degree vs. no-degree
      CostBreakdownChart.jsx     # Bar chart — tuition breakdown
      SalaryProgressionChart.jsx # Area chart — salary over 10 years
    calculator/
      InputPanel.jsx             # All calculator inputs
      OutputPanel.jsx            # Charts + cards + insights
      SummaryCards.jsx           # 4-metric summary row
      InsightCards.jsx           # Auto-generated insight strings
  pages/
    Home.jsx
    Calculator.jsx
    Compare.jsx
    Methodology.jsx
    NotFound.jsx
  data/
    programs.json                # All university + program data
  utils/
    calculations.js              # Core math engine
    formatting.js                # Currency + number formatting
    urlEncoding.js               # Shareable URL encode/decode
  App.jsx
  main.jsx
```

---

## Universities Covered

| University | Province | Programs |
|---|---|---|
| University of Waterloo | Ontario | CS, Software Engineering, Math/Finance, AFM, Mechatronics |
| University of Toronto | Ontario | CS, Engineering Science, Rotman Commerce, Life Sciences |
| McGill University | Quebec | CS, Engineering, Desautels Commerce, Arts |
| Queen's University | Ontario | CS, Engineering, Smith Commerce, Health Sciences |
| UBC | British Columbia | CS, Engineering, Sauder Commerce, Sciences |
| Western University | Ontario | CS, Engineering, Ivey Business, Medical Sciences |
| McMaster University | Ontario | CS, Engineering, DeGroote Business, Health Sciences |
| Toronto Metropolitan | Ontario | CS, Engineering, Business, Creative Industries |
| York University | Ontario | CS, Schulich Business, Arts |
| Carleton University | Ontario | CS, Engineering, Sprott Business, Public Affairs |

---

## Data Updates

Data is reviewed and updated every 6 months (January and July) to reflect updated tuition schedules and salary surveys. See `/methodology` for details.

---

## License

MIT
