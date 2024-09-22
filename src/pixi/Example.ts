import { Application, Assets, Sprite, SCALE_MODES } from 'pixi.js';

export const startPixiApp = async (
  container: HTMLDivElement,
): Promise<Application> => {
  // Create a new Pixi application
  const app = new Application();
  await app.init({
    resizeTo: window, // Resize the app to the window size
    backgroundColor: 0x1099bb, // Background color
  });

  // Append the application canvas to the provided container element
  container.appendChild(app.canvas);

  // Load the bunny texture
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

  // Set the texture's scale mode to nearest to preserve pixelation
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

  // Create 10 draggable bunnies at random positions
  for (let i = 0; i < 10; i++) {
    createBunny(
      Math.floor(Math.random() * app.screen.width),
      Math.floor(Math.random() * app.screen.height)
    );
  }

  function createBunny(x: number, y: number) {
    // Create our little bunny friend..
    const bunny = new Sprite(texture);

    // Enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    bunny.eventMode = 'static';

    // This button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    bunny.cursor = 'pointer';

    // Center the bunny's anchor point
    bunny.anchor.set(0.5);

    // Make it a bit bigger, so it's easier to grab
    bunny.scale.set(3);

    // Setup events for mouse + touch using the pointer events
    bunny.on('pointerdown', onDragStart, bunny);

    // Move the sprite to its designated position
    bunny.x = x;
    bunny.y = y;

    // Add it to the stage
    app.stage.addChild(bunny);
  }

  let dragTarget: Sprite | null = null;

  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;
  app.stage.on('pointerup', onDragEnd);
  app.stage.on('pointerupoutside', onDragEnd);

  function onDragMove(event: any) {
    if (dragTarget) {
      dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
  }

  function onDragStart() {
    this.alpha = 0.5;
    dragTarget = this as Sprite;
    app.stage.on('pointermove', onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = null;
    }
  }

  return app; // Return the app instance for future cleanup if needed
};
