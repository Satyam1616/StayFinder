import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // const { token } = await req.headers;
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.json({ success: false, error: "Not a Authorized Login" });
  }

  if (!req.body) {
    req.body = {};
  }

  const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

  req.body.userId = tokenDecode.userId;

  next();
};

export default authUser;
