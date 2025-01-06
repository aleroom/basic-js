const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct; // Store the direction of the machine
  }

  encrypt(message, key) {
    // ... existing code ...
    const result = this.cipher(message, key, true);
    return this.direct ? result : result.split('').reverse().join('');
  }

  decrypt(message, key) {
    // ... existing code ...
    const result = this.cipher(message, key, false);
    return this.direct ? result : result.split('').reverse().join('');
  }

  cipher(message, key, isEncrypt) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let keyIndex = 0;
    let result = '';

    for (let char of message) {
      if (alphabet.includes(char.toUpperCase())) {
        const messageIndex = alphabet.indexOf(char.toUpperCase());
        const keyChar = key[keyIndex % key.length].toUpperCase();
        const keyIndexInAlphabet = alphabet.indexOf(keyChar);
        const newIndex = isEncrypt
          ? (messageIndex + keyIndexInAlphabet) % 26
          : (messageIndex - keyIndexInAlphabet + 26) % 26;

        result += alphabet[newIndex];
        keyIndex++;
      } else {
        result += char; // Preserve non-alphabet characters
      }
    }

    return result;
  }
}

module.exports = {
  VigenereCipheringMachine
};
