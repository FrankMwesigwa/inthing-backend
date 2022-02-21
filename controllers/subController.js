import Product from "../models/productModel";
import Brand from "../models/subModel";

const createSub = async (req, res) => {
  try {
    const { name, category } = req.body;
    res.json(await new Brand({ name, category }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create sub failed");
  }
};

const listSub = async (req, res) =>
  res.json(await Brand.find({}).populate("category").exec());

const readSub = async (req, res) => {
  let sub = await Brand.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub })
    .populate("category")
    .exec();

  res.json({
    sub,
    products,
  });
};

const updateSub = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Brand.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Brand update failed");
  }
};

const removeSub = async (req, res) => {
  try {
    const deleted = await Brand.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Brand delete failed");
  }
};

export { createSub, readSub, listSub, updateSub, removeSub };
