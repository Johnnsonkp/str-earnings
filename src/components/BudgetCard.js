import "../App.css";

import { Button, Card, ProgressBar, Stack } from "react-bootstrap";

import { currencyFormatter } from "../utils";
import { useBudgets } from "../contexts/BudgetsContext";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  toggle,
  onAddExpenseClick,
  onViewExpensesClick,
  totalMargin,
  totalTitle,
  totalProfit,
  totalCurrencyFontSize,
}) {
  const classNames = [];
  if ((amount > max && totalTitle) || totalProfit) {
    classNames.push("success-background", "card-style");
  } else if (gray) {
    classNames.push("light-white", "bg-opacity-10");
  }
  const { budgets, getBudgetExpenses } = useBudgets();

  return (
    <Card className={`${!hideButtons && "mb-4"} ${classNames.join(" ")}`}>
      <Card.Body>
        <Card.Title
          className={`d-flex justify-content-between align-items-baseline fw-normal mb-3 ${totalMargin}`}
        >
          <div className="me-2" style={{ fontSize: totalTitle }}>
            {name}
          </div>
          <div
            className={`d-flex align-items-baseline ${totalCurrencyFontSize}`}
          >
            {currencyFormatter.format(amount)}
            {max && !totalProfit && (
              <span className={`text-muted fs-6 ms-1`}>
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        <hr></hr>
        {max && (
          <ProgressBar
            className="rounded-pill bg-opacity-12"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-5">
            <Button variant={`outline-${getProgressBarVariant(amount, max)}`}>
              Earnings Percentage: {Math.floor((amount / max) * 100)}%
            </Button>
            <Button
              variant="outline-info"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Earnings
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-success">
              View Earnings
            </Button>
            {/* <Button onClick={onViewExpensesClick} variant="outline-warning">
              Add Occupancy Rate
            </Button> */}
          </Stack>
        )}
        {hideButtons &&
          !totalProfit &&
          budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <>
                {amount > 0 && (
                  <Button
                    variant={`${
                      amount > budget.max ? "outline-success" : "outline-danger"
                    }`}
                    style={{
                      marginTop: "25px",
                      marginBottom: "30px",
                      marginRight: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {budget.name.slice(0, 20)} -{" "}
                    <span style={{ padding: "3px" }}>
                      ${Math.floor(amount)}
                    </span>
                  </Button>
                )}
              </>
            );
          })}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "danger";
  if (ratio < 0.75) return "warning";
  return "success";
}
