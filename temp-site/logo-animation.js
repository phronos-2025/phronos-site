/**
 * Phronos Lens Animation
 * 
 * An animated ouroboros (self-consuming serpent) logo with a pulsing gold center.
 * Represents the cyclical nature of self-knowledge and empirical observation.
 * 
 * @see docs/logo-animation-specs.md for full specifications
 */

// Brand Colors (from vision/BRAND.yaml)
const COLORS = {
    ink: '#1A1A1A',
    gold: '#B08D55',
    goldDim: 'rgba(176, 141, 85, 0.4)',
};

// Animation Constants
const ROTATION_SPEED = 0.015;  // radians per frame
const PULSE_SPEED = 400;       // ms per cycle (used in sin function)

/**
 * PhronosLens - Animated logo class
 * 
 * @example
 * const canvas = document.getElementById('lens');
 * const lens = new PhronosLens(canvas);
 * lens.start();
 * 
 * // Later, to stop:
 * lens.stop();
 */
class PhronosLens {
    /**
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on
     * @param {Object} options - Configuration options
     * @param {number} options.size - Canvas size (default: uses canvas width)
     */
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.size = options.size || canvas.width || 31;
        this.rotation = 0;
        this.animationId = null;
        
        // Calculate scaled dimensions based on reference size of 31px
        this.scale = this.size / 31;
    }

    /**
     * Get scaled dimension
     * @param {number} value - Base value at 31px
     * @returns {number} Scaled value
     */
    scaled(value) {
        return value * this.scale;
    }

    /**
     * Draw a single frame
     */
    draw() {
        const ctx = this.ctx;
        const centerX = this.size / 2;
        const centerY = this.size / 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.size, this.size);

        // === 1. Ouroboros (Rotating Serpent Ring) ===
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);

        // Serpent body (arc)
        const radius = this.scaled(11.2);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0.3, Math.PI * 1.9);
        ctx.strokeStyle = COLORS.ink;
        ctx.lineWidth = this.scaled(2.7);
        ctx.lineCap = 'round';
        ctx.stroke();

        // Serpent head position
        const headAngle = Math.PI * 1.9;
        const headX = Math.cos(headAngle) * radius;
        const headY = Math.sin(headAngle) * radius;

        // Serpent head (circle)
        ctx.beginPath();
        ctx.arc(headX, headY, this.scaled(3.25), 0, Math.PI * 2);
        ctx.fillStyle = COLORS.ink;
        ctx.fill();

        // Serpent eye (gold detail inside head)
        ctx.beginPath();
        ctx.arc(headX, headY, this.scaled(1.2), 0, Math.PI * 2);
        ctx.fillStyle = COLORS.gold;
        ctx.fill();

        ctx.restore();

        // === 2. Pulsing Center Core ===
        const pulse = (Math.sin(Date.now() / PULSE_SPEED) + 1) / 2;

        // Outer ripple (faint, expanding)
        ctx.beginPath();
        ctx.arc(
            centerX, 
            centerY, 
            this.scaled(3.25) + (pulse * this.scaled(1.6)), 
            0, 
            Math.PI * 2
        );
        ctx.strokeStyle = COLORS.goldDim;
        ctx.lineWidth = this.scaled(1.2);
        ctx.stroke();

        // Inner core (solid gold point)
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.scaled(1.6), 0, Math.PI * 2);
        ctx.fillStyle = COLORS.gold;
        ctx.fill();

        // Update rotation for next frame
        this.rotation += ROTATION_SPEED;
    }

    /**
     * Animation loop
     */
    animate() {
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    /**
     * Start the animation
     */
    start() {
        if (this.animationId) return; // Already running
        this.animate();
    }

    /**
     * Stop the animation
     */
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Resize the animation
     * @param {number} newSize - New canvas size
     */
    resize(newSize) {
        this.size = newSize;
        this.scale = newSize / 31;
        this.canvas.width = newSize;
        this.canvas.height = newSize;
    }

    /**
     * Draw a static frame (no animation)
     * Useful for generating static images or thumbnails
     */
    drawStatic() {
        this.rotation = Math.PI * 0.25; // Pleasing default angle
        this.draw();
    }
}

/**
 * Factory function for quick initialization
 * 
 * @param {string|HTMLCanvasElement} target - Canvas element or selector
 * @param {Object} options - Configuration options
 * @returns {PhronosLens} Initialized and started lens instance
 * 
 * @example
 * // Using selector
 * const lens = createPhronosLens('#my-canvas');
 * 
 * // Using element
 * const canvas = document.getElementById('my-canvas');
 * const lens = createPhronosLens(canvas, { size: 64 });
 */
function createPhronosLens(target, options = {}) {
    const canvas = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
    
    if (!canvas) {
        console.error('PhronosLens: Canvas element not found');
        return null;
    }

    const lens = new PhronosLens(canvas, options);
    lens.start();
    return lens;
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = { PhronosLens, createPhronosLens, COLORS };
} else if (typeof window !== 'undefined') {
    // Browser global
    window.PhronosLens = PhronosLens;
    window.createPhronosLens = createPhronosLens;
}
