import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function TaskForm({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ description, dueDate });
    setDescription("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        label="Task Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ marginBottom: "10px", width: "300px" }}
      />
      <TextField
        label="Due Date"
        type="date"
        variant="outlined"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "4px",
            width: "300px",
          },
        }}
        style={{ marginBottom: "10px" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "300px" }}
      >
        Create Task
      </Button>
    </form>
  );
}

export default TaskForm;
