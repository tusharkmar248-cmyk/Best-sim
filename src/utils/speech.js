// Text-To-Speech Voice manager for simulating the JARVIS assistant responses
class SpeechManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.activeUtterance = null;
  }

  // Speak target text aloud
  speak(text, onStart = null, onEnd = null) {
    if (!this.synth) return;

    // Stop any active speech first
    this.stop();

    // Clean text: remove markdown tokens, raw asterisks, or code symbols for smooth reading
    const cleanText = text
      .replace(/[\#\*\_`\-]/g, ' ')
      .replace(/\[.*\]\(.*\)/g, '') // strip links
      .substring(0, 350); // limit spoken length for good UX

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Setup vocal parameters for a stylized, crisp technological assistant
    utterance.rate = 1.05; // Slightly faster standard tempo
    utterance.pitch = 0.95; // Slightly lower voice bar for deep tone

    // Attempt to locate a premium British Male butler voice (classic Jarvis vibe)
    const voices = this.synth.getVoices();
    const targetVoice = voices.find(v => v.lang.includes('en-GB') && v.name.toLowerCase().includes('male')) ||
      voices.find(v => v.lang.includes('en-GB')) ||
      voices.find(v => v.lang.includes('en-US')) ||
      voices[0];

    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    if (onStart) utterance.onstart = onStart;

    utterance.onend = () => {
      this.activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.activeUtterance = null;
      if (onEnd) onEnd();
    };

    this.activeUtterance = utterance;
    this.synth.speak(utterance);
  }

  // Force stop all active voice streams
  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.activeUtterance = null;
    }
  }

  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }
}

export const speech = new SpeechManager();
export default speech;
