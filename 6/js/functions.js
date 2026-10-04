const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength();

const isPalindrome = (string) => {
  const normalized = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return normalized === reversed;
};

isPalindrome();

const extractNumber = (value) => {
  const string = value.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const character = string[i];
    const parsed = parseInt(character, 10);
    if (Number.isNaN(parsed) === false) {
      result += character;
    }
  }
  return parseInt(result, 10);
};

extractNumber();
