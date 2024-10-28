document.getElementById('start').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        //Indicates that the script will be injected into the tab identified by tabs[0].id, which refers to the ID of the first active tab in the tabs array.
          target: {tabId: tabs[0].id},
          func: () => {
              if (!window.autoConnect) {
                  window.autoConnect = setInterval(() => {
                    // Select buttons by aria-label containing "connect", add buttons that contain the text "connect" by manual filtering.
                      const connectButtons = Array.from(document.querySelectorAll('button[aria-label*="connect"], button'))
                          .filter(button => button.innerText.toLowerCase().includes('connect'));
                      
                      connectButtons.forEach(button => {
                          button.click();
                          const noteButton = document.querySelector('button[aria-label*="Send without a note"]');
                          if(noteButton !== null){
                            noteButton.click();
                            console.log('Sent connection without note');
                          }
                          console.log('Clicked Connect!');
                      });
                  }, 5000);
                  console.log("Auto-connect started");
              } else {
                  console.log("Auto-connect is already running");
              }
          }
      });
  });
});

document.getElementById('stop').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: () => {
              if (window.autoConnect) {
                  clearInterval(window.autoConnect);
                  delete window.autoConnect;
                  console.log("Auto-connect stopped");
              } else {
                  console.log("No active auto-connect interval to stop");
              }
          }
      });
  });
});