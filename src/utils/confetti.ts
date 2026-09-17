import confetti from 'canvas-confetti';

/**
 * Trigger an elegant, multi-stage golden confetti explosion 
 * when an order is successfully completed.
 */
export function triggerOrderCelebrationConfetti(): void {
  // Primary golden burst
  confetti({
    particleCount: 70,
    spread: 80,
    origin: { y: 0.55 },
    colors: ['#C5A059', '#8C6D2D', '#F5E6C8', '#10B981', '#1C1917', '#E5C378'],
    ticks: 250,
    gravity: 1,
    scalar: 1.1,
    zIndex: 99999,
  });

  // Secondary left-flank cannon
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 60,
      origin: { x: 0.08, y: 0.65 },
      colors: ['#C5A059', '#8C6D2D', '#FAF8F5', '#E5C378', '#34D399'],
      ticks: 200,
      gravity: 1.1,
      scalar: 0.95,
      zIndex: 99999,
    });
  }, 180);

  // Secondary right-flank cannon
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 60,
      origin: { x: 0.92, y: 0.65 },
      colors: ['#C5A059', '#8C6D2D', '#FAF8F5', '#E5C378', '#34D399'],
      ticks: 200,
      gravity: 1.1,
      scalar: 0.95,
      zIndex: 99999,
    });
  }, 320);

  // High-arc golden stars / glitter shower
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#FFD700', '#C5A059', '#FFF8DC'],
      shapes: ['star', 'circle'],
      ticks: 180,
      gravity: 0.8,
      scalar: 1.2,
      zIndex: 99999,
    });
  }, 450);
}
