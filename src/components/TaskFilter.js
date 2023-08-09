import React from "react";
import { Paper, Button, TextField, MenuItem } from "@mui/material";

function TaskFilter({
  filterDueDate,
  filterCompletion,
  onFilter,
  setFilterDueDate,
  setFilterCompletion,
}) {
  return (
    <Paper style={{ padding: "20px" }}>
      <h2>Filter Tasks</h2>
      <TextField
        label="Filter by Due Date"
        type="date"
        variant="outlined"
        value={filterDueDate}
        onChange={(e) => setFilterDueDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            color: "black",
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "8px",
            width: "300px",
          },
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <TextField
          label="Filter by Completion"
          select
          variant="outlined"
          value={filterCompletion}
          onChange={(e) => setFilterCompletion(e.target.value)}
          InputProps={{ style: { width: "300px" } }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="true">Complete</MenuItem>
          <MenuItem value="false">Incomplete</MenuItem>
        </TextField>
      </div>
      <Button variant="contained" onClick={onFilter}>
        Apply Filters
      </Button>
    </Paper>
  );
}

export default TaskFilter;
