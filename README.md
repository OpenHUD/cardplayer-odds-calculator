# cardplayer-odds-calculator
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

JavaScript client for Card Player magazine's [fast poker odds calculator](https://www.cardplayer.com/poker-tools/odds-calculator/texas-holdem), which by itself wraps [pokenum](https://github.com/v2k/poker-eval/blob/master/examples/pokenum.c).

### Usage
Install the library with `npm install cardplayer-odds-calculator`

```javascript
import OddsCalculator from 'cardplayer-odds-calculator';

const oddsCalculator = new OddsCalculator();

// Example 1: Tom Dwan vs Barry Greenstein (https://www.youtube.com/watch?v=OColG3ceE_Q)
const odds1 = await oddsCalculator.texasHoldem({holes: [['Ad', 'Ac'], ['Ks', 'Qs']], community: ['4s', '2s', 'Qh'], dead: ['Tc', '5h', 'Jc', '4h', '8d', '2d', 'As', 'Kh', '6h', '3s']});
console.log(odds1);
//
// [ { win: 288, lose: 307, tie: 0, ev: 0.48 },
//   { win: 307, lose: 288, tie: 0, ev: 0.52 } ]

// Example 2: Patrick Antonius vs Viktor Blom (https://www.youtube.com/watch?v=8en6Jas6bZw)
const odds2 = await oddsCalculator.omahaHoldem({holes: [['Ah', '3s', 'Ks', 'Kh'], ['6d', '9s', '7d', '8h']], community: ['4s', '5c', '2h']});
console.log(odds2);
//
// [ { win: 448, lose: 372, tie: 0, ev: 0.55 },
//   { win: 372, lose: 448, tie: 0, ev: 0.45 } ]
```

[downloads-image]: https://img.shields.io/npm/dm/cardplayer-odds-calculator.svg

[npm-url]: https://npmjs.org/package/cardplayer-odds-calculator
[npm-image]: https://img.shields.io/npm/v/cardplayer-odds-calculator.svg
