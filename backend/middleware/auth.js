const jwt = require('jsonwebtoken');//verifie les tokens

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
  
    console.log("je suis ici");


    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'userId est invalide';
    } else {
      next();
    }
  } catch (error){
    return res.status(401).json({ message:error});
  }
};