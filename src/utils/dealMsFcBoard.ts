/* TypeScript code for dealing Microsoft FreeCell / FreeCell Pro deals.
 * Copyright by Shlomi Fish, 2011.
 * Released under the MIT/Expat License
 * ( http://en.wikipedia.org/wiki/MIT_License ).
 */

function perl_range(start: number, end: number): number[] {
    const ret: number[] = [];
    for (let i = start; i <= end; ++i) {
        ret.push(i);
    }
    return ret;
}

// 33 bit
const MAX_SEED: bigint = (BigInt(1) << BigInt(31 + 2)) - BigInt(1);
const X = BigInt(1) << BigInt(32);

/*
 * Microsoft C Run-time-Library-compatible Random Number Generator
 */
class MSRand {
    private gamenumber: string;
    private _seed: bigint;
    private _seedx: bigint;

    constructor(args: { gamenumber: string }) {
        this.gamenumber = args.gamenumber;
        const _seed = BigInt(this.gamenumber);
        this._seed = _seed;
        this._seedx = _seed < X ? _seed : _seed - X;
    }

    public getSeed(): bigint {
        return this._seed;
    }

    private setSeed(seed: bigint): void {
        this._seed = seed;
    }

    private _rando(): bigint {
        this._seedx = (this._seedx * BigInt(214013) + BigInt(2531011)) & MAX_SEED;
        return (this._seedx >> BigInt(16)) & BigInt(0x7fff);
    }

    private _randp(): bigint {
        this._seedx = (this._seedx * BigInt(214013) + BigInt(2531011)) & MAX_SEED;
        return (this._seedx >> BigInt(16)) & BigInt(0xffff);
    }

    public raw_rand(): bigint {
        if (this._seed < X) {
            const ret = this._rando();
            return this._seed < BigInt(0x8) << BigInt(28) ? ret : ret | BigInt(0x8000);
        } else {
            return this._randp() + BigInt(1);
        }
    }

    public max_rand(mymax: bigint): bigint {
        return this.raw_rand() % mymax;
    }

    public shuffle(deck: any[]): any[] {
        if (deck.length) {
            let i = deck.length;
            while (--i) {
                const j = Number(this.max_rand(BigInt(i + 1)));
                const tmp = deck[i];
                deck[i] = deck[j];
                deck[j] = tmp;
            }
        }
        return deck;
    }
}

/*
 * Microsoft Windows Freecell / Freecell Pro boards generation.
 *
 * See:
 *
 * - http://rosettacode.org/wiki/Deal_cards_for_FreeCell
 * - http://www.solitairelaboratory.com/mshuffle.txt
 *
 * Under MIT/Expat Licence.
 */

function deal_ms_fc_board(gamenumber: string): string[][] {
    const randomizer = new MSRand({ gamenumber });
    const num_cols: number = 8;

    const columns: string[][] = perl_range(0, num_cols - 1).map(() => []);
    let deck: number[] = perl_range(0, 4 * 13 - 1);

    randomizer.shuffle(deck);
    deck = deck.reverse();

    function render_card(card: number): string {
        const suit = card % 4;
        const rank = Math.floor(card / 4);
        return "A23456789TJQK".charAt(rank) + "CDHS".charAt(suit);
    }

    for (let i = 0; i < 52; ++i) {
        columns[i % num_cols].push(render_card(deck[i]));
    }

    return columns;
}

module.exports = {
    deal_ms_fc_board
};
