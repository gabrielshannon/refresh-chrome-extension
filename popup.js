// document.getElementById("refreshButton").addEventListener("click", function() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.reload(tabs[0].id);
//     });
//   });

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", function () {
    const timeInput = document.getElementById("timeInput").value;

    const [hours, minutes] = timeInput.split(':');



    const hoursWithoutZeros = parseInt(hours, 10).toString();
    const minsWithoutZeros = parseInt(minutes, 10).toString();


    // Reconstruct the time input with the corrected hours and original minutes

    console.log('hours without leading zeros ' + hoursWithoutZeros)
    console.log('mins without leading zeros ' + minsWithoutZeros)

    // Send message to the background script
    chrome.runtime.sendMessage({
      hoursWithoutZeros: hoursWithoutZeros,
      minsWithoutZeros: minsWithoutZeros
    }, function (response) {
      console.log("Message sent to background script");
    });

  });
});
