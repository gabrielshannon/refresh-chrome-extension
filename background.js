let timeUntilNextOccurrence;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.hoursWithoutZeros && message.minsWithoutZeros) {
    const receivedHours = message.hoursWithoutZeros;
    const receivedMinutes = message.minsWithoutZeros;

    console.log("Received hours without leading zeros: " + receivedHours);
    console.log("Received minutes without leading zeros: " + receivedMinutes);


    timeUntilNextOccurrence = getTimeUntilNextOccurrence(receivedHours, receivedMinutes);

    sendResponse("Received hours and minutes without leading zeros");
        createAlarm(timeUntilNextOccurrence);
  }
});

function createAlarm(timeUntilAlarm) {
  chrome.alarms.create('refreshAlarm', { when: Date.now() + timeUntilAlarm });

  chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === 'refreshAlarm') {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    }
  });
}

function getTimeUntilNextOccurrence(hour, minute) {
  const now = new Date();
  const targetTime = new Date(now);
  targetTime.setHours(hour, minute, 0, 0);

  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const timeUntilNextOccurrence = targetTime - now;
  return timeUntilNextOccurrence;
}

