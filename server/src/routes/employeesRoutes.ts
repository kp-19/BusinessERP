import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployees } from "../controllers/employeesController";

const router = Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.delete("/:id", deleteEmployee);  // Add the DELETE route

export default router;