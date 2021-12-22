module.exports = (req, res) => {
  res.status(204).json({
    message: 'Deleted',
    data: null,
  });
};