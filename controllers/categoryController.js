import Category from '../models/categoryModel';
import Product from '../models/productModel';
import Sub from '../models/subModel';
import slugify from 'slugify';

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    res.status(400).send("Create category failed");
  }
};

const getCategories = async (req, res) => {
  res.json(await Category.find({}).exec());
}

const getCategory = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate("category").exec();

  res.json({
    category,
    products,
  });
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Category update failed");
  }
};

const removeCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};

const getBrands = (req, res) => {
  Brand.find({ parent: req.params._id }).exec((err, brand) => {
    if (err) console.log(err);
    res.json(brand);
  });
};

const getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};

export{
    createCategory,
    getCategories,
    getCategory,
    getBrands,
    updateCategory,
    removeCategory,
    getSubs
}