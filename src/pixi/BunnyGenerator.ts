import { Application, Assets, Texture } from 'pixi.js';
import { Bunny } from './Bunny';  // Import the Bunny class

export class BunnyGenerator {
    private app: Application;
    private texture: Texture | null = null;

    constructor(app: Application) {
        this.app = app;

        // Set up stage interactivity
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;

        this.loadBunnyTexture();
    }

    // Load the bunny texture once
    private async loadBunnyTexture() {
        this.texture = await Assets.load('https://pixijs.com/assets/bunny.png');
        if (this.texture && this.texture.source) {
            // Set the scale mode directly on the texture resource
            this.texture.source.scaleMode = 'nearest';

            // Create bunnies in columns
            this.createBunniesInColumns();  // Arrange bunnies into 8 columns
        }
    }

    // Create bunnies in 8 columns
    private createBunniesInColumns() {
        const columnCount = 8; // Total number of columns
        const bunniesPerColumn = [7, 7, 7, 7, 6, 6, 6, 6]; // First 4 columns have 7, last 4 have 6
        const columnWidth = this.app.screen.width / columnCount; // Divide the screen into 8 columns
        const rowHeight = 50; // Space between rows (adjust this value based on the size of your bunnies)

        for (let column = 0; column < columnCount; column++) {
            const bunnyCount = bunniesPerColumn[column]; // Get the number of bunnies in this column

            for (let row = 0; row < bunnyCount; row++) {
                const x = column * columnWidth + columnWidth / 2; // Center the bunny in the column
                const y = row * rowHeight + rowHeight / 2; // Space bunnies vertically in rows

                this.createBunny(x, y);
            }
        }
    }

    // Create a single draggable bunny
    private createBunny(x: number, y: number) {
        if (!this.texture) return;

        // Use the Bunny class for each bunny sprite
        const bunny = new Bunny(this.app, this.texture);
        bunny.x = x;
        bunny.y = y;

        // Add the bunny to the stage
        this.app.stage.addChild(bunny);
    }
}
