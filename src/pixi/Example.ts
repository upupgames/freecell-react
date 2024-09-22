import { Application, Assets, Container, Sprite } from "pixi.js";

// Starts Pixi application in the given container reference.
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

  // Create and add a container to the stage
  const bunnyContainer = new Container();
  app.stage.addChild(bunnyContainer);

  // Load the bunny texture
  const texture = await Assets.load("https://pixijs.com/assets/bunny.png");

  // Create a 5x5 grid of bunnies in the container
  for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(texture);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    bunnyContainer.addChild(bunny);
  }

  // Move the container to the center
  bunnyContainer.x = app.screen.width / 2;
  bunnyContainer.y = app.screen.height / 2;

  // Center the bunny sprites in local container coordinates
  bunnyContainer.pivot.x = bunnyContainer.width / 2;
  bunnyContainer.pivot.y = bunnyContainer.height / 2;

  // Animate the container
  app.ticker.add((time) => {
    bunnyContainer.rotation -= 0.01 * time.deltaTime;
  });

  return app; // Return the app instance for future cleanup if needed
};
