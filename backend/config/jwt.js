const jwt = require("jwt");


const genToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const secretKey = process.env.SECRET_KEY;

  const options = {
    expiresIn: "1h", //token expiration time 1h
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

// getting userId from token

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.id;
  } catch (error) {
    return null;
  }
};

module.exports = {genToken,getUserIdFromToken};
