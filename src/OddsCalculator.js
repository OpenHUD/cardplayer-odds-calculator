import axios from 'axios';

const Games = {
  texasHoldem: 'texas_holdem',
  omahaHoldem: 'omaha'
};

export default class OddsCalculator {
  constructor({baseUrl = 'https://www.cardplayer.com/poker-tools/odds-calculator/api', timeout = 0} = {}) {
    this._timeout = timeout;
    this._baseUrl = baseUrl;
  }

  async texasHoldem({holes, community = [], dead = []}) {
    return this._odds(Games.texasHoldem, holes, community, dead);
  }

  async omahaHoldem({holes, community = [], dead = []}) {
    return this._odds(Games.omahaHoldem, holes, community, dead);
  }

  async _odds(game, holes, community, dead) {
    const params = [
        ['game_type', game],
        ['board', community.map(card => card.toUpperCase()).join(' ')],
        ['dead_cards', dead.map(card => card.toUpperCase()).join(' ')]
    ];
    holes.forEach((hole, index) => {
        hole.forEach(card => {
            params.push([`seats[${index}][hand][]`, card.toUpperCase()]);
        });
    });
    const query = params.map(param => `${encodeURIComponent(param[0])}=${encodeURIComponent(param[1])}`).join('&');

    const response = await axios.get(`${this._baseUrl}?${query}`, {
        timeout: this._timeout,
        headers: {
            'accept': 'application/json'
        }
    });
    const result = await response.data;

    return result.seats.map(seat => {
        return {
            win: parseInt(seat.win),
            lose: parseInt(seat.lose),
            tie: parseInt(seat.tie),
            ev: parseFloat(seat.ev)
        }
    });
  };
};