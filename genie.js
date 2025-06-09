// app.js
class GenieApp {
    constructor() {
      this.responses = [
        "Presto...100 points!",
        "Your wish is granted!",
        "Abracadabra! Done!",
        "Poof! Consider it done!",
        "By the power of Globocorp... granted!",
        "Your desire is my command!",
        "As you wish!",
        "Let me make that happen for you!"
      ];
      this.init();
    }
  
    init() {
      this.chat = document.getElementById('chat');
      this.input = document.getElementById('input');
      this.sendButton = document.getElementById('send-button');
  
      this.sendButton.addEventListener('click', () => this.handleSend());
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSend();
      });
  
      this.postMessage('genie', "Hello! I'm the Globocorp Genie. Your wish is my command!");
    }
  
    handleSend() {
      const userText = this.input.value.trim();
      if (!userText) {
        this.input.focus();
        return;
      }
  
      this.postMessage('user', userText);
      this.input.value = '';
  
      setTimeout(() => this.respond(userText), 600);
    }
  
    respond(userInput) {
      const lower = userInput.toLowerCase();
      let reply;
  
      if (lower.includes('point')) {
        reply = this.responses[0]; // Special points message
      } else {
        const index = Math.floor(Math.random() * (this.responses.length - 1)) + 1;
        reply = this.responses[index];
      }
  
      this.postMessage('genie', reply);
    }
  
    postMessage(sender, text) {
      const div = document.createElement('div');
      div.classList.add('message', `${sender}-message`);
      div.textContent = sender === 'user' ? `YOU\n${text}` : `GENIE\n${text}`;
      this.chat.appendChild(div);
      this.chat.scrollTop = this.chat.scrollHeight;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => new GenieApp());
