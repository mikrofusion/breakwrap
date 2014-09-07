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
      output = { write: (str) -> result = str }
      breakwrap(output, width)

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
          expect(result.split('\n').length).to.eq 2

      describe 'when the string is already split over multiple lines', ->
        describe 'when the split is before the console ends', ->
          beforeEach ->
            output.write 'this is a longer string that will not be \nsplit over multiple lines.'

          it 'does not modify the already split string', ->
            expect(result.split('\n').length).to.eq 2

        describe 'when the split is after the console ends', ->
          beforeEach ->
            output.write 'this is a longer string that will be split over multiple\nlines.\n'

          it 'modifies the already split string and keeps the existing splits', ->
            expect(result.split('\n').length).to.eq 3

