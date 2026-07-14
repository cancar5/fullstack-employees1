import express from "express";
const router = express.Router();
export default router;

import {
  getEmployee,
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

// TODO: this file!

//SENDS array of all employees
router.get("/", async (req, res) => {
  const employees = await getEmployees();

  res.send(employees);
});

//GET employees/:id
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const employee = await getEmployee(Number(id));
  if (!employee) {
    return response.status(404).send(`Employee with id ${id} was not found`);
  }
  response.send(employee);
});

//DELETE /employees/id
router.delete("/:id", async (request, response) => {
  const employee = await deleteEmployee(request.params.id);
  if (!employee) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
});

//UPDATE employee with specific id
router.put("/:id", async (request, response) => {
  if (!request.body)
    return response.status(400).send("Request must have a body.");

  // Note: we grab the ID from the request parameters, not the body
  const { name, birthday, salary } = request.body;
  if (!name || !birthday || !salary)
    return response
      .status(400)
      .send("Request body must have: name, birthday, salary");

  const employee = await updateEmployee({
    id: request.params.id,
    name,
    birthday,
    salary,
  });
  if (!employee) {
    return response.status(404);
  }
  return response.send(employee);
});

//POST /employees
router.post("/", async (request, response) => {
  console.log("body", request.body);
  if (!request.body) {
    return response.status(400).send("Request body is required");
  }
  const { name } = request.body;

  if (typeof name !== "string") {
    return response.status(400).send("Name must be string");
  }

  if (name.trim() === "") {
    return response.status(400).send("Name cannot be empty");
  }

  if (!name) {
    return response.status(400).send("Name is required");
  }
  const employee = await createEmployee(name);
  return response.status(201).json(employee);
});
