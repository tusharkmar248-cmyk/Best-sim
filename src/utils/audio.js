// Web Audio API Synthesizer for high-fidelity sci-fi interface audio effects
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate generic synth UI click
  playClick() {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Double chime when JARVIS boots up
  playJarvisBoot() {
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Low base chime
    this.triggerTone(523.25, 0.15, 'triangle', 0.05, t); // C5
    this.triggerTone(783.99, 0.25, 'sine', 0.08, t + 0.12); // G5
    this.triggerTone(1046.50, 0.4, 'sine', 0.06, t + 0.24); // C6
  }

  // Computer chirp when microphone is opened
  playMicStart() {
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.triggerTone(987.77, 0.08, 'sine', 0.07, t); // B5
    this.triggerTone(1318.51, 0.15, 'sine', 0.05, t + 0.07); // E6
  }

  // System alert chime
  playSystemWarning() {
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.triggerTone(440, 0.15, 'sawtooth', 0.04, t);
    this.triggerTone(440, 0.15, 'sawtooth', 0.04, t + 0.2);
  }

  // Chime when agents successfully compile plans
  playSuccessChime() {
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.triggerTone(880, 0.1, 'sine', 0.06, t);
    this.triggerTone(1100, 0.1, 'sine', 0.06, t + 0.08);
    this.triggerTone(1320, 0.1, 'sine', 0.06, t + 0.16);
    this.triggerTone(1760, 0.25, 'sine', 0.08, t + 0.24);
  }

  // Core oscillator trigger mapping helper
  triggerTone(freq, duration, type, volume, startTime) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }
}

export const synth = new AudioSynthesizer();
export default synth;
