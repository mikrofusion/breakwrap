ConsolePos = require 'console-pos'

splitString = (str, length, offset, endsInNL) ->
  if endsInNL == undefined
    endsInNL = str[str.length-1] == '\n'

  [first, tmp...] = str.split '\n'
  rest = tmp.join "\n"

  if first.length < length - offset
    if rest.length == 0
      if endsInNL
        "#{first}\n"
      else
        first
    else
      "#{first}\n#{splitString(rest, length, 0, endsInNL)}"
  else
    min = Math.min(first.length, length - offset)
    head = first.substring(0, min)
    tail = first.substring(min, first.length)
    "#{head}\n#{splitString(tail + '\n' + rest, length, 0, endsInNL)}"

module.exports = exports = (output, width = null) ->
  throw new Error 'breakwrap requires an output stream.' if not output?


  width ||= (output.columns || process.stdout.columns || 1)

  consolePos = ConsolePos output

  result = ''
  output._breakwrapOriginalWrite = output.write

  output.write = (args...) ->
    offset = consolePos.row()
    output._breakwrapOriginalWrite(
      splitString(args[0], width, offset)
    )

