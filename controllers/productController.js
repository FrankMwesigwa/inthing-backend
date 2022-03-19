import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Product from "../models/productModel.js";
import Sub from "../models/subModel";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({})
    .populate("category")
    .populate("brand")
    .sort({ createdAt: "desc" });

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    return res.json(product);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

const getProductsByBrand = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug });
  const products = await Product.find({ subs: sub }).populate("subs");

  res.json(products);
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};

const createProduct = asyncHandler(async (req, res) => {
  try {
    const productFields = {};

    const originalprice = req.body.price;
    const discount = req.body.discount;
    const afterDiscount = originalprice - (originalprice * discount) / 100;

    if (req.body.discount) {
      productFields.discountprice = afterDiscount;
    } else {
      productFields.discountprice = null;
    }

    productFields.images = req.body.images;
    productFields.title = req.body.title;
    productFields.description = req.body.description;
    productFields.price = req.body.price;
    productFields.discount = req.body.discount;
    productFields.subs = req.body.subs;
    productFields.category = req.body.category;
    productFields.quantity = req.body.quantity;
    productFields.color = req.body.color;
    productFields.manname = req.body.manname;
    productFields.manbrand = req.body.manbrand;
    productFields.slug = slugify(req.body.title);
    productFields.specifications = req.body.specifications.split(",");

    const newProduct = await new Product(productFields).save();
    res
      .status(201)
      .json({ message: "Product Created Successfully", newProduct });
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Create product failed");
  }
});

const updateProduct = async (req, res) => {
  try {
    const productFields = {};

    const originalprice = req.body.price;
    const discount = req.body.discount;
    const afterDiscount = originalprice - (originalprice * discount) / 100;

    if (req.body.discount) {
      productFields.discountprice = afterDiscount;
    } else {
      productFields.discountprice = null;
    }

    productFields.images = req.body.images;
    productFields.title = req.body.title;
    productFields.description = req.body.description;
    productFields.price = req.body.price;
    productFields.discount = req.body.discount;
    productFields.subs = req.body.subs;
    productFields.category = req.body.category;
    productFields.quantity = req.body.quantity;
    productFields.color = req.body.color;
    productFields.manname = req.body.manname;
    productFields.manbrand = req.body.manbrand;
    
    if (productFields.specifications) {
      productFields.specifications = req.body.specifications.split(",");
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      productFields,
      { new: true }
    ).exec();
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Update Product Creation Failed !!!");
  }
};

const listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    condition: product.condition,
  })
    .populate("category")
    .populate("subs")
    .exec();

  res.json(related);
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({
    title: { $regex: query, $options: "i" },
  })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

  res.json(products);
};

export const searchQuery = async (req, res) => {
  const products = await Product.find({})
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

  res.json(products);
};

const searchFilters = async (req, res) => {
  const { query } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }
};

const removeImage = async (req, res) => {
  try {
    const productFields = {};

    productFields.images = req.body.images;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      productFields,
      { new: true }
    ).exec();
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("Image Removed Failed !!!");
  }
};

export {
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductsByBrand,
  listRelated,
  searchFilters,
  removeImage,
};
