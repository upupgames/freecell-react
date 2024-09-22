"use client"; // Ensure the component is rendered client-side

import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Application, Assets, Sprite } from 'pixi.js';
import styles from "@styles/FreecellGame.module.css";

const FreecellGame: React.FC = () => {
  const pixiAppRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: Application | null = null;
  
    const initPixiApp = async () => {
      if (!pixiAppRef.current) {
        console.error("Div reference (pixiAppRef) is undefined.");
        return;
      }
  
      // Destroy any previous app if it exists
      if (app) {
        app.destroy(true, { children: true });
      }
  
      // Create a new Pixi application instance
      app = new Application();
  
      // Initialize the Pixi application
      await app.init({
        background: '#1099bb',
        resizeTo: pixiAppRef.current,
      });
  
      // Append the Pixi canvas to the div element
      pixiAppRef.current.appendChild(app.canvas);
  
      // Load the bunny texture
      const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
      const bunny = new Sprite(texture);
  
      // Add the sprite to the stage
      app.stage.addChild(bunny);
  
      // Center the sprite's anchor point and position it
      bunny.anchor.set(0.5);
      bunny.x = app.screen.width / 2;
      bunny.y = app.screen.height / 2;
    };
  
    initPixiApp();
  
    // Clean up Pixi content on component unmount
    return () => {
      if (app) {
        try {
          app.destroy(true, { children: true });
        } catch (error) {
          console.error("Error destroying Pixi app:", error);
        }
        app = null;
      }
    };
  }, []);

  return (
    <div className={styles.game}>
      <div ref={pixiAppRef} className={styles.pixiContainer}></div>
    </div>
  );
};

export default FreecellGame;
