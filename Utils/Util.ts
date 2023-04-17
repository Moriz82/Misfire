import profaneWords from 'profane-words';

export function checkForProfanity(text: string): boolean {
  // Check if any profanity words exist in the text
  for (const word of profaneWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(text)) {
      return true;
    }
  }

  // No profanity words were found in the text
  return false;
}
