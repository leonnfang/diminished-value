# After the Repair

A self-serve guide for a car owner who wants to pursue diminished value after a repair. The first version covers accidents in Washington, DC. It is not a law firm, it does not give legal advice, and it does not calculate a claim amount.

Photos, after-repair pictures, and the body-shop invoice stay in the browser tab. They are not uploaded. There is no account, database, or payment.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

That address only works on this computer. `npm run build` typechecks the app and writes a production build in `dist/`.

## Publish

GitHub Pages publishes this site from the `main` branch. The workflow in `.github/workflows/pages.yml` builds with `GITHUB_PAGES=true`, which serves the app from `/diminished-value/`. After that workflow succeeds, the public address is https://leonnfang.github.io/diminished-value/

`dist/404.html` is a copy of `index.html`, so refreshing a page such as `/intake` still loads the guide. `public/.nojekyll` keeps GitHub Pages from skipping files.

There is no login. Anyone with the link can use the guide. Photos and the invoice still stay in that person's browser.

## Official DC Courts pages

These are the court links the filing path uses. They were checked on November 19, 2026. Read the live page for current forms, fees, and hours.

- Small Claims branch: https://www.dccourts.gov/superior-court/superior-court-divisions/civil-division/small-claims
- Statement of Claim form: https://www.dccourts.gov/court-resources/search-forms/statement-of-claim-small-claims
- Statement of Claim PDF: https://www.dccourts.gov/sites/default/files/2023-11/Statement_of_Claim_Small_Claims_0.pdf
- Information Sheet form: https://www.dccourts.gov/court-resources/search-forms/small-claims-information-sheet
- Information Sheet PDF: https://www.dccourts.gov/sites/default/files/2018-10/SmallClaimsInformationSheet.pdf
- All Small Claims forms: https://www.dccourts.gov/court-resources/search-forms?location=smallclaims
- Small Claims handbook (PDF): https://www.dccourts.gov/sites/default/files/2026-08/2026-Small-Claims-Handbook-Final.pdf
- eFiling: https://www.dccourts.gov/superior-court/file-online-efiling
- Civil Actions branch: https://www.dccourts.gov/superior-court/superior-court-divisions/civil-division/civil-actions
