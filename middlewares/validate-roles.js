const validateRole = (...roles) => {
 return (req, res, next) => {
  if (!req.user) {
   return res.status(500).json({
    msg: 'You have to validate the token first',
   });
  }

  const { role, name } = req.user;

  if (!roles.includes(role)) {
   return res.status(401).json({
    msg: `The service require one of this roles ${roles}`,
   });
  }

  next();
 };
};

module.exports = {
 validateRole,
};
