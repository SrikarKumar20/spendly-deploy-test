# TODO (Spendly) — what you must complete

Complete every task in `src/app.ts`. Each task maps to the marks below.
Build with `npm run build` (must compile with **zero** type errors).

| # | Task (in `src/app.ts`) | Concept | Marks |
|---|---|---|:---:|
| 1 | Define the `Category` **enum** (Food, Travel, Bills, Other) | Enums | 4 |
| 2 | Define the `Expense` **model type** (`id`, `title`, `amount`, `category`) | Model & Types | 5 |
| 3 | Declare **utility types**: `Omit<Expense,"id">`, `Record<Category,number>`, and one of `Partial`/`Pick` | Utility Types | 8 |
| 4 | Define the `SummaryRow` **tuple** `[Category, number]` | Tuples | 4 |
| 5 | Write the **type guard** `toNewExpense(...)` that narrows raw form strings to a valid `NewExpense` (or `null`) | Type Guards & Narrowing | 7 |
| 6 | Implement `total()` and `breakdown()` (correct maths) | Core logic | 7 |
| 7 | **DOM wiring + render**: typed `getElementById` casts, submit handler, show errors, paint list/total/breakdown | UI, Build & Ship | 8 |
| 8 | **Build & ship**: `npm run build` passes under strict mode; `index.html` loads compiled JS; app runs | Tooling & Compiling | 3 |
| 9 | **Deploy**: publish to GitHub Pages / Netlify / Vercel and paste the live URL in `README.md` | Build & Ship | 4 |

**Total: 50 marks** (HTML/CSS quality is graded within tasks 7 & overall presentation — see the question's rubric).

## Definition of done
- [ ] All TODOs in `src/app.ts` completed, no `any` used to bypass types.
- [ ] `npm run build` → **0 errors**.
- [ ] Open `index.html` → can add an expense, see it listed, see total + per-category breakdown, and get an error on invalid input.
- [ ] App deployed; **live URL added to README.md**.
- [ ] Project zipped (no `node_modules/`) and submitted.
