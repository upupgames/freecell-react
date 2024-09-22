import { Application, Assets, FederatedPointerEvent, Sprite, Texture } from 'pixi.js';

export class BunnyApp {
    private app: Application;
    private texture: Texture | null = null;
    private dragTarget: Sprite | null = null;

    constructor(app: Application) {
        this.app = app;

        // Set up stage interactivity
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerup', this.onDragEnd.bind(this));
        this.app.stage.on('pointerupoutside', this.onDragEnd.bind(this));

        this.loadAssets();
    }

    // Load the bunny texture once
    private async loadAssets() {
        this.texture = await Assets.load('https://pixijs.com/assets/bunny.png');
        if (this.texture && this.texture.source) {
            // Set the scale mode directly on the texture resource
            this.texture.source.scaleMode = 'nearest';

            // Create 10 draggable bunnies
            for (let i = 0; i < 10; i++) {
                this.createBunny(
                    Math.floor(Math.random() * this.app.screen.width),
                    Math.floor(Math.random() * this.app.screen.height)
                );
            }
        }
    }

    // Create a bunny sprite and make it draggable
    private createBunny(x: number, y: number) {
        if (!this.texture) return;

        const bunny = new Sprite(this.texture);
        bunny.eventMode = 'static';
        bunny.cursor = 'pointer';
        bunny.anchor.set(0.5);
        bunny.scale.set(3);

        bunny.x = x;
        bunny.y = y;

        bunny.on('pointerdown', this.onDragStart.bind(this, bunny));

        this.app.stage.addChild(bunny);
    }

    // Handle drag start
    private onDragStart(bunny: Sprite) {
        this.dragTarget = bunny;
        this.dragTarget.alpha = 0.5;
        this.app.stage.on('pointermove', this.onDragMove.bind(this));
    }

    // Handle dragging movement
    private onDragMove(event: FederatedPointerEvent) {
        if (this.dragTarget) {
            this.dragTarget.parent.toLocal(event.global, undefined, this.dragTarget.position);
        }
    }

    // Handle drag end
    private onDragEnd() {
        if (this.dragTarget) {
            this.app.stage.off('pointermove', this.onDragMove.bind(this));
            this.dragTarget.alpha = 1;
            this.dragTarget = null;
        }
    }
}
