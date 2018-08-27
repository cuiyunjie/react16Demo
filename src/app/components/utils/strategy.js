const Patterns = {
  Int: /^-?\d+$/
};

function checkType(str, type) {
  return Patterns[type].test(str);
}

const Strategy = {

  isInt(arg) {
    return checkType(arg, 'Int');
  },

  isEmpty(arg) {
    return arg === '';
  },

  isString(arg) {
    return typeof arg === 'string';
  },

  isUndefined(arg) {
    return typeof arg === 'undefined';
  },

  isNull(arg) {
    return arg === null;
  },

  isAny() {
    return true;
  }

};

export default Strategy;
export { Patterns, checkType };