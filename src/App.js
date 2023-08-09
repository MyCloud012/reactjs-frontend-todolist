import React, { useEffect, useState } from "react";
import { Container, Grid, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import * as api from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterDueDate, setFilterDueDate] = useState("");
  const [filterCompletion, setFilterCompletion] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const handleSnackbarOpen = (message) => {
    setFeedbackMessage(message);
    setSnackbarOpen(true);
  };

  async function getTasks() {
    const fetchedTasks = await api.fetchTasks();
    setTasks(fetchedTasks);
  }

  async function createTask(taskData) {
    await api.createNewTask(taskData);
    // Update tasks state without additional API call
    setTasks((prevTasks) => [...prevTasks, taskData]);
    handleSnackbarOpen("Task created successfully");
  }

  async function markAsCompleted(taskId, complete) {
    await api.markTaskAsCompleted(taskId, complete);
    // Update tasks state without additional API call
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, complete } : task
      )
    );
    handleSnackbarOpen("Task marked as completed");
  }

  async function deleteTask(taskId) {
    await api.deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    handleSnackbarOpen("Task deleted");
  }

  async function getTasksWithFilters() {
    const filteredTasks = await api.fetchTasksWithFilters(
      filterDueDate,
      filterCompletion
    );
    setTasks(filteredTasks);
    handleSnackbarOpen("Filter applied successfully");
  }

  return (
    <Container>
      <h1>Tasks App</h1>
      <TaskForm onSubmit={createTask} />

      <div style={{ marginTop: "20px" }}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6} style={{ height: "100%" }}>
            <TaskFilter
              filterDueDate={filterDueDate}
              filterCompletion={filterCompletion}
              onFilter={getTasksWithFilters}
              setFilterDueDate={setFilterDueDate}
              setFilterCompletion={setFilterCompletion}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ height: "100%" }}>
            <TaskList
              tasks={tasks}
              markAsCompleted={markAsCompleted}
              deleteTask={deleteTask}
            />
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity="success"
          >
            {feedbackMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </Container>
  );
}

export default App;
