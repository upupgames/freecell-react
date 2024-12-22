import { Application, FederatedPointerEvent, Sprite, Texture } from 'pixi.js';

export class Draggable extends Sprite {
    // Declare the 'app' property here
    private app: Application;
    private dragTarget: Sprite | null = null;

    /**
     * Constructor for the Draggable object.
     * @param app - The PIXI Application instance.
     * @param texture - The texture for the sprite.
     */
    constructor(app: Application, texture: Texture) {
        super(texture);  // Call the Sprite constructor with the texture
        this.app = app;  // Assign the application instance to the app property
        this.interactive = true;
        this.cursor = 'pointer';

        // Set up the drag start event listener
        this.on('pointerdown', this.onDragStart.bind(this));
    }

    /**
     * Starts dragging the sprite.
     */
    private onDragStart() {
        this.dragTarget = this;
        this.alpha = 0.5;

        // Start listening for pointer movement
        this.app.stage.on('pointermove', this.onDragMove.bind(this));
    }

    /**
     * Moves the sprite as it's being dragged.
     * @param event - The pointer event containing the new position.
     */
    private onDragMove(event: FederatedPointerEvent) {
        if (this.dragTarget) {
            this.dragTarget.parent.toLocal(event.global, undefined, this.dragTarget.position);
        }
    }

    /**
     * Ends the dragging action.
     */
    private onDragEnd() {
        if (this.dragTarget) {
            this.app.stage.off('pointermove', this.onDragMove.bind(this));
            this.dragTarget.alpha = 1;
            this.dragTarget = null;
        }
    }

    /**
     * Enables the drag end behavior.
     */
    public enableDragEnd() {
        this.app.stage.on('pointerup', this.onDragEnd.bind(this));
        this.app.stage.on('pointerupoutside', this.onDragEnd.bind(this));
    }
}
