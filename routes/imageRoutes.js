import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: './public',
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({storage}).array('file');

router.post('/', (req, res) => {
  upload(req, res, (err) => {
      if (err) {
          return res.status(500).json(err)
      }

      return res.status(200).send(req.files)
  })
});

export default router;
