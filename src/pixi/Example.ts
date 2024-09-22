import { Application } from 'pixi.js';
import { BunnyGenerator } from '@pixi/BunnyGenerator';  // Import the BunnyGenerator class

export const startPixiApp = async (container: HTMLDivElement): Promise<Application> => {
  const app = new Application();
  await app.init({
    resizeTo: window,
    backgroundColor: 0x1099bb,
  });

  container.appendChild(app.canvas);

  // Initialize the BunnyApp
  new BunnyGenerator(app);

  return app;
};