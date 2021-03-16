import Product from '../models/productModel';
import Sub from '../models/subModel';
import slugify from 'slugify';

const createSub = async (req, res) => {
  try {
    const { name, parent } = req.body;
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err)
    res.status(400).send("Create sub failed");
  }
};

const listSub = async (req, res) =>
  res.json(await Sub.find({}).populate("category").exec());

const readSub = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
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
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub update failed");
  }
};

const removeSub = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub delete failed");
  }
};

export {
    createSub,
    readSub,
    listSub,
    updateSub,
    removeSub
}