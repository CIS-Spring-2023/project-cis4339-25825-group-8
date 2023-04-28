let globalVariable = "0";

module.exports = {
  getGlobalVariable: function () {
    return globalVariable;
  },
  setGlobalVariable: function (value) {
    globalVariable = value;
  },
};
