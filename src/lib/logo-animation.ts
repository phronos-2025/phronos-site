/**
 * Phronos Lens Animation
 * An animated ouroboros (self-consuming serpent) logo with a pulsing gold center.
 */

const COLORS = {
  ink: '#1A1A1A',
  gold: '#B08D55',
  goldDim: 'rgba(176, 141, 85, 0.4)',
};

// Rotation speed in radians per second (not per frame)
// Target: ~0.0716 rotations/second = 0.45 radians/second (matches 30Hz behavior)
const ROTATION_SPEED_PER_SECOND = 0.45;
const PULSE_SPEED = 400;

export class PhronosLens {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private scale: number;
  private rotation: number = 0;
  private animationId: number | null = null;
  private lastTime: number = 0;
  private frameCount: number = 0;
  private fpsLogTime: number = 0;

  constructor(canvas: HTMLCanvasElement, options: { size?: number } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.size = options.size || canvas.width || 31;
    this.scale = this.size / 31;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/13335825-0b0d-4322-8319-29fc41586427',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'logo-animation.ts:constructor',message:'PhronosLens initialized',data:{size:this.size,scale:this.scale},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
  }

  private scaled(value: number): number {
    return value * this.scale;
  }

  draw(deltaTime: number = 0): void {
    const ctx = this.ctx;
    const centerX = this.size / 2;
    const centerY = this.size / 2;

    ctx.clearRect(0, 0, this.size, this.size);
    
    // Time-based rotation: radians per second * deltaTime
    this.rotation += ROTATION_SPEED_PER_SECOND * deltaTime;

    // Ouroboros (Rotating Serpent Ring)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotation);

    const radius = this.scaled(11.2);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0.3, Math.PI * 1.9);
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = this.scaled(2.7);
    ctx.lineCap = 'round';
    ctx.stroke();

    // Serpent head
    const headAngle = Math.PI * 1.9;
    const headX = Math.cos(headAngle) * radius;
    const headY = Math.sin(headAngle) * radius;

    ctx.beginPath();
    ctx.arc(headX, headY, this.scaled(3.25), 0, Math.PI * 2);
    ctx.fillStyle = COLORS.ink;
    ctx.fill();

    // Serpent eye
    ctx.beginPath();
    ctx.arc(headX, headY, this.scaled(1.2), 0, Math.PI * 2);
    ctx.fillStyle = COLORS.gold;
    ctx.fill();

    ctx.restore();

    // Pulsing Center Core
    const pulse = (Math.sin(Date.now() / PULSE_SPEED) + 1) / 2;

    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      this.scaled(3.25) + pulse * this.scaled(1.6),
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = COLORS.goldDim;
    ctx.lineWidth = this.scaled(1.2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, this.scaled(1.6), 0, Math.PI * 2);
    ctx.fillStyle = COLORS.gold;
    ctx.fill();
    
    // #region agent log
    this.frameCount++;
    const now = performance.now();
    if (now - this.fpsLogTime >= 2000) {
      const fps = Math.round(this.frameCount / ((now - this.fpsLogTime) / 1000));
      const rotationsPerSecond = ROTATION_SPEED_PER_SECOND / (Math.PI * 2);
      fetch('http://127.0.0.1:7243/ingest/13335825-0b0d-4322-8319-29fc41586427',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'logo-animation.ts:draw',message:'Animation FPS measured (time-based)',data:{fps,rotationsPerSecond:rotationsPerSecond.toFixed(4),rotationSpeedPerSecond:ROTATION_SPEED_PER_SECOND,currentRotation:this.rotation.toFixed(4),runId:'post-fix'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
      this.frameCount = 0;
      this.fpsLogTime = now;
    }
    // #endregion
  }

  private animate(currentTime: number = 0): void {
    // Calculate delta time in seconds
    const deltaTime = this.lastTime ? (currentTime - this.lastTime) / 1000 : 0;
    this.lastTime = currentTime;
    
    this.draw(deltaTime);
    this.animationId = requestAnimationFrame((t) => this.animate(t));
  }

  start(): void {
    if (this.animationId) return;
    this.animate();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resize(newSize: number): void {
    this.size = newSize;
    this.scale = newSize / 31;
    this.canvas.width = newSize;
    this.canvas.height = newSize;
  }
}

export function createPhronosLens(
  target: string | HTMLCanvasElement,
  options: { size?: number } = {}
): PhronosLens | null {
  const canvas =
    typeof target === 'string'
      ? (document.querySelector(target) as HTMLCanvasElement)
      : target;

  if (!canvas) {
    console.error('PhronosLens: Canvas element not found');
    return null;
  }

  const lens = new PhronosLens(canvas, options);
  lens.start();
  return lens;
}

