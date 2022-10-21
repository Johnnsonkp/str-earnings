import { Button, Form, Modal } from "react-bootstrap";

import { useBudgets } from "../contexts/BudgetsContext";
import { useRef } from "react";

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const catRef = useRef();
  const { addBudget } = useBudgets();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("catRef", catRef.current.value, maxRef.current.value);
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      category: nameRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example" ref={catRef}>
              <option>Property</option>
              <option value="1">Expense</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
