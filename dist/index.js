var exports, splitString,
  __slice = [].slice;

splitString = function(str, length) {
  var head, min, rest, tail, _ref;
  _ref = str.split('\n'), str = _ref[0], rest = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  rest = rest.join('\n');
  if (str.length < length) {
    if (rest.length === 0) {
      return str;
    } else {
      return "" + str + "\n" + (splitString(rest, length));
    }
  } else {
    min = Math.min(str.length, length);
    head = str.substring(0, min);
    tail = str.substring(min, str.length);
    return "" + head + "\n" + (splitString(tail + rest, length));
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
  output._breakwrapOriginalWrite = output.write;
  return output.write = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return output._breakwrapOriginalWrite(splitString(args[0], width));
  };
};
