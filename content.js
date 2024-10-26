// Function to select buttons with "connect" either in aria-label or in the button text
function getConnectButtons() {
  // Select buttons by aria-label containing "Connect"
  let buttons = Array.from(document.querySelectorAll('button[aria-label*="connect"]'));

  // Add buttons that contain the text "connect" (this handles the :contains part manually)
  buttons = buttons.concat(
    Array.from(document.querySelectorAll('button')).filter(button => button.innerText.includes('connect'))
  );

  return buttons;
}

// Function to simulate a click on the Connect buttons
function autoConnect() {
  let connectButtons = getConnectButtons();
  
  connectButtons.forEach(button => {
    button.click();
    console.log('Clicked Connect!');
  });
}

// Run the function every 5 seconds to check for new Connect buttons
setInterval(autoConnect, 5000);