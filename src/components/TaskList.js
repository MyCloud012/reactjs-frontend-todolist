import React from "react";
import { Paper, Button } from "@mui/material";

function TaskList({ tasks, markAsCompleted, deleteTask }) {
  return (
    <Paper style={{ padding: "20px" }}>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks found matching the filter.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={{ marginBottom: "10px" }}>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Due Date:</strong> {task.dueDate}
            </p>
            <p>
              <strong>Complete:</strong> {task.complete ? "Yes" : "No"}
            </p>
            <Button
              variant="contained"
              color="success"
              onClick={() => markAsCompleted(task.id, true)}
            >
              Mark as Completed
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
            <hr />
          </div>
        ))
      )}
    </Paper>
  );
}

export default TaskList;
