exports.getOneUser = (req, res) => {
  console.log("this is getOneUser", req.profile);
  return res.json({
    user: req.profile,
  });
};
