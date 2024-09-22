"use client"; // Ensure the component is rendered client-side

import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import styles from "@styles/FreecellGame.module.css";

const FreecellGame: React.FC = () => {
  const pixiAppRef = useRef<HTMLDivElement>(null); // Reference to the Pixi container div

  useEffect(() => {
    const initPixiApp = async () => {
      if (!pixiAppRef.current) {
        console.error("Div reference (pixiAppRef) is undefined.");
        return;
      }

      // Create a new Pixi application instance
      const app = new PIXI.Application();

      // Initialize the Pixi application with dynamic resizing to the window
      await app.init({
        resizeTo: pixiAppRef.current, // Resize based on the container div
        backgroundColor: 0x1099bb,    // Background color
        autoDensity: true,            // High-DPI display support
      });

      // Load the bunny texture.
      const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');

      // Create a new Sprite from an image path
      const bunny = new PIXI.Sprite(texture);

      // Add to stage
      app.stage.addChild(bunny);

      // Center the sprite's anchor point
      bunny.anchor.set(0.5);

      // Move the sprite to the center of the screen
      bunny.x = app.screen.width / 2;
      bunny.y = app.screen.height / 2;

      // Append the Pixi canvas to the div element
      pixiAppRef.current.appendChild(app.canvas);

      // Clean up the Pixi application when the component unmounts
      return () => {
        app.destroy(true, { children: true });
      };
    };

    initPixiApp();

    // Clean up Pixi content on component unmount
    return () => {
      if (pixiAppRef.current) {
        pixiAppRef.current.innerHTML = ''; // Clear the content to avoid memory leaks
      }
    };
  }, []);

  return (
      <div ref={pixiAppRef} className={styles.pixiContainer}></div>
  );
};

export default FreecellGame;
