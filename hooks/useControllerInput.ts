"use client"

import { useEffect, useState, useCallback } from 'react';

interface GamepadState {
  connected: boolean;
  id: string;
  buttons: boolean[];
  axes: number[];
  timestamp: number;
}

interface ControllerMapping {
  // Standard button mappings
  A: number;        // 0
  B: number;        // 1  
  X: number;        // 2
  Y: number;        // 3
  LB: number;       // 4
  RB: number;       // 5
  LT: number;       // 6
  RT: number;       // 7
  SELECT: number;   // 8
  START: number;    // 9
  LS: number;       // 10
  RS: number;       // 11
  DPAD_UP: number;    // 12
  DPAD_DOWN: number;  // 13
  DPAD_LEFT: number;  // 14
  DPAD_RIGHT: number; // 15
}

const XBOX_MAPPING: ControllerMapping = {
  A: 0, B: 1, X: 2, Y: 3,
  LB: 4, RB: 5, LT: 6, RT: 7,
  SELECT: 8, START: 9, LS: 10, RS: 11,
  DPAD_UP: 12, DPAD_DOWN: 13, DPAD_LEFT: 14, DPAD_RIGHT: 15
};

const PS5_MAPPING: ControllerMapping = {
  A: 1, B: 2, X: 0, Y: 3,  // PS5 has different X/A mapping
  LB: 4, RB: 5, LT: 6, RT: 7,
  SELECT: 8, START: 9, LS: 10, RS: 11,
  DPAD_UP: 12, DPAD_DOWN: 13, DPAD_LEFT: 14, DPAD_RIGHT: 15
};

export function useControllerInput(onInput?: (button: string, pressed: boolean) => void) {
  const [gamepads, setGamepads] = useState<GamepadState[]>([]);
  const [isSupported, setIsSupported] = useState(false);

  const getControllerMapping = (gamepadId: string): ControllerMapping => {
    if (gamepadId.includes('DualSense') || gamepadId.includes('PlayStation')) {
      return PS5_MAPPING;
    }
    return XBOX_MAPPING; // Default to Xbox mapping
  };

  const triggerHaptic = useCallback((intensity: number = 0.5, duration: number = 200) => {
    const gamepad = navigator.getGamepads()[0];
    if (gamepad?.vibrationActuator) {
      gamepad.vibrationActuator.playEffect('dual-rumble', {
        duration,
        strongMagnitude: intensity,
        weakMagnitude: intensity * 0.5
      }).catch(() => {
        // Fallback for browsers that don't support haptics
        console.log('🎮 Haptic feedback not supported');
      });
    }
  }, []);

  const checkGamepadState = useCallback(() => {
    const pads = navigator.getGamepads();
    const newGamepads: GamepadState[] = [];

    for (let i = 0; i < pads.length; i++) {
      const pad = pads[i];
      if (pad) {
        const currentState: GamepadState = {
          connected: pad.connected,
          id: pad.id,
          buttons: pad.buttons.map(b => b.pressed),
          axes: Array.from(pad.axes),
          timestamp: pad.timestamp
        };

        // Check for button changes and trigger callbacks
        const prevState = gamepads[i];
        if (prevState && onInput) {
          const mapping = getControllerMapping(pad.id);
          
          // Check each button for state changes
          Object.entries(mapping).forEach(([buttonName, buttonIndex]) => {
            const wasPressed = prevState.buttons[buttonIndex];
            const isPressed = currentState.buttons[buttonIndex];
            
            if (wasPressed !== isPressed) {
              onInput(buttonName, isPressed);
              
              // Trigger haptic feedback on button press
              if (isPressed) {
                triggerHaptic(0.3, 100);
              }
            }
          });
        }

        newGamepads[i] = currentState;
      }
    }

    setGamepads(newGamepads);
  }, [gamepads, onInput, triggerHaptic]);

  useEffect(() => {
    // Check if gamepad API is supported
    setIsSupported('getGamepads' in navigator);

    if (!isSupported) return;

    const handleGamepadConnected = (e: GamepadEvent) => {
      console.log(`🎮 Controller connected: ${e.gamepad.id}`);
      triggerHaptic(0.8, 300); // Welcome haptic
    };

    const handleGamepadDisconnected = (e: GamepadEvent) => {
      console.log(`🎮 Controller disconnected: ${e.gamepad.id}`);
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // Poll for gamepad state changes
    const pollInterval = setInterval(checkGamepadState, 50); // 20fps polling

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      clearInterval(pollInterval);
    };
  }, [isSupported, checkGamepadState, triggerHaptic]);

  // Helper functions for common controller actions
  const getAxisValue = (gamepadIndex: number, axisIndex: number): number => {
    return gamepads[gamepadIndex]?.axes[axisIndex] || 0;
  };

  const isButtonPressed = (gamepadIndex: number, buttonName: keyof ControllerMapping): boolean => {
    const gamepad = gamepads[gamepadIndex];
    if (!gamepad) return false;
    
    const mapping = getControllerMapping(gamepad.id);
    const buttonIndex = mapping[buttonName];
    return gamepad.buttons[buttonIndex] || false;
  };

  const getLeftStick = (gamepadIndex: number = 0) => ({
    x: getAxisValue(gamepadIndex, 0),
    y: getAxisValue(gamepadIndex, 1)
  });

  const getRightStick = (gamepadIndex: number = 0) => ({
    x: getAxisValue(gamepadIndex, 2),
    y: getAxisValue(gamepadIndex, 3)
  });

  return {
    gamepads,
    isSupported,
    triggerHaptic,
    isButtonPressed,
    getLeftStick,
    getRightStick,
    getAxisValue,
    connectedControllers: gamepads.filter(g => g?.connected).length
  };
}