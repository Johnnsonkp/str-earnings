import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;
  const xmas95 = new Date();
  const options = { month: "long" };
  const CurrentMonth = new Intl.DateTimeFormat("en-US", options).format(xmas95);

  return (
    <BudgetCard
      amount={amount}
      name={`${CurrentMonth} Total Earnings Percentage [ ${Math.floor(
        (amount / max) * 100
      )}% ]`}
      gray
      max={max}
      hideButtons
      totalMargin={"mb-5"}
      totalTitle={"30px"}
      totalCurrencyFontSize={"fs-4"}
    />
  );
}
