var exports, splitString,
  __slice = [].slice;

splitString = function(str, length) {
  var first, head, min, rest, tail, tmp, _ref;
  _ref = str.split('\n'), first = _ref[0], tmp = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  rest = tmp.join("\n");
  if (first.length < length) {
    if (rest.length === 0) {
      return first;
    } else {
      return "" + first + "\n" + (splitString(rest, length));
    }
  } else {
    min = Math.min(first.length, length);
    head = first.substring(0, min);
    tail = first.substring(min, first.length);
    return "" + head + "\n" + (splitString(tail + '\n' + rest, length));
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
