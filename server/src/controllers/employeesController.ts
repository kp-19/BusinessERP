import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await prisma.employees.findMany();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees" });
  }
};

// Controller function to create a new employee
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { eId, name, email, contactNo, salary } = req.body;
    const employee = await prisma.employees.create({
      data: {
        eId,
        name,
        email,
        contactNo,
        salary,
      },
    });
    res.status(201).json(employee);  // Sending the response directly
  } catch (error) {
    res.status(500).json({ message: "Error adding employee" });
  }
};



export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedEmployee = await prisma.employees.delete({
      where: { eId: id },
    });

    if (!deletedEmployee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee" });
  }
};