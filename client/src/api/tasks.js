import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = () => axios.get(BASE_URL);

export const createTask = (taskdata) => axios.post(BASE_URL, taskdata);

export const updateTask = (id, updateData) =>
  axios.put(`${BASE_URL}/${id}`, updateData);

export const deleteTask = (id) => axios.delete(`${BASE_URL}/${id}`);
