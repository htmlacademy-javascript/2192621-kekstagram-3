const MINUTE_PER_HOUR = 60;

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalized = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return normalized === reversed;
};

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

const getTimeToMinute = (timeString) => {
  const strings = timeString.split(':');
  const numbers = strings.map((string) => Number(string));
  const totalMinutes = numbers[0] * MINUTE_PER_HOUR + numbers[1];

  return totalMinutes;
};

const checkMeetingTiming = (startWork, endWork, startMeeting, duration) => {
  const startWorkInMinutes = getTimeToMinute(startWork);
  const endWorkInMinutes = getTimeToMinute(endWork);
  const startMeetingInMinutes = getTimeToMinute(startMeeting);

  const endMeetingInMinutes = startMeetingInMinutes + duration;

  return startMeetingInMinutes >= startWorkInMinutes && endMeetingInMinutes <= endWorkInMinutes;
};

export { checkStringLength, isPalindrome, extractNumber, checkMeetingTiming };
