var ConsolePos, ansiRegex, exports, splitString, stringLength,
  __slice = [].slice;

ConsolePos = require('console-pos');

stringLength = require('string-length');

ansiRegex = require('ansi-regex')();

splitString = function(str, length, offset, endsInNL) {
  var escapeArray, first, head, min, rest, tail, tmp, _ref;
  if (endsInNL === void 0) {
    endsInNL = str[str.length - 1] === '\n';
  }
  _ref = str.split('\n'), first = _ref[0], tmp = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  rest = tmp.join("\n");
  if (stringLength(first) < length - offset) {
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
    min = Math.min(stringLength(first), length - offset);
    escapeArray = str.match(ansiRegex);
    if (escapeArray !== null) {
      escapeArray.forEach(function(escape) {
        var end, start;
        start = str.indexOf(escape);
        end = escape.length;
        if (min > start && min < end) {
          return min += end;
        }
      });
    }
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
  consolePos = ConsolePos(output);
  result = '';
  output._breakwrapOriginalWrite = output.write;
  return output.write = function() {
    var args, offset;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    width = width || output.columns || process.stdout.columns || 1;
    offset = consolePos.row();
    return output._breakwrapOriginalWrite(splitString(args[0], width, offset));
  };
};
