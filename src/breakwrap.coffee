splitString = (str, length) ->
  [str, rest...] = str.split '\n'
  rest = rest.join '\n'

  if str.length < length
    if rest.length == 0
      str
    else
      "#{str}\n#{splitString(rest, length)}"
  else
    min = Math.min(str.length, length)
    head = str.substring(0, min)
    tail = str.substring(min, str.length)
    "#{head}\n#{splitString(tail + rest, length)}"

module.exports = exports = (output, width = null) ->
  throw new Error 'breakwrap requires an output stream.' if not output?

  width ||= (output.columns || process.stdout.columns || 1)

  result = ''
  output._breakwrapOriginalWrite = output.write

  output.write = (args...) ->
    output._breakwrapOriginalWrite splitString(args[0], width)

