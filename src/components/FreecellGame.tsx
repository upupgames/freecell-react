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
    <div className={styles.game}>
      <div ref={pixiAppRef} className={styles.pixiContainer}></div>
    </div>
  );
};

export default FreecellGame;
