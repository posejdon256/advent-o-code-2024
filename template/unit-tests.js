const unit1 = () => {
  const result = true;
  return {
    name: "Unit 1",
    result,
  };
};

module.exports = {
  checkUnits: () => {
    const units = [unit1];
    units.forEach((unit) => {
      const { result, name } = unit1();
      console.log(name, result);
    });
  },
};
