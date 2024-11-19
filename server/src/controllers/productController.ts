import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);  // Sending the response directly
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity, thumbnailUrl } = req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
        thumbnailUrl,
      },
    });
    res.status(201).json(product);  // Sending the response directly
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    // Delete the product by productId
    const deletedProduct = await prisma.products.delete({
      where: {
        productId: productId, // assuming `productId` is the primary key or unique identifier for the product
      },
    });
    res.status(200).json({ message: "Product deleted successfully" });  // Sending the response directly
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
