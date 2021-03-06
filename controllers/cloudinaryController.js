import cloudinary from 'cloudinary'

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: "inthing-wear",
  api_key: "142763692891792",
  api_secret: "IzzfFQkIctPS5Ek94aqudY7hTKg",
});

const uploadImages = async (req, res) => {
  let result = await cloudinary.uploader.upload_large(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

const removeImages = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};

export{
    uploadImages,
    removeImages
}