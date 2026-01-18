# QA e-commerce take-home task 

This project started as a manual-only take-home QA assignment from a mid-sized e-commerce company. The task was to test an unfinished PWA site and report bugs.
I completed a manual test suite on the core flows, then extended it with Selenium automation to go beyond the requirements.

**Site:** Private QA task environment (intentionally buggy and incomplete)  
**Tech:** Zephyr Scale (manual), Jira Kanban, Selenium WebDriver + JavaScript/Node.js

## Manual Testing

**Core areas covered**
- Customer login & registration
- Product search
- Add to cart
- Coupon / discount handling
- Product filtering & sorting
- Product page details

**Key stats**  
- 23 test cases executed  
- 5 test cycles (including a regression cycle)  
- 91 % pass rate (21 pass / 2 fail)  
- 6 bugs identified and tracked

**Screenshots & evidence**



All findings were documented with clear steps, expected vs actual results, environment details, and screenshots.
This manual work formed the foundation for the automation suite below.

## Automation Testing (Selenium + JavaScript/Node.js)

**What I added**  
The original task was manual only. I took the initiative and built a small Selenium automation suite covering the most critical flows.

## Automated test cases

| # | Test case                              | Status | Screenshot
|---|----------------------------------------|--------|-------------------------------------------------------------
| 1 | Successful login                       | PASS   | ![login-success](src/assets/login-success.png)
| 2 | Add to basket – specific product       | PASS   | ![add-to-basket](src/assets/add-to-basket-SUCCESS.png)
| 3 | Category → sort by price: low to high  | PASS   | ![sort-low-to-high](src/assets/sort-low-to-high-SUCCESS.png)

## Challenges overcome
- React mega-menus with dynamic rendering
- “Element not interactable” and lazy-loading issues
- Unstable UI components and missing stable selectors
- Intentional bugs and incomplete functionality

## How to run
```bash
git clone https://github.com/Klimcuks/qa-ecommerce-project.git
cd qa-ecommerce-project
npm install selenium-webdriver chromedriver
node loginTest.js
node addToCartTest.js
node sortTest.js
```
Open to junior QA roles (manual + automation).
DM me. I'm happy to walk through the code or run the suite live.
