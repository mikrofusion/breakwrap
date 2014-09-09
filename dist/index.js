var ConsolePos, exports, splitString,
  __slice = [].slice;

ConsolePos = require('console-pos');

splitString = function(str, length, offset, endsInNL) {
  var first, head, min, rest, tail, tmp, _ref;
  if (endsInNL === void 0) {
    endsInNL = str[str.length - 1] === '\n';
  }
  _ref = str.split('\n'), first = _ref[0], tmp = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  rest = tmp.join("\n");
  if (first.length < length - offset) {
    if (rest.length === 0) {
      if (endsInNL) {
        return "" + first + "\n";
      } else {
        return first;
      }
    } else {
      return "" + first + "\n" + (splitString(rest, length, 0, endsInNL));
    }
  } else {
    min = Math.min(first.length, length - offset);
    head = first.substring(0, min);
    tail = first.substring(min, first.length);
    return "" + head + "\n" + (splitString(tail + '\n' + rest, length, 0, endsInNL));
  }
};

module.exports = exports = function(output, width) {
  var consolePos, result;
  if (width == null) {
    width = null;
  }
  if (output == null) {
    throw new Error('breakwrap requires an output stream.');
  }
  width || (width = output.columns || process.stdout.columns || 1);
  consolePos = ConsolePos(output);
  result = '';
  output._breakwrapOriginalWrite = output.write;
  return output.write = function() {
    var args, offset;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    offset = consolePos.row();
    return output._breakwrapOriginalWrite(splitString(args[0], width, offset));
  };
};
