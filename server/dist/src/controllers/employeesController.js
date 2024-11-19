"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.createEmployee = exports.getEmployees = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield prisma.employees.findMany();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving employees" });
    }
});
exports.getEmployees = getEmployees;
// Controller function to create a new employee
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eId, name, email, contactNo, salary } = req.body;
        const employee = yield prisma.employees.create({
            data: {
                eId,
                name,
                email,
                contactNo,
                salary,
            },
        });
        res.status(201).json(employee); // Sending the response directly
    }
    catch (error) {
        res.status(500).json({ message: "Error adding employee" });
    }
});
exports.createEmployee = createEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedEmployee = yield prisma.employees.delete({
            where: { eId: id },
        });
        if (!deletedEmployee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting employee" });
    }
});
exports.deleteEmployee = deleteEmployee;
