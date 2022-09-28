module.exports = (model, values, condition) => {
  return model.findOne({ where: condition }).then((obj) => {
    if (obj) {
      // update
      console.log("User found, updating old value :");
      console.log(JSON.stringify(obj));
      return obj.update(values);
    } else {
      // insert
      console.log("User not found, creat new user... :");
      return model.create(values);
    }
  });
};
