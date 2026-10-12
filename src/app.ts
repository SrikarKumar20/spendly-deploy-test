/* Spendly — reference solution (for verifying the assignment is doable). */

// TASK 1 — enum
enum Category {
  Food = "Food",
  Travel = "Travel",
  Bills = "Bills",
  Other = "Other",
}

// TASK 2 — model type
interface Expense {
  id: number;
  title: string;
  amount: number;
  category: Category;
}

// TASK 3 — utility types
type NewExpense = Omit<Expense, "id">;
type Breakdown = Record<Category, number>;
type ExpenseEdit = Partial<Expense>;

// TASK 4 — tuple
type SummaryRow = [Category, number];

const expenses: Expense[] = [];
let nextId = 1;

// TASK 5 — type guard / narrowing
function toNewExpense(
  title: string,
  amountRaw: string,
  category: string
): NewExpense | null {
  const cleanTitle = title.trim();
  const amount = Number(amountRaw);
  const validCategory = (Object.values(Category) as string[]).includes(category);

  if (
    cleanTitle.length === 0 ||
    typeof amount !== "number" ||
    Number.isNaN(amount) ||
    amount <= 0 ||
    !validCategory
  ) {
    return null;
  }

  return { title: cleanTitle, amount, category: category as Category };
}

// TASK 6 — core logic
function total(): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

function breakdown(): SummaryRow[] {
  const acc = {} as Breakdown;
  for (const c of Object.values(Category)) acc[c] = 0;
  for (const e of expenses) acc[e.category] += e.amount;
  return (Object.values(Category) as Category[]).map(
    (c) => [c, acc[c]] as SummaryRow
  );
}

// (ExpenseEdit demo — a tiny update helper, shows Partial usage)
function applyEdit(id: number, changes: ExpenseEdit): void {
  const e = expenses.find((x) => x.id === id);
  if (e) Object.assign(e, changes);
}

// TASK 7 — DOM wiring + render
const form = document.getElementById("expense-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;
const errorEl = document.getElementById("error") as HTMLParagraphElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const totalEl = document.getElementById("total") as HTMLParagraphElement;
const breakdownEl = document.getElementById("breakdown") as HTMLUListElement;

function render(): void {
  listEl.innerHTML = "";
  for (const e of expenses) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${e.title} <em>(${e.category})</em></span><span>₹${e.amount.toFixed(2)}</span>`;
    listEl.appendChild(li);
  }

  totalEl.textContent = `Total: ₹${total().toFixed(2)}`;

  breakdownEl.innerHTML = "";
  for (const [cat, amt] of breakdown()) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${cat}</span><span>₹${amt.toFixed(2)}</span>`;
    breakdownEl.appendChild(li);
  }
}

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  errorEl.textContent = "";

  const candidate = toNewExpense(
    titleInput.value,
    amountInput.value,
    categoryInput.value
  );

  if (!candidate) {
    errorEl.textContent =
      "Please enter a title and a positive amount, and pick a category.";
    return;
  }

  const expense: Expense = { id: nextId++, ...candidate };
  expenses.push(expense);
  form.reset();
  titleInput.focus();
  render();
});

render();
