import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // const { token } = await req.headers;
  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log("token i", token);
  if (!token) {
    return res.json({ success: false, error: "Not a Authorized Login" });
  }

  //Ensure req.body exists before assigning to it

  if (!req.body) {
    req.body = {};
  }

  const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
  console.log(tokenDecode);
  req.body.userId = tokenDecode.userId;
  console.log("token iss", token);
  next();
};

export default authUser;
