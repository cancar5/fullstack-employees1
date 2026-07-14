import express from "express";
const app = express();
export default app;
import employeesRouter from "#api/employees";

import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

// TODO: this file!

app.use((request, response, next) => {
  console.log(`${request.method} ${request.path}`);
  next(); // move our middleware
});

app.get("/", (request, response) => {
  response.send("Welcome to the Fullstack Employees API.");
});

app.use(express.json());

app.use("/employees", employeesRouter);

app.use((error, request, response, next) => {
  console.error("There was an error:", error);
  response.status(500).send("Something went wrong!");
});
