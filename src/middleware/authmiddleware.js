const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, 'token');
  jwt.verify(token, 'Justin', (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    console.log('decoded', decoded);

    next();
  });
};

module.exports = authMiddleware;
