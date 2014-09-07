var exports, splitString,
  __slice = [].slice;

splitString = function(str, length) {
  var head, min, tail;
  if (str.length < length) {
    return str;
  } else {
    min = Math.min(str.length, length);
    head = str.substring(0, min);
    tail = str.substring(min, str.length);
    return "" + head + "\n" + (splitString(tail, length));
  }
};

module.exports = exports = function(output, width) {
  var result;
  if (width == null) {
    width = null;
  }
  if (output == null) {
    throw new Error('breakwrap requires an output stream.');
  }
  width || (width = output.columns || process.stdout.columns || 1);
  result = '';
  output._originalWrite = output.write;
  return output.write = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return output._originalWrite(splitString(args[0], width));
  };
};
