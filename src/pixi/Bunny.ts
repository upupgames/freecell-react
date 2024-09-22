import { Application, Texture } from 'pixi.js';
import { Draggable } from '@pixi/Draggable';

export class Bunny extends Draggable {
    constructor(app: Application, texture: Texture) {
        super(app, texture);  // Call the Draggable constructor

        // Set specific properties for the bunny
        this.anchor.set(0.5);
        this.scale.set(3);  // Scale the bunny to make it larger

        // Enable drag end behavior for the bunny
        this.enableDragEnd();
    }

    // You can add bunny-specific methods or overrides here if necessary
}
