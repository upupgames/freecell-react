import Card from "./Card";
import { NUM_CARDS, Suit, SUIT_COLOR } from "./constants/deck";
import type { PileId } from "./constants/table";
import { TABLEAU_PILES } from "./constants/table";

const NUM_VALUES = 13;

export default class Deck {
  public cards: Card[] = [];

  public constructor(scene: Phaser.Scene) {
    for (let i = 1; i < NUM_VALUES + 1; i += 1) {
      Object.values(Suit).forEach((t) => {
        this.cards.push(new Card(scene, t, i));
      });
    }

    this.cards = this.shuffle(this.cards, 476);
    this.deal(scene);
  }

  public deal(scene: Phaser.Scene): void {
    // Flip all back
    this.cards.forEach((card: Card) => {
      card.flip(scene);
    });

    for (let cardIndex = 0; cardIndex < NUM_CARDS; cardIndex += 1) {
      const col = cardIndex % 8;
      const row = Math.floor(cardIndex / 8);
      this.cards[cardIndex].instantReposition(TABLEAU_PILES[col], row);
    }
  }

  public shuffle(deck: Card[], seed: number): Card[] {
    const a = 214013;
    const c = 2531011;
    const m = 2147483648;
    let rng = seed >>> 0;

    for (let i = 51; i > 0; i--) {
      rng = (a * rng + c) % m >>> 0;
      const j = Math.floor((rng / 65536) % (i + 1));

      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    deck.reverse();
    return deck;
  }

  public cardChildren(card: Card): Card[] {
    return this.cards
      .filter(
        (curr: Card) =>
          curr.pile === card.pile && curr.position >= card.position
      )
      .sort((a: Card, b: Card) => a.position - b.position);
  }

  public validDraggableCard(card: Card, maxCards: number): boolean {
    const children: Card[] = this.cardChildren(card);

    if (children.length > maxCards) {
      return false;
    }

    for (let i = 1; i < children.length; i++)
    {
      const current: Card = children[i];
      const previous: Card = children[i-1];

      if (current.value != previous.value - 1)
      {
        return false;
      }

      if (SUIT_COLOR[current.suit] === SUIT_COLOR[previous.suit])
      {
        return false;
      }
    }

    return true;
  }

  public topCard(pile: PileId): Card | null {
    return (
      this.cards
        .filter((curr: Card) => curr.pile === pile)
        .sort((a: Card, b: Card) => a.position - b.position)
        .pop() ?? null
    );
  }

  public countCards(pile: PileId): number {
    return this.cards.reduce(
      (acc: number, card: Card) => (card.pile === pile ? acc + 1 : acc),
      0
    );
  }
}

