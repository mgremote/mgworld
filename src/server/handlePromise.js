module.exports = middleware => (req, res, next) => {
  const promise = middleware(req, res);
  promise.then(data => res.json(data))
    .catch(next);
};
