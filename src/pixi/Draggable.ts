import { Application, FederatedPointerEvent, Sprite, Texture } from 'pixi.js';

export class Draggable extends Sprite {
    private dragTarget: Sprite | null = null;
    private app: Application;

    constructor(app: Application, texture: Texture) {
        super(texture);
        this.app = app;
        this.interactive = true;
        this.cursor = 'pointer';

        // Enable dragging functionality
        this.on('pointerdown', this.onDragStart.bind(this));
    }

    private onDragStart() {
        this.dragTarget = this;
        this.alpha = 0.5;

        // Start listening for pointer movement when dragging starts
        this.app.stage.on('pointermove', this.onDragMove.bind(this));
    }

    private onDragMove(event: FederatedPointerEvent) {
        if (this.dragTarget) {
            this.dragTarget.parent.toLocal(event.global, undefined, this.dragTarget.position);
        }
    }

    private onDragEnd() {
        if (this.dragTarget) {
            // Stop listening for pointer movement when dragging ends
            this.app.stage.off('pointermove', this.onDragMove.bind(this));
            this.dragTarget.alpha = 1;
            this.dragTarget = null;
        }
    }

    // Call this method to set up the drag end listener on the stage
    public enableDragEnd() {
        this.app.stage.on('pointerup', this.onDragEnd.bind(this));
        this.app.stage.on('pointerupoutside', this.onDragEnd.bind(this));
    }
}
