splitString = (str, length) ->
  return '\n' if str == '\n'

  [first, tmp...] = str.split '\n'
  rest = tmp.join "\n"

  if first.length < length
    if rest.length == 0
      first
    else
      "#{first}\n#{splitString(rest, length)}"
  else
    min = Math.min(first.length, length)
    head = first.substring(0, min)
    tail = first.substring(min, first.length)
    "#{head}\n#{splitString(tail + '\n' + rest, length)}"

module.exports = exports = (output, width = null) ->
  throw new Error 'breakwrap requires an output stream.' if not output?

  width ||= (output.columns || process.stdout.columns || 1)

  result = ''
  output._breakwrapOriginalWrite = output.write

  output.write = (args...) ->
    output._breakwrapOriginalWrite splitString(args[0], width)

