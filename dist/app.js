"use strict";
/* Spendly — reference solution (for verifying the assignment is doable). */
// TASK 1 — enum
var Category;
(function (Category) {
    Category["Food"] = "Food";
    Category["Travel"] = "Travel";
    Category["Bills"] = "Bills";
    Category["Other"] = "Other";
})(Category || (Category = {}));
const expenses = [];
let nextId = 1;
// TASK 5 — type guard / narrowing
function toNewExpense(title, amountRaw, category) {
    const cleanTitle = title.trim();
    const amount = Number(amountRaw);
    const validCategory = Object.values(Category).includes(category);
    if (cleanTitle.length === 0 ||
        typeof amount !== "number" ||
        Number.isNaN(amount) ||
        amount <= 0 ||
        !validCategory) {
        return null;
    }
    return { title: cleanTitle, amount, category: category };
}
// TASK 6 — core logic
function total() {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
}
function breakdown() {
    const acc = {};
    for (const c of Object.values(Category))
        acc[c] = 0;
    for (const e of expenses)
        acc[e.category] += e.amount;
    return Object.values(Category).map((c) => [c, acc[c]]);
}
// (ExpenseEdit demo — a tiny update helper, shows Partial usage)
function applyEdit(id, changes) {
    const e = expenses.find((x) => x.id === id);
    if (e)
        Object.assign(e, changes);
}
// TASK 7 — DOM wiring + render
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const errorEl = document.getElementById("error");
const listEl = document.getElementById("list");
const totalEl = document.getElementById("total");
const breakdownEl = document.getElementById("breakdown");
function render() {
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
form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.textContent = "";
    const candidate = toNewExpense(titleInput.value, amountInput.value, categoryInput.value);
    if (!candidate) {
        errorEl.textContent =
            "Please enter a title and a positive amount, and pick a category.";
        return;
    }
    const expense = { id: nextId++, ...candidate };
    expenses.push(expense);
    form.reset();
    titleInput.focus();
    render();
});
render();
