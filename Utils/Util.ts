import profaneWords from 'profane-words';
import SMS, {SendSmsOptions} from 'react-native-sms';
import Contacts, {Contact} from 'react-native-contacts';

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

export const sendMessage = async (recipient: string, message: string) => {
  const options: SendSmsOptions = {
    body: message,
    recipients: [recipient],
  };

  await SMS.send(
    options,
    (completed: boolean, cancelled: boolean, error: boolean) => {
      if (completed) {
        console.log('Message sent successfully.');
      } else if (cancelled) {
        console.log('Message cancelled.');
      } else if (error) {
        console.log(`Message failed with error: ${error}`);
      }
    },
  );
};

export const getContactList = async (): Promise<Contact[]> => {
  try {
    return await Contacts.getAll();
  } catch (error) {
    console.error('Failed to get contacts', error);
    return [];
  }
};

export const getRandomContact = async (
  exclusions: Contact[],
): Promise<Contact | null> => {
  try {
    const contacts: Contact[] = await getContactList();
    const filteredContacts = contacts.filter(
      contact => !exclusions.includes(contact),
    );
    if (filteredContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredContacts.length);
      return filteredContacts[randomIndex];
    }
    return null;
  } catch (error) {
    console.error('Failed to get random contact', error);
    return null;
  }
};
