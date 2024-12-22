'use client'

import React, { useEffect, useRef } from 'react';
import { startPixiApp } from '@pixi/Example';

const PixiBinder: React.FC = () => {
  const pixiContainerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<any>(null); // Reference to store the Pixi app instance
  
  const hasInitializedRef = useRef(false); // Necessary to avoid duplicate canvases in React strict mode.

  useEffect(() => {
    const initPixi = async () => {
      if (pixiContainerRef.current && !hasInitializedRef.current) {
        hasInitializedRef.current = true; // Mark the app as initialized
        console.log("Initializing pixi application...")
        appRef.current = await startPixiApp(pixiContainerRef.current);
      }
    };

    initPixi();

    return () => {
      // Cleanup the Pixi app on component unmount
      if (appRef.current) {
        console.log("Destroying pixi application...")
        appRef.current.destroy(true, { children: true, texture: true });
        appRef.current = null;
        hasInitializedRef.current = false; // Reset the initialized state on cleanup
      }
    };
  }, []);

  return <div ref={pixiContainerRef} style={{ width: '100vw', height: '100vh' }}></div>;
};

export default PixiBinder;
