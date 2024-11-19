"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeesController_1 = require("../controllers/employeesController");
const router = (0, express_1.Router)();
router.get("/", employeesController_1.getEmployees);
router.post("/", employeesController_1.createEmployee);
router.delete("/:id", employeesController_1.deleteEmployee); // Add the DELETE route
exports.default = router;
