import express, { Request, Response } from "express";
import { PRODUCTS } from "../Models/ProductModel";
import { ProductParams } from "../dto/Product";
import mongoose from "mongoose";

const path = "http://localhost:8888/assets/";

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    price,
    oldPrice,
    description,
    quantity,
    inStock,
    isFeatured,
    category,
  } = <ProductParams>req.body;

  const files = req.files as [Express.Multer.File];
  const images = files.map((file: Express.Multer.File) => path + file.filename);

  const product = new PRODUCTS({
    name: name,
    images: images,
    price,
    oldPrice,
    description,
    quantity,
    inStock,
    isFeatured,
    category,
  });

  try {
    console.log(product);
    await product.save();
    res.status(200).json(`Product create successfully :-) + ${path}!!!`);
  } catch (error) {
    res.status(500).json(`Failed to create Product ${error} :-(`);
  }
};
export const getProductByCatID = async (req: Request, res: Response) => {
  console.log(req.params.CatID);
  try {
    const result = await PRODUCTS.find({ category: req.params.CatID });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(`ProductByID fetch failed ${error} :-(`);
  }
};





  
export const getProductByID = async (req: Request, res: Response) => {
  try {
    const result = await PRODUCTS.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(`Product fetch failed ${error} :-( `);
  }
};
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await PRODUCTS.find().sort({ createdAt: -1 }); // Sorting by newest first
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(`Products not found ${error} :-( `);
  }
};

// export const getProductByName = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { name } = req.query; // Lấy tham số `name` từ query params
  
//       if (!name || typeof name !== "string") {
//         return res.status(400).json({ message: "Tên sản phẩm không hợp lệ." });
//       }
  
//       const result = await PRODUCTS.find({ name: { $regex: name, $options: "i" } });
  
//       if (!result || result.length === 0) {
//         return res.status(404).json({ message: "Không tìm thấy sản phẩm nào." });
//       }
  
//       return res.status(200).json(result);
//     } catch (error) {
//       console.error("Error filtering products:", error);
//       return res.status(500).json({ message: `Lỗi khi tìm kiếm sản phẩm: ${error}` });
//     }
//   };