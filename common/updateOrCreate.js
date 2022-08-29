module.exports = (model, values, condition) => {
  return model.findOne({ where: condition }).then((obj) => {
    // update
    if (obj) return obj.update(values);
    // insert
    return model.create(values);
  });
};
