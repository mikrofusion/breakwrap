breakwrap = require '../dist/index.js'

expect = require('chai').expect
sinon = require 'sinon'

describe 'breakwrap', ->
  describe 'when NOT initialized with an output stream', ->
    it 'throws an error', ->
      expect(-> breakwrap()).to.throw('breakwrap requires an output stream.')

  describe 'when initialized with an output stream', ->
    result = undefined
    output = undefined
    width = undefined

    beforeEach ->
      result = ''
      output = { write: (str) -> result += str }
      breakwrap(output, width)


    describe 'when the string is empty', ->
      before ->
        width = 10

      beforeEach ->
        output.write ''

      it 'returns the emtpy string', ->
        expect(result).to.eq ''

    describe 'when the string is a single newline shorter than the console.', ->
      before ->
        width = 10

      beforeEach ->
        output.write '\n'

      it 'it returns the newline character', ->
        expect(result).to.eq '\n'

    describe 'and given a string shorter than the console width', ->
      before ->
        width = 100

      beforeEach ->
        output.write 'this is a shorter string.'

      it 'does not modify the original string', ->
        expect(result).to.eq 'this is a shorter string.'

    describe 'and given a string longer than the console width', ->
      before ->
        width = 50

      describe 'when the string is not already split over multiple lines', ->
        beforeEach ->
          output.write 'this is a longer string that will be split over multiple lines.'

        it 'modifies the original string into multiple strings', ->
          expect(result).to.eq 'this is a longer string that will be split over mu\nltiple lines.'

      describe 'when the string is already split over multiple lines', ->
        describe 'when the split is before the console ends', ->
          beforeEach ->
            output.write 'this is a longer string that will not be \nsplit over multiple lines.'

          it 'does not modify the already split string', ->
            expect(result).to.eq 'this is a longer string that will not be \nsplit over multiple lines.'

        describe 'when the split is after the console ends', ->
          beforeEach ->
            output.write 'this is a longer string that will be split over multiple\n\nlines.\n'

          it 'modifies the already split string and keeps the existing splits', ->
            expect(result).to.eq 'this is a longer string that will be split over mu\nltiple\n\nlines.\n'


    describe 'when the cursor is not at 0', ->
      before ->
        width = 6

      beforeEach ->
        output.write '12345'
        output.write '678910'

      it 'takes into account the current cursor position when deciding to split the string', ->
        #expect(result).to.eq '123456\n78910'

    describe 'when special escape strings are used in the string', ->
      it 'takes into account the escape strings when deciding to split the string', ->
        # TODO
