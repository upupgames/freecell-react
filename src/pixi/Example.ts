import { Application } from 'pixi.js';
import { BunnyApp } from '@pixi/BunnyApp';

export const startPixiApp = async (container: HTMLDivElement): Promise<Application> => {
  const app = new Application();
  await app.init({
    resizeTo: window,
    backgroundColor: 0x1099bb,
  });

  container.appendChild(app.canvas);

  // Initialize the BunnyApp
  const bunnyApp = new BunnyApp(app);

  return app;
};