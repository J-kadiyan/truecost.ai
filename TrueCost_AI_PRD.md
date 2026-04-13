# TrueCost AI — Product Requirements Document
### Version 1.0 | Investor-Grade | Confidential
**Prepared by:** Senior Product & Strategy Team  
**Date:** April 2026  
**Status:** Pre-Seed / MVP Planning Phase

---

## Table of Contents

1. Executive Summary
2. Problem Deep Dive
3. Target Users & Personas
4. Product Vision
5. Core Features
6. Game-Changing Differentiators
7. Data Strategy
8. Technical Architecture
9. UX Philosophy
10. Monetization Strategy
11. Risks & Failure Points
12. MVP Scope (4–6 Weeks)
13. Success Metrics
14. Appendix

---

## 1. Executive Summary

**TrueCost AI** is a financial decision intelligence platform that transforms how students evaluate education loans — moving beyond EMI calculators to reveal the full economic, psychological, and life-trajectory cost of borrowing for education.

**The Core Insight:** A student borrowing ₹20 lakhs (~$24,000) for an MBA does not need to know their EMI is ₹21,000/month. They need to know that — given their target salary, city of posting, and field of employment — they will be financially constrained for 9.4 years, will delay their first SIP by 3 years, and face a 28% probability of loan default if they take a job below ₹6.5 LPA. *That* is a decision.

**Market:** 37 million students enrolled in higher education in India alone. Education loan disbursements in India crossed ₹1.1 lakh crore in FY2024. In the US, $1.77 trillion in student loan debt affects 45 million borrowers. Globally, students are making $30,000–$150,000 decisions with the financial literacy of a first-year undergraduate.

**The Opportunity:** Build the Bloomberg Terminal of education ROI — a platform trusted by students, feared by predatory lenders, and essential to universities, banks, and edtech companies.

---

## 2. Problem Deep Dive

### 2.1 Why Current Tools Fail — Root Cause Analysis

**The EMI Illusion**  
Every bank and loan aggregator shows EMI. This is structurally misleading. EMI hides:
- Total interest outgo (which can equal or exceed principal for 10–15 year loans)
- Real purchasing power loss due to inflation
- Opportunity cost of money not invested
- Cumulative behavioral tax (people who carry debt make worse financial decisions — documented in behavioral economics literature)

**The Optimism Trap (Cognitive Bias Layer)**  
Students systematically overestimate future income and underestimate loan burden. This is not stupidity — it is a documented cognitive bias called "planning fallacy" (Kahneman & Tversky). Loan tools exploit this gap. Nobody shows a student: "Your median peer with this degree from this college earns ₹4.2 LPA at Year 1, not ₹8 LPA as advertised."

**The Placement Brochure Problem**  
College placement statistics are self-reported, unaudited, and strategically curated. "Average CTC: ₹12 LPA" usually means:
- Top 10% of batch
- Includes stock options not yet vested
- Excludes students who didn't sit for placements
- Doesn't account for attrition at 6 months

No current tool cross-references college placement claims against actual traceable salary data.

**The Time Blindness Problem**  
Students don't intuitively understand 15-year financial timelines. At 21, a 15-year loan feels abstract. No tool currently translates loan tenure into life events: "You will still be paying EMIs when your child is 3 years old."

**The Hidden Cost Stack**  
Beyond interest, students ignore:
- Processing fees (0.5–2% of loan amount)
- Insurance premiums (bundled, often mandatory)
- Prepayment penalties
- Tax loss (interest deduction under Sec 80E applies only up to 8 years — post that, no tax benefit)
- Exchange rate risk (for forex education loans)
- Psychological debt: research shows high debt correlates with career risk-aversion — students take safer, lower-paying jobs to ensure EMI payment, creating a debt trap cycle

### 2.2 System-Level Failures

- **Banks** are incentivized to maximize disbursement, not student outcomes
- **Universities** are incentivized to maximize enrollment — placement data serves marketing, not truth
- **Government** schemes like CSIS (Central Sector Interest Subsidy) are poorly understood by 80%+ of eligible students
- **Parents** conflate education loan with investment — treating all degrees as equal ROI
- **EdTech** players selling upskilling courses upsell their own financing without disclosing real repayment scenarios

### 2.3 Regional Landscape — India vs. US

| Dimension | India | United States |
|---|---|---|
| Avg. loan size | ₹8–25 lakhs | $25,000–$120,000 |
| Interest rate | 8.5–12% (variable) | 5.5–8% (federal fixed) |
| Typical tenure | 5–15 years | 10–25 years (IDR plans) |
| Moratorium period | 6–12 months post-study | Grace period: 6 months |
| Default rate | ~8% (SBI data) | ~15% (federal loans) |
| Salary data availability | Sparse, unverified | Better (NCES, BLS, LinkedIn) |
| Financial literacy | Very low (NCFE survey: 27%) | Low (FINRA: ~34%) |
| Key hidden risk | Variable interest rate spikes | Income-Driven Repayment trap |
| Cultural factor | Family co-signing = emotional pressure | Social normalization of debt |

**India-Specific Amplifiers:**  
- 63% of education loans are taken by first-generation college students who have no family financial framework for debt
- Tier-2/3 cities have lower salary ceilings, making the same loan amount comparatively more burdensome
- Gender gap: Women borrowers face compounded risk — career breaks for marriage/childbirth during repayment window

---

## 3. Target Users & Detailed Personas

### Persona 1: Arjun — The STEM Aspirant
- **Profile:** 22, BTech from NIT Surathkal, applying for M.S. in Computer Science, US
- **Loan Size:** ₹35–45 lakhs ($42,000–$54,000)
- **Financial Literacy:** Moderate — understands EMI, has heard of "opportunity cost" but cannot calculate it
- **Fears:** Not getting an H-1B visa; taking the loan and not landing a $100K+ job; parents losing their house (collateral)
- **Decision Trigger:** Peer validation ("my friend got into USC and took the loan, so it must be fine")
- **Hidden Anxiety:** What if I graduate during a tech layoff cycle?
- **What He Needs:** A probability-weighted ROI calculator that accounts for visa uncertainty, tech job market cycles, and exchange rate risk on repayment

### Persona 2: Priya — The Tier-3 City First-Gen Student
- **Profile:** 20, from Gorakhpur, UP; B.Com graduate; considering MBA from a private Tier-2 B-school
- **Loan Size:** ₹8–12 lakhs
- **Financial Literacy:** Low — does not know the difference between fixed and floating rate; has never filed an ITR
- **Fears:** Disappointing parents who are using land as collateral; not getting a "good enough" job; being unmarriageable if she's in debt
- **Decision Trigger:** "The college promises ₹6 LPA average placement"
- **What She Needs:** A plain-language truth engine that says: "This college's actual verified placement median is ₹3.8 LPA. At this salary, your EMI will consume 42% of take-home. Here's what that means for your life."

### Persona 3: Rahul — The Career Switcher
- **Profile:** 28, 5 years in mechanical engineering, wants to switch to data science via a 1-year PG program
- **Loan Size:** ₹5–7 lakhs
- **Financial Literacy:** High — tracks mutual funds, has an emergency fund, understands compounding
- **Fears:** Wasted opportunity cost of 1 year salary foregone + loan; not being able to compete with CS graduates
- **Decision Trigger:** LinkedIn salary posts showing data scientists earning ₹15–20 LPA
- **What He Needs:** A comparative scenario engine: "Cost of switching vs. cost of staying + upskilling vs. bootcamp alternatives." He needs risk-adjusted IRR, not EMI.

### Persona 4: Meena & Suresh — The Co-Signing Parents
- **Profile:** Both ~50, Suresh is a government employee (₹55K/month), Meena is a homemaker; son wants to study MBBS in Russia/Ukraine
- **Loan Size:** ₹25–40 lakhs
- **Financial Literacy:** Very low — trust banks and "the college agent"
- **Fears:** Losing their fixed deposit / property; son not being able to practice medicine in India (NMC screening); retirement derailment
- **Decision Trigger:** Social pressure — "everyone sends their children abroad"
- **What They Need:** A parent-facing view: "If your son cannot practice in India, your repayment burden will be X. Your retirement savings will be delayed by Y years. Here is the worst-case scenario in plain language."

---

## 4. Product Vision

### 4.1 What TrueCost AI Is — Precisely

TrueCost AI is not a loan calculator. It is not a comparison portal. It is not a financial advice platform.

**It is a financial decision engine** — a system that ingests the unique inputs of a student's life situation and outputs the complete, unvarnished, probability-weighted cost of their education financing decision.

Think of it as: **Grammarly for financial decisions** — it doesn't make the decision for you, but it catches every mistake before you commit.

### 4.2 The Truth Layer

The platform's philosophical core is radical transparency. Unlike banks who want loan disbursement, unlike colleges who want enrollment, unlike aggregators who earn referral fees — TrueCost AI earns trust by being the only party in the room with no incentive to lie.

**North Star Metric:** % of users who change their original loan decision after using TrueCost AI (target: 35%+ in Year 1)

### 4.3 Long-Term Platform Vision (3–5 Years)

- Become the **global education ROI intelligence layer** — the data standard that universities, banks, and governments reference
- Power loan counseling for banks (white-label B2B)
- Integrate with student loan management platforms to provide in-repayment guidance
- Build the **largest verified salary-by-degree-by-college dataset** in India, crowd-sourced and verified via payslip uploads
- Partner with governments to make TrueCost analysis **mandatory disclosure** before loan approval (regulatory angle — precedent exists in mortgage disclosures)

---

## 5. Core Features — Deep Specifications

### Feature A: True Cost Engine

**Purpose:** Show the complete financial cost of a loan, adjusted for real-world variables.

**Inputs:**
- Loan amount
- Interest rate (with toggle: fixed vs. floating)
- Tenure
- Moratorium period
- Processing fee, insurance cost
- Current savings/investment capacity

**Outputs — Beyond Standard EMI:**

**A1. Total Repayment Simulation**  
Not just "total amount payable" — break it into:
- Principal repaid
- Interest paid (shown as % of principal — psychologically more impactful: "You are paying ₹9.3 lakhs to borrow ₹12 lakhs")
- Government subsidy captured (if eligible)
- Tax saved under Sec 80E (auto-calculated based on income inputs)
- **Net True Cost** = Total repayment − Tax savings − Government subsidy

**A2. Inflation-Adjusted True Cost**  
At 6% inflation, ₹20 lakhs in 2024 = ₹14.5 lakhs in real terms in 2034. Show both nominal and real repayment burden. This prevents students from overvaluing future salary increases.

**A3. Opportunity Cost Engine**  
This is the most underused concept in financial education — and TrueCost AI will make it visceral.

"The ₹21,000 you pay as EMI every month, if invested in a diversified index fund at 12% CAGR, would grow to ₹1.87 crore over 15 years. Your loan is not just costing you ₹9.3 lakhs in interest — it is costing you ₹1.87 crore in foregone wealth."

This number will be the most shared, most cited number on the platform.

**A4. Time-to-Financial-Freedom Metric**  
Define "financial freedom from this loan" as the moment when:
- Loan is fully repaid, AND
- User's net worth is positive, AND
- Monthly investable surplus is ≥ 20% of income

Calculate this date dynamically. Show it on a timeline. Make it a countdown the user can bookmark.

**A5. Variable Rate Stress Test**  
For floating rate loans (most Indian education loans): simulate what happens if RBI hikes repo rate by 100bps, 200bps, 300bps. Show how EMI and total repayment change. This is non-negotiable — most students don't know their "8.5%" rate can become "11.5%" within 3 years.

---

### Feature B: Career ROI Predictor

**Purpose:** Replace the "average placement CTC" mythology with a probability-weighted salary forecast.

**Model Inputs:**
- College (searched from database)
- Degree and specialization
- City of intended employment
- Current skills (self-reported, validated via skill tags)
- Work experience (for MBA/PG applicants)
- Target geography (India / US / Europe / Middle East)

**Output Structure — Three Scenarios:**

| Scenario | Probability | Definition |
|---|---|---|
| Best Case (P90) | 10% | Top decile outcome — competitive company, right city, immediate hike trajectory |
| Base Case (Median) | 50% | Verified median salary from our dataset for this college-degree-city combination |
| Stress Case (P25) | 25% | Bottom quartile — includes students who couldn't get campus placement |
| Failure Case | 15% | No placement within 12 months — applies survival analysis |

**B1. Salary Prediction Architecture (ML Model — High Level)**  
- Base model: Gradient Boosting (XGBoost) trained on verified salary data
- Features: College tier, degree, specialization, city, macro employment index, graduation year
- Validated against LinkedIn Salary Insights, AmbitionBox, Glassdoor, Payscale
- Model retrained quarterly as new salary data is ingested
- Confidence interval explicitly shown — do not hide model uncertainty

**B2. Loan-to-Salary Ratio Warning System**  
Industry heuristic (and our internal threshold): Loan amount should not exceed 1x first-year gross salary.
- Green: Loan ≤ 0.8x predicted median salary
- Yellow: Loan = 0.8–1.5x predicted median salary (caution)
- Red: Loan > 1.5x predicted median salary (high risk — require user to confirm understanding)
- Black: Loan > 2x predicted median salary (system generates "This loan is dangerous" protocol)

**B3. Career Growth Trajectory**  
Show salary projections at Year 1, 3, 5, 10 for the chosen career path. Overlay loan repayment curve against salary growth curve. Show when the salary comfortably covers EMI vs. when it is a stretch.

**B4. Geographic Salary Arbitrage**  
"The same BTech degree earns ₹6.5 LPA median in Patna but ₹11.2 LPA in Bangalore. Your loan repayment comfort changes significantly based on where you work. We've modeled your scenario for 8 major cities."

---

### Feature C: Break-Even & Life Impact Dashboard

**Purpose:** Translate numbers into lived human experience.

**C1. Life Milestone Timeline**  
On a visual timeline, show:
- Loan repayment end date
- First possible SIP start date (if EMI must be fully cleared first)
- Likely marriage age of user's peer group vs. their financial readiness
- First child (average age in India: 28) — will user still be in EMI at that point?
- First property purchase possibility
- Retirement savings start date

This is the most emotionally resonant feature. A student seeing "You will still be paying EMIs at age 34, which is when your child will be 3 years old" — that is a decision-changing insight.

**C2. Financial Pressure / Stress Index**  
Proprietary metric. Score 0–100.
- Calculated from: EMI-to-income ratio, loan-to-salary ratio, savings rate impact, emergency fund depletion risk
- Anchored with language: "0–30: Manageable. 30–60: Stretched. 60–80: High stress. 80–100: Danger zone."
- Include: Research-backed note — "Studies show individuals with high debt-to-income ratios report 2.3x higher financial anxiety, which correlates with lower job performance and higher career conservatism."

**C3. Savings Impact Calculator**  
"If you start investing ₹5,000/month at age 22 (pre-loan), you build ₹1.2 crore by 50. If the loan forces you to start at 30, you build ₹58 lakhs — a ₹62 lakh penalty for this loan."

Show compounding gap visually. This is your most viral feature.

**C4. Break-Even Date**  
"The day your degree's total additional earning (vs. not having the degree) equals your total loan cost." This is where career ROI meets loan cost — true break-even. For high-ROI degrees: gratifying. For low-ROI degrees: sobering. Always show it.

---

### Feature D: Risk Intelligence System

**Purpose:** Proactively identify red flags the student hasn't asked about.

**D1. College Risk Scorecard**  
Every college in our database gets a risk score based on:
- NAAC/NBA accreditation status
- Placement verification score (% of placements we could independently verify)
- Alumni income data (crowd-sourced, verified)
- Trend: Is placement rate improving or declining?
- Regulatory flags: Is college on UGC caution list? Any RBI NPA flags on associated loan accounts?
- Loan default correlation: Anonymized data from banking partners on loan default rates by college

**D2. Degree Saturation Index**  
"MBA in Marketing from a Tier-3 college: India produced 420,000 MBAs in 2024. Median starting salary has declined 8% in 3 years adjusted for inflation. Supply significantly exceeds demand in this category."

This is data no college will ever show you. We will.

**D3. Automated "This Loan Is Dangerous" Protocol**  
When risk thresholds are crossed, the system does not just flag — it explains:

Example trigger text:  
> "⚠️ Danger Zone: Your loan amount (₹18 lakhs) is 2.8x the median verified first-year salary from this college (₹6.4 LPA). Based on historical data from 847 graduates of this program, 34% were unable to service this EMI level within the first year. We strongly recommend reviewing the alternative pathways below before proceeding."

This is not a legal disclaimer — it is a human intervention.

**D4. External Risk Factors**  
- Industry-specific employment indices (is the sector hiring or contracting?)
- Automation risk score for chosen career (World Economic Forum / McKinsey data)
- Visa/policy risk (for international education)

---

## 6. Game-Changing Differentiators — 7 Non-Obvious Features

### G1: "What If I Fail?" Simulation Engine

Most financial tools model only success scenarios. TrueCost AI models failure.

User selects:
- "What if I can't find a job for 12 months after graduation?"
- "What if I get a job at 50% of expected salary?"
- "What if I drop out?"

System shows:
- Immediate EMI gap (who pays? parent co-signers face legal liability)
- Credit score impact timeline
- Restructuring options (loan moratorium extension, NPA risk)
- Legal implications for co-signers (most parents don't understand they become primary borrowers if student defaults)
- Recovery pathway — how long to get back to neutral

This feature is deeply uncomfortable. That is the point. It is also the most honest thing a financial product has ever shown a student.

### G2: Alternative Path Suggester

When a user's loan is flagged as high-risk, don't just say "no." Offer concrete, data-backed alternatives:

- "Same career outcome, 40% lower loan: This college has 87% placement overlap with your target but charges ₹7 lakhs less."
- "Skill-based path: Our data shows 12% of hires in your target company came from X certification course + 2 years experience, with zero loan burden."
- "Scholarship gap analysis: You may be eligible for 3 scholarships you haven't applied for. Total potential offset: ₹3.2 lakhs."
- "Work-then-study path: Graduates who worked 2 years before this program earned ₹2.3 LPA more at graduation and had 34% smaller loans."

The alternative path engine positions TrueCost AI as an ally, not a doom oracle.

### G3: Loan Negotiation Intelligence Module

Students don't know they can negotiate loan terms. Banks have more flexibility than they disclose.

TrueCost AI shows:
- Benchmark interest rates by bank for this loan profile (using aggregated application data)
- "Based on your academic profile (9.2 CGPA, NIT, no existing debt), you should be offered 8.75% or lower. Current offer of 9.5% is above benchmark — here's how to negotiate."
- Which banks have historically offered better terms for this college/degree combination
- Optimal loan structuring: "Taking ₹12 lakhs in two tranches reduces total interest by ₹47,000."
- Prepayment strategy: "Paying ₹5,000 extra in month 1–24 saves ₹1.2 lakhs in interest and closes loan 18 months earlier."

### G4: The AI Challenger — "Devil's Advocate" Mode

An AI advisor that actively argues against the user's decision, structured as a pre-mortem.

User says: "I want to take ₹15 lakhs for this MBA."

AI Challenger says:
> "Let me play Devil's Advocate. Three things concern me: First, your target salary of ₹12 LPA is the top-quartile outcome from this college — the median is ₹6.8 LPA. Second, your loan-to-expected-salary ratio is 2.2x, which our data shows leads to financial stress in 61% of cases. Third, you mentioned wanting to start a family in 5 years — your break-even date is Year 7. Have you modeled a scenario where your partner also carries education debt? I'm not saying don't do this. I'm saying: can you show me your plan for the worst-case scenario?"

This is the only financial product that will argue with you before taking your money.

### G5: Real Alumni Outcome Integration

Partner with alumni networks, LinkedIn, and crowd-sourced data collection to build a **verified outcome database** at the individual (anonymized) level.

Features:
- "847 graduates of this program shared their salary at Year 1, 3, 5. Here's the real distribution."
- Alumni sentiment: "72% of alumni from this program said the loan was worth it. 28% said they would have chosen differently."
- Career trajectory: "61% are still in their original domain 5 years out. 31% switched — their salary trajectory was significantly different."
- User can filter: by gender, by target city, by work experience at time of joining

This is the closest thing to calling up 847 seniors and asking them honestly — "Was it worth it?"

### G6: Family Financial Impact Report

Most tools treat the student as an isolated economic unit. They are not. Generate a downloadable report for the family:

- Parent's co-signer risk exposure (legal, financial)
- Impact on parent's retirement if student defaults or delays repayment
- EMI-to-family-income ratio (if family income is provided)
- "Your family's financial buffer: ₹X. If this loan goes into NPA, recovery proceedings could begin in 90 days. Here is what that means for you."

Designed to be shared at the family dinner table before signing. This is the feature that gets media coverage.

### G7: "Future You" Projection — Financial Identity Engine

Six months post-graduation, with user's permission, TrueCost AI re-engages:
- "You predicted ₹8 LPA. You're earning ₹5.5 LPA. Here is your revised freedom timeline."
- "You're 14 months into repayment. Here's how you're tracking against your original plan."
- "Based on your current trajectory, you'll be debt-free at 34, not 30 as you planned. Here are 3 actions to close the gap."

This turns TrueCost AI from a one-time calculator into a financial life companion — and dramatically increases retention, referral, and data collection for model improvement.

---

## 7. Data Strategy

### 7.1 Required Datasets

**Salary Data**
- AmbitionBox, Glassdoor, Payscale (scraping with robots.txt compliance + API where available)
- LinkedIn Salary Insights (partnership or research API)
- Government: MCA-21 company filings, EPFO data (limited access — regulatory pathway required)
- Internal crowd-sourcing: Verified payslip/offer letter upload → salary data point (anonymized, aggregated)
- NCES (US), UK Graduate Outcomes Survey, Australian Graduate Outcomes (for international data)

**College Placement Data**
- NIRF rankings (Ministry of Education — public data, annual)
- AISHE database (All India Survey on Higher Education)
- College websites (scraping — unreliable, requires verification layer)
- NAAC/NBA accreditation data
- Alumni LinkedIn profiles (cohort analysis at scale)
- Banking NPA data (partnership — most sensitive, most valuable)

**Loan Interest & Product Data**
- RBI's published MCLR and base rate data (public API)
- Bank websites for current product rates (scraping)
- IBA (Indian Banks' Association) data
- Federal Student Aid data (US) — public API
- Credila, Avanse, InCred — direct partnerships

**Employment & Industry Trends**
- CMIE CPHS (Centre for Monitoring Indian Economy) — employment data
- LinkedIn Economic Graph — hiring trend data
- World Economic Forum Future of Jobs report
- NASSCOM sector reports
- MCA company registration/closure data (startup ecosystem health)

### 7.2 Data Reliability Challenges & Mitigations

| Challenge | Severity | Mitigation |
|---|---|---|
| Placement data is self-reported by colleges | High | Cross-reference with alumni LinkedIn data; assign "verification score" to each college |
| Salary data has survivorship bias | High | Weight toward user-submitted verified data; show confidence intervals |
| Data is city-specific but collected nationally | Medium | Build city-level models for top 20 cities; flag "limited data" for others |
| Historical salary data lags reality | Medium | Weight recent 2 years 3x more than older data |
| College placement data is 1 year old | Medium | Adjust using industry employment trend multiplier |
| Users may lie in self-reported data | Low | Verification via offer letter / payslip upload (optional but incentivized) |
| International salary data is sparse | High | Partnership with Numbeo, Teleport; focus on top 10 destination countries initially |

### 7.3 Data Moat Strategy

Data is the defensible advantage. Year 1 goal:
- 50,000 verified salary data points (India)
- 5,000 verified alumni outcome surveys
- Coverage: Top 500 colleges by enrollment

**Incentive for data contribution:**  
Users who submit verified salary data get "TrueCost Verified" badge + access to premium features free for 1 year.

---

## 8. Technical Architecture

### 8.1 System Components

**Frontend**
- React.js (web) + React Native (iOS/Android)
- Progressive Web App for low-bandwidth users (Tier-3 cities, 2G/3G connectivity)
- Offline mode: Core calculator works without internet connection
- Language support: English + Hindi (MVP); Tamil, Telugu, Bengali (Year 1 expansion)
- Accessibility: WCAG 2.1 AA compliance

**Backend**
- Node.js / Python FastAPI (hybrid — Python for ML inference endpoints, Node for real-time features)
- PostgreSQL (primary data store — college, salary, loan product data)
- Redis (session management, caching for loan product rates)
- Apache Kafka (event streaming for user journey analytics)
- Elasticsearch (college and course search)
- AWS / GCP (primary cloud; AWS India region for data residency compliance)

**ML/AI Components**

*Salary Prediction Model*
- Algorithm: XGBoost ensemble with LightGBM fallback
- Training data: Verified salary datapoints + weighted scraping data
- Feature set: 47 features including college tier, degree, specialization, experience, city, graduation year, market conditions
- Retraining: Quarterly, with drift monitoring
- Serving: AWS SageMaker / FastAPI inference endpoint (P95 latency < 200ms)

*Risk Intelligence Engine*
- Rule-based system (hard thresholds for danger zone triggers) layered over
- ML model for nuanced risk scoring
- College risk model: Logistic regression on NPA correlation, placement verification score, NAAC grade, trend data

*AI Challenger (G4 Feature)*
- Claude API / GPT-4 (via system prompt engineering) — constrained to financial domain
- Context: User's loan inputs + college risk data + salary prediction + behavioral flags
- Guardrails: Not financial advice; always recommend consulting a financial advisor for final decisions

**Data Pipeline**
- Airflow for orchestration
- Scrapy for web scraping (with rotating proxies, rate limiting, robots.txt compliance)
- Data validation: Great Expectations framework
- Salary data verification: ML-based document parser for offer letters / payslips

### 8.2 Scalability Considerations

- ML inference horizontally scalable via SageMaker endpoints
- Database: Read replicas for high-traffic salary/college queries
- CDN: CloudFront for static assets (PWA performance in Tier-3 India)
- Target: Handle 100,000 concurrent users without degradation (Year 2 scale)
- GDPR / DPDP Act (India) compliance: Data minimization, right to deletion, consent management

---

## 9. UX Philosophy

### 9.1 The Core Tension: Truth vs. Overwhelm

The biggest UX challenge: financial reality is complex. But complexity causes paralysis, and paralysis leads users to close the app and sign the loan form their parents handed them.

**Principle 1: Progressive Disclosure of Truth**  
Never show everything at once. Start with one number that matters. Let users drill deeper.

- Layer 0: "Your real total repayment is ₹28.4 lakhs, not ₹20 lakhs." (Hook)
- Layer 1: Breakdown of interest, opportunity cost, hidden fees (Understanding)
- Layer 2: Career ROI overlay, Life milestone impact (Decision context)
- Layer 3: Alternatives, negotiation insights, failure simulation (Action)

**Principle 2: Avoid "Pretty Lies"**  
No dark patterns. No optimistic default settings. No pre-filled "expected salary" that matches the college's marketed figure.
- Default salary prediction = median, not best case
- Default interest rate = current floating rate, not lowest available rate
- Progress bars show "you are here" in the loan journey, not how much is left to borrow

**Principle 3: Decision-Forcing UI**  
Every screen should end with a decision prompt, not a passive scroll. After showing stress index:  
> "Given this stress score of 74/100, do you want to: [See alternatives] [Adjust loan amount] [Understand what this means for my family] [I understand the risk — show me how to proceed anyway]"

**Principle 4: Emotional Calibration**  
Acknowledge the aspiration before delivering the truth. Nobody wants to hear "your dream is financially dangerous" without first feeling heard.  
> "Studying abroad is one of the most transformative decisions you can make. Here's what it will actually cost you — so you can plan for it clearly."

**Principle 5: Plain Language, Always**  
Test all UI copy with a Tier-3 city user who has Class 12 education. If they don't understand it, rewrite it.  
No: "Your debt-to-income ratio exceeds conservative underwriting thresholds."  
Yes: "Your loan EMI will eat up 48% of your take-home salary. Most financial advisors say this should be under 30%."

### 9.2 Key UI Components

- **Loan Truth Meter:** A single 0–100 gauge that summarizes risk. Green (safe) / Yellow (caution) / Red (danger) — immediately visible, always contextualized.
- **Scenario Slider:** User can drag between best/median/worst case salary scenarios and watch all dependent numbers update in real time.
- **Life Timeline:** Horizontal scrollable timeline marking loan end, savings start, financial freedom, and key life events.
- **Comparison Panel:** Side-by-side: "Your planned loan" vs. "Best alternative we found for you."
- **Parent View Toggle:** One-tap switch to a simplified, parent-appropriate version of the same data.

---

## 10. Monetization Strategy

### 10.1 Revenue Tiers

**Freemium Core (Free Forever)**
- Basic True Cost Calculator (without opportunity cost engine)
- Rough salary range (national average for degree, no college-specific data)
- 1 risk flag (if loan/salary ratio is egregious)
- Reason: User acquisition, trust building, network effects

**TrueCost Pro (₹499 / $7 — one-time or ₹99/month)**
- Full True Cost Engine (inflation-adjusted, opportunity cost, variable rate simulation)
- College-specific verified salary data
- Life milestone timeline
- Failure simulation
- Alternative path suggestions
- Loan negotiation insights
- Family impact report (PDF export)

**Premium / Advisory (₹2,999 / $35 — one-time)**
- Everything in Pro
- AI Challenger session (20-minute structured conversation)
- 30-minute live consultation with SEBI-registered financial advisor (via partner network)
- Personalized scholarship matching
- 6-month post-graduation tracking setup

### 10.2 B2B Revenue (Higher Margin, Scale)

**Bank / NBFC Partnerships — Lead Quality Enhancement**
- Banks pay per qualified, pre-analyzed lead
- Value proposition: Students who come through TrueCost AI are more informed → lower NPA rates → banks pay premium for this
- Pricing: ₹800–2,000 per qualified lead (vs. ₹200–400 for generic leads)
- **Ethical constraint:** No paid prioritization of lenders in comparison results. Banks can only appear if they offer competitive rates. Transparency disclosure on all bank partnerships.

**University Partnerships — Enrollment Counseling**
- Universities pay to be verified on the platform (placement data verification, not promotion)
- Students trust verified data → universities with genuinely good outcomes benefit
- Pricing: ₹50,000–5,00,000/year based on institution size

**EdTech Partnerships**
- Upskilling platforms (Coursera, UpGrad, Scaler) pay to appear in "Alternative Path" suggestions when relevant — strictly performance-based (user takes the alternative)
- Not display advertising — contextual, outcome-aligned

**Enterprise / Government**
- White-label the risk intelligence engine for banks' internal loan counseling desks
- State government financial literacy programs
- National Skill Development Corporation integration

### 10.3 Ethical Guardrails on Monetization

- No financial institution can pay to improve their risk rating on our platform
- All partnership disclosures visible to users
- Bank recommendations ranked only by rate + terms — never by referral fee
- Annual third-party ethics audit of recommendation algorithms

---

## 11. Risks & Failure Points — Brutal Honesty

### 11.1 Data Accuracy Risk (High)
**Problem:** If our salary predictions are systematically wrong — even slightly — we will make thousands of students make worse decisions than if they had used nothing. This is worse than EMI calculators.  
**Mitigation:** Explicit confidence intervals on all predictions. Mandatory "This is a prediction, not a guarantee" framing. Regular backtesting against actual outcomes. But the risk never fully disappears.

### 11.2 Legal / Regulatory Risk (High)
**Problem:** India's financial advice regulatory framework (SEBI) and RBI regulations mean telling someone "this loan is dangerous" could be construed as financial advice — which requires a license.  
**Mitigation:** All outputs framed as "information" not "advice." Mandatory disclaimer. Partner with SEBI-registered advisors for premium tier. Consult with RBI FinTech regulatory sandbox — there is precedent for this (PolicyBazaar, CRED have navigated similar issues). But regulations change, and this is an ongoing risk.

### 11.3 College / Institution Pushback (Medium-High)
**Problem:** When we publish that a college's true median salary is ₹3.8 LPA vs. their advertised ₹8 LPA, they will threaten legal action, deny our scraping, and pressure banks to cut ties with us.  
**Mitigation:** Rigorous data documentation. Every data point cited with source. Legal team on retainer. Position as "publishing aggregated, anonymized market data" — legally defensible. Build public transparency as brand advantage: attacks from colleges prove we're right.

### 11.4 User Trust Deficit (High in Early Stage)
**Problem:** Why would a student trust an app over their parents, their bank, and their college agent — all of whom are telling them the loan is fine?  
**Mitigation:** Social proof at scale. Alumni testimonials: "This app told me my college was overrated — I chose differently and it changed my life." PR strategy: position the app as the student's only advocate. First 10,000 users = most important investment.

### 11.5 Data Chicken-and-Egg Problem (Medium)
**Problem:** Our salary prediction model is only as good as our data. In early months, the data will be sparse. Predictions will be less accurate. This undermines trust exactly when we need to build it.  
**Mitigation:** Launch with national-level salary data (broad but available). Be transparent about data coverage ("This prediction is based on 142 data points for this college — confidence: moderate"). Improve fast. Use public datasets to bootstrap.

### 11.6 Behavioral Resistance — "I Don't Want to Hear the Truth" (Medium)
**Problem:** Many students will open TrueCost AI, see a dangerous rating, and close the app. Confirmation bias is powerful. Truth-telling tools can drive users away.  
**Mitigation:** UX design that validates aspiration before delivering truth. The goal is not to stop them — it is to ensure they made an informed choice. "Proceed anyway" must always be an option. We are not a gatekeeper.

### 11.7 Why This Product Might Fail
- We get the data wrong on high-profile cases and get sued or shamed into silence
- Colleges and banks collectively freeze us out of partnerships and APIs
- A better-funded competitor (BankBazaar, Paisabazaar, NerdWallet India) clones the concept with their existing user base and data infrastructure
- Students don't want truth — they want validation, and the product doesn't find a UX formula that bridges that gap
- Regulatory environment tightens around non-licensed financial information platforms

---

## 12. MVP Scope — 4 to 6 Weeks

### Build (Week 1–2):
- True Cost Calculator (loan amount, rate, tenure → total repayment, interest breakdown, real cost in plain language)
- Basic Opportunity Cost Engine (static, not AI-powered — rule-based)
- Loan-to-Salary ratio check (using national average salaries by degree from NCES/AISHE public data)
- Basic risk flag (Red / Yellow / Green) based on loan-to-salary ratio
- Web app only (mobile-responsive)

### Build (Week 3–4):
- College search with manual database of top 200 colleges (India)
- Salary prediction — pre-computed ranges per college-degree combination (no live ML yet; lookup table from curated research)
- 3-scenario salary output (best/median/worst)
- Life milestone timeline (static, based on inputs)
- Basic alternative path suggestions (rule-based: "If loan > ₹15L and college risk is high, suggest 3 cheaper alternatives")
- User account + save scenario

### Build (Week 5–6):
- PDF report export (for sharing with family)
- "What if I fail?" basic simulation (static calculation, not ML)
- Referral system (share your TrueCost report)
- Analytics setup (Mixpanel / Amplitude)
- Beta testing with 200 real students

### Explicitly NOT in MVP:
- AI Challenger (requires LLM integration, prompt engineering, safety review)
- Variable rate stress test (needs real-time RBI data integration)
- Alumni outcome database (requires months of data collection)
- Mobile app (web PWA is sufficient for MVP)
- Bank partnership / lead generation (post-PMF)
- International scenarios (US, UK loans) — India only in MVP
- Live ML model (use lookup tables, upgrade post-MVP when data volume justifies it)

### MVP Success Criteria (End of Week 6):
- 500 completed analyses (user goes from input to output without dropping off)
- 35% return rate (users come back with updated scenarios)
- 20% report share rate (family impact report shared externally)
- NPS ≥ 50 from beta users
- At least 5 documented cases of users changing their loan decision based on the tool

---

## 13. Success Metrics — Post-MVP

### North Star
- % of users who modified their loan decision after using TrueCost AI (target: 35% at Month 6)

### Product Metrics
| Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|
| Monthly Active Users | 10,000 | 50,000 | 2,00,000 |
| Analysis Completion Rate | >60% | >70% | >75% |
| Pro Conversion Rate | 3% | 5% | 8% |
| NPS | 50+ | 60+ | 65+ |
| Data Points Collected | 5,000 | 25,000 | 1,00,000 |
| Colleges in Database | 200 | 500 | 1,000 |

### Impact Metrics (Why This Company Exists)
- Total loan value influenced (users who changed decision × average loan size)
- Average improvement in loan-to-salary ratio for users who heeded warnings
- Scholarship value captured (users who applied and received scholarships via our matching)
- Community-submitted salary data points (building the data moat)

---

## 14. Appendix

### A. Competitive Landscape

| Competitor | What They Do | What We Do Better |
|---|---|---|
| Bank EMI Calculators | EMI only | Full cost, ROI, risk intelligence |
| BankBazaar / PaisaBazaar | Loan comparison, lead gen | No conflict of interest; career ROI; truth-first |
| NerdWallet (US) | Loan comparison | Salary prediction, college risk, life impact |
| Credello (US) | Debt management | Decision engine, not just management |
| College Vidya | College comparison | Financial truth layer, not enrollment funnel |
| Career360 | College rankings | Loan+ROI integration, salary verification |

### B. Regulatory References
- RBI Master Circular on Education Loans (Priority Sector)
- SEBI Investment Adviser Regulations 2013 (boundary for "advice" vs. "information")
- Section 80E Income Tax Act (education loan interest deduction)
- DPDP Act 2023 (Digital Personal Data Protection — India)
- UGC mandatory disclosure framework for institutions

### C. Key Partnerships to Pursue (Pre-Launch)
1. SBI Student Loans (largest education lender in India — data partnership)
2. NSDL / CIBIL (credit data, anonymized NPA correlation)
3. Pratham / Ashoka University (credibility and mission alignment)
4. NSE / BSE (opportunity cost data — index return benchmarks)
5. Jio / BSNL (distribution — reach Tier-3 users)

### D. Founding Team Requirements
- Head of Product: EdTech + FinTech experience mandatory
- ML Engineer: Salary prediction model + NLP (AI Challenger)
- Data Engineer: Scraping infrastructure + pipeline
- Full-Stack Developer (2): React/Node or Python
- Domain Expert (part-time): SEBI-registered financial advisor (compliance + content)
- Growth: Education community experience (NIT/IIT alumni networks critical for early data)

---

*This document is confidential and intended for internal planning and investor review purposes only. All financial projections, market data, and technical specifications are subject to validation during discovery and development phases.*

*TrueCost AI exists because a student deserves to know the truth before they sign. Everything else follows from that.*
