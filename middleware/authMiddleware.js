import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    console.log("verified ====>", verified)
  } else {
    return res
      .status(400)
      .json({ message: "Authorization Logon Required !!!" });
  }
  next();
};
