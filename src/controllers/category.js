import Category from "../models/Category.js";
import slugify from "slugify";
import Product from "../models/Product.js";
import { categorySchema } from "../validSchema/categorySchema.js";

export const createCategory = async (req, res, next) => {
  // try {
  //   const slug = slugify(req.body.title, {
  //     replacement: "-",
  //     lower: true,
  //     strict: true,
  //     locale: "vi",
  //     trim: true,
  //   });
  //   console.log(slug);
  //   const data = await Category.create({ ...req.body, slug });
  //   if (data) {
  //     return res.status(201).json({
  //       success: true,
  //       data,
  //       message: "Tao danh muc thanh cong!",
  //     });
  //   }
  // } catch (error) {
  //   next(error);
  // }

  try {
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const data = await Category.create(req.body);
    if (!data) {
      return res.status(404).json({
        message: "Create category not successfully",
      });
    }

    return res.status(200).json({
      message: "Create category successfully",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      title: error.title,
      message: error.message,
    });
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // findByIdAndUpdate = patch;
    // findByIdAndReplace = put;
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Update danh muc thanh cong!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const removeCategoryById = async (req, res, next) => {
  try {
    if (req.param.id === "66aa54d5d2f3fffa474326da") {
      return res.status(400).json({
        message: "Khong xoa dk danh muc mac dinh",
        success: false,
      });
    }
    const data = await Category.findByIdAndDelete(req.params.id);

    // Chuyển toàn bộ sản phẩm thuộc danh mục bị xoá về danh mục mặc định
    const productToUpdate = await Product.find({ category: req.params.id });
    await Promise.all(
      productToUpdate.map(async (product) => {
        product.category = "66aa54d5d2f3fffa474326da";
        await product.save();
      })
    );
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Remove danh muc thanh cong!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    console.log("alo");
    const data = await Category.findById(req.params.id).populate("products");
    console.log(data);
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Tim danh muc thanh cong!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllCategorys = async (req, res, next) => {
  try {
    const data = await Category.find();
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Lay danh muc thanh cong!",
      });
    }
  } catch (error) {
    next(error);
  }
};
