import createHttpError from "http-errors";
import prisma from "../db/prisma.js";

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  res.status(200).json(products);
};

export const createProduct = async (req, res) => {
  const body = req.body;

  let status;

  if (body.quantity === 0) {
    status = "out_of_stock";
  } else if (body.quantity >= 1 && body.quantity <= 5) {
    status = "low_stock";
  } else {
    status = "in_stock";
  }

  const product = await prisma.product.create({
    data: {
      ...body,
      status,
    },
  });

  res.status(201).json(product);
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  let status;
  let updatedBody;

  if (body.quantity !== undefined) {
    if (body.quantity === 0) {
      status = "out_of_stock";
    } else if (body.quantity >= 1 && body.quantity <= 5) {
      status = "low_stock";
    } else {
      status = "in_stock";
    }

    updatedBody = {
      ...body,
      status,
    };
  } else {
    updatedBody = body;
  }

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: updatedBody,
  });

  res.status(200).json(product);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json(product);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    throw createHttpError(404, "Product is not found");
  }

  res.status(200).json(product);
};
