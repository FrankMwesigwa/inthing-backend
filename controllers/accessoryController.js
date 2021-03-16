import Accessories from '../models/accessoriesModel';
import slugify from 'slugify';

export const createAccessory = async (req, res) => {
  try {
    const accessoryFields = {}

    const originalprice = req.body.price;
    const discount = req.body.discount;
    const afterDiscount = originalprice - (originalprice * discount / 100);

    if(req.body.discountprice){
      accessoryFields.discountprice = afterDiscount;
    } else {
      accessoryFields.discountprice = null;
    }

    accessoryFields.images = req.body.images;
    accessoryFields.title = req.body.title;
    accessoryFields.description = req.body.description;
    accessoryFields.brand = req.body.brand;
    accessoryFields.price = req.body.price;
    accessoryFields.discount = req.body.discount;
    accessoryFields.discountprice = req.body.discountprice;
    accessoryFields.color = req.body.color;
    accessoryFields.specs = req.body.specs.split(',');
    accessoryFields.slug = slugify(req.body.title);

    const newAccessory = await new Accessories(accessoryFields).save();
    res
      .status(201)
      .json({ message: "Accessory Created Successfully", newAccessory });
  } catch (err) {
    console.log(err);
    res.status(400);
    throw new Error("New Accessory Creation Failed");
  }
};

export const getAccessories = async (req, res) => {
  const pageSize=30
  const page = parseInt(req.query.page || 1)
  const total = await Accessories.countDocuments({})

  const accessories = await Accessories.find({})
    .sort({createdAt:'desc'})
    .limit(pageSize)
    .skip(pageSize * page)

  if (accessories) {
    res.json({accessories, total, totalPages: Math.ceil(total/pageSize)});
  } else {
    res.status(404);
    throw new Error("Accessories not found");
  }
}

export const getAccessory = async (req, res) => {
  let accessory = await Accessories.findOne({ _id: req.params.id }).exec();

  res.json(accessory);
};

export const updateAccessory = async (req, res) => {
  
  try {
    const accessoryFields = {}

    const originalprice = req.body.price;
    const discount = req.body.discount;
    const afterDiscount = originalprice - (originalprice * discount / 100);

    if(req.body.discountprice){
      accessoryFields.discountprice = afterDiscount;
    } else {
      accessoryFields.discountprice = null;
    }

    accessoryFields.images = req.body.images;
    accessoryFields.title = req.body.title;
    accessoryFields.description = req.body.description;
    accessoryFields.brand = req.body.brand;
    accessoryFields.price = req.body.price;
    accessoryFields.discount = req.body.discount;
    accessoryFields.discountprice = req.body.discountprice;
    accessoryFields.color = req.body.color;
    
    accessoryFields.slug = slugify(req.body.title);

    if(accessoryFields.specs){
      accessoryFields.specs = req.body.specs.split(',');
    }

    const updatedAccessory = await Accessories.findOneAndUpdate({ _id: req.params.id },
      accessoryFields,
      { new: true }
    ).exec();
      res.json(updatedAccessory);
    
  } catch (err) {
    res.status(400).send("Accessories update failed");
  }
};

export const removeAccessory = async (req, res) => {
  try {
    const deleted = await Accessories.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Accessories delete failed");
  }
};