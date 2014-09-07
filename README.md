# breakwrap

[![NPM](https://nodei.co/npm/breakwrap.png)](https://nodei.co/npm/breakwrap/)

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

breakwrap prevents wrapping by automatically breaking lines when they reach the edge of the screen.

## Install

```bash
$ npm install breakwrap
```

## Use

breakwrap automatically works once required and given an output stream (such as process.stdout).

```
require('breakwrap')(process.stdout)
```

## License

[MIT](http://opensource.org/licenses/MIT) © Mike Groseclose

[npm-url]: https://npmjs.org/package/breakwrap
[npm-image]: https://badge.fury.io/js/breakwrap.png

[travis-url]: http://travis-ci.org/mikegroseclose/breakwrap
[travis-image]: https://secure.travis-ci.org/mikegroseclose/breakwrap.png?branch=master
