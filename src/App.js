import "./App.css";

import { Button, Stack, ToggleButton } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import { useEffect, useState } from "react";

import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import Container from "react-bootstrap/Container";
import ProfitTotals from "./components/ProfitTotals";
import TotalBudgetCard from "./components/TotalBudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses, expenses } = useBudgets();
  const [toggle, setToggle] = useState(false);
  const propertyCount = [];
  const expenseCount = [];

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const amount = expenses.reduce((total, budget) => total + budget.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;

  function TotalBorderOutlineColour(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "#ffc107";
    if (ratio < 0.75) return "#0d6efd";
    if (ratio > 0.75) return "rgb(0, 200, 117)";
  }

  return (
    <div
      className="default-background"
      style={{ background: "#f3f2f1 !important" }}
    >
      <div
        style={{
          borderBottom: "0.5px solid #F9F9F9",
          marginBottom: "50px",
          backgroundColor: "#F9F9F9",
          background: "rgb(33,37,41)",
        }}
      >
        <Container className="my-0">
          <Stack
            direction="horizontal"
            gap="2"
            className="mb-3 mt-0 pt-4"
            style={{
              display: "flex",
              flexDirection: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <h2
              className="me-auto"
              style={{ color: "#39364e", color: "#fff", fontWeight: "900" }}
            >
              STR EARNINGS
            </h2>
            <Stack direction="horizontal" gap="2">
              <Button
                variant="outline-info"
                onClick={() => setShowAddBudgetModal(true)}
              >
                Add Expense
              </Button>
              <hr style={{ opacity: "0.1" }}></hr>
              <Button variant="success" onClick={openAddExpenseModal}>
                Add Earnings
              </Button>
            </Stack>
          </Stack>
        </Container>
      </div>

      <Container className="my-4 pb-5">
        <div
          style={{
            display: "grid",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              border: `3px solid ${TotalBorderOutlineColour(amount, max)}`,
              borderRadius: "25px",
              padding: "4px",
              marginBottom: "0px",
            }}
          >
            <TotalBudgetCard />
          </div>
          <div
            style={{
              border: `3px solid ${TotalBorderOutlineColour(amount, max)}`,
              borderRadius: "25px",
              padding: "4px",
              marginBottom: "30px",
            }}
          >
            <ProfitTotals />
          </div>
          {/* <hr style={{ opacity: "0.1" }}></hr> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0px",
            }}
          >
            <h5
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Properties:
              {budgets.forEach((property) => {
                if (!property.category || property.category === "property") {
                  propertyCount.push(property.id);
                }
              })}
              <span
                style={{
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                {propertyCount.length}
              </span>
            </h5>
            <ToggleButton
              variant="secondary"
              checked
              onClick={() => setToggle(!toggle)}
            >
              Toggle View
            </ToggleButton>
          </div>
          <hr style={{ opacity: "0.1" }}></hr>
          <div
            style={{
              display: toggle ? "flex" : "",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {budgets.map((budget) => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );

              return !budget.category || budget.category === "property" ? (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  gray
                  toggle={toggle}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(budget.id)
                  }
                  category={budget.category ? budget.category : ""}
                />
              ) : null;
            })}
          </div>

          {/* Budget expense  */}
          {/* <hr style={{ opacity: "0.1" }}></hr> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0px",
            }}
          >
            <h5
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Expenses:
              {budgets.forEach((expense) => {
                if (
                  expense.category
                    ? expense.category || expense.category === "expense"
                    : false
                ) {
                  expenseCount.push(expense.id);
                }
              })}
              <span
                style={{
                  alignItems: "center",
                  marginLeft: "5px",
                }}
              >
                {expenseCount.length}
              </span>
            </h5>

            <ToggleButton
              variant="secondary"
              checked
              onClick={() => setToggle(!toggle)}
            >
              Toggle View
            </ToggleButton>
          </div>
          <hr style={{ opacity: "0.1" }}></hr>
          <div
            style={{
              display: toggle ? "flex" : "",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {budgets.map((budget) => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total, expense) => total + expense.amount,
                0
              );

              return budget.category || budget.category === "expense" ? (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  gray
                  toggle={toggle}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(budget.id)
                  }
                  category={budget.category ? budget.category : ""}
                />
              ) : null;
            })}
          </div>

          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </div>
  );
}

export default App;
