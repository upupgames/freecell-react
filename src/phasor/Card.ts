import * as Phaser from "phaser";
import {
  CARD_BACK_INDEX,
  STACK_OFFSET,
  SPRITE_CARD_WIDTH,
  SUIT_IMAGE_INDEX,
  CARD_DIMENSIONS,
  type Suit,
} from "./constants/deck";
import {
  FOUNDATION_PILES,
  PileId,
  PILE_POSITIONS,
  TABLEAU_PILES,
  CELL_PILES,
} from "./constants/table";
import GameState from "./GameState";

export default class Card extends Phaser.GameObjects.Sprite {
  public suit: Suit;

  public value: number;

  public pile = PileId.None;

  public position: number = -1;

  public flipped: boolean = false;

  public constructor(scene: Phaser.Scene, suit: Suit, value: number) {
    // Create sprite
    super(scene, 0, 0, "img_cards", CARD_BACK_INDEX);
    scene.add.existing(this);

    // Suit and Value
    this.suit = suit;
    this.value = value;

    // Width and Height
    this.setDisplaySize(CARD_DIMENSIONS.width, CARD_DIMENSIONS.height);

    // Click event
    this.setInteractive();
  }

  public setRepositionAnimation(scene: GameState, pile: PileId, position: number): void {
    this.pile = pile;
    this.position = position;

    let xPos: number = 0;
    let yPos: number = 0;

    this.setDepth(this.position + 10);

    if (TABLEAU_PILES.includes(this.pile)) {
      xPos =  PILE_POSITIONS[this.pile].x;
      yPos = PILE_POSITIONS[this.pile].y + position * STACK_OFFSET;
    } else if (FOUNDATION_PILES.includes(this.pile) || CELL_PILES.includes(this.pile)) {
      xPos =  PILE_POSITIONS[this.pile].x;
      yPos = PILE_POSITIONS[this.pile].y;
    }

    const thisCardTween: Phaser.Types.Tweens.TweenBuilderConfig = {
      targets: this,
      x: xPos,
      y: yPos,
      ease: 'Power1',
      duration: 200,
    }
    
    scene.addTweenToChain(thisCardTween);
    
  }

  public instantReposition(pile: PileId, position: number): void {
    this.pile = pile;
    this.position = position;

    this.setDepth(this.position + 10);

    if (TABLEAU_PILES.includes(this.pile)) {
      this.setPosition(
        PILE_POSITIONS[this.pile].x,
        PILE_POSITIONS[this.pile].y + position * STACK_OFFSET
      );
    } else if (FOUNDATION_PILES.includes(this.pile) || CELL_PILES.includes(this.pile)) {
      this.setPosition(
        PILE_POSITIONS[this.pile].x,
        PILE_POSITIONS[this.pile].y
      );
    }
  }

  public flip(scene: Phaser.Scene): void {
    this.setTexture("img_cards", this.getSpriteIndex(this.suit, this.value));
    scene.input.setDraggable(this);
    scene.input.dragTimeThreshold = 10;
    this.flipped = true;
  }

  public flipBack(scene: Phaser.Scene): void {
    this.setTexture("img_cards", CARD_BACK_INDEX);
    scene.input.setDraggable(this, false);
    this.flipped = false;
  }

  public getSpriteIndex(suit: Suit, value: number): number {
    return SUIT_IMAGE_INDEX[suit] * SPRITE_CARD_WIDTH + value - 1;
  }
}
