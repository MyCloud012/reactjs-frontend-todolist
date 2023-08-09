import axios from "axios";

const apiInstance = axios.create({
  baseURL:
    "http://tasks-app-backend-3-env.eba-iiaw6pev.us-east-1.elasticbeanstalk.com/tasks",
});

export const fetchTasks = async () => {
  try {
    const response = await apiInstance.get("/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createNewTask = async (taskData) => {
  try {
    await apiInstance.post("/", taskData);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const markTaskAsCompleted = async (taskId, complete) => {
  try {
    await apiInstance.put(`/${taskId}/status?complete=${complete}`);
  } catch (error) {
    console.error("Error marking task as completed:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await apiInstance.delete(`/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const fetchTasksWithFilters = async (
  filterDueDate,
  filterCompletion
) => {
  try {
    const params = {};

    // Check if filterDueDate is provided
    if (filterDueDate) {
      params.dueDate = filterDueDate;

      // Check if filterCompletion is not "all"
      if (filterCompletion !== "all") {
        params.complete = filterCompletion;
      }
    }
    // Check if filterDueDate is not provided and filterCompletion is "all"
    else if (filterCompletion === "all") {
      return fetchTasks();
    }
    // Check if filterDueDate is not provided and filterCompletion is not empty
    else if (filterCompletion !== "") {
      params.complete = filterCompletion;
    }

    const response = await apiInstance.get("/filter", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks with filters:", error);
    throw error;
  }
};
