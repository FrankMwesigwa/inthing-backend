import jwt from 'jsonwebtoken'

export const authCheck = (req, res, next) => {

  if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
  }else{
      return res.status(400).json({ message: 'Authorization Logon Required !!!' });
  }
  next();
}

export const userMiddleware = (req, res, next) => {
  if(req.user.role !== 'user'){
      return res.status(400).json({ message: 'User access denied' })
  }
  next();
}

export const adminCheck = (req, res, next) => {
  if (req.user.profile.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Admin Access Denied !!!')
  }
}
