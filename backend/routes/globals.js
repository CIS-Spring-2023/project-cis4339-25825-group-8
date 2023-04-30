// Define a global variable with an initial value of "0"
let globalVariable = "0";

// Export an object with two functions
module.exports = {
  // A function to get the current value of the global variable
  getGlobalVariable: function () {
    return globalVariable;
  },

  // A function to set the value of the global variable to a new value
  setGlobalVariable: function (value) {
    globalVariable = value;
  },
};
