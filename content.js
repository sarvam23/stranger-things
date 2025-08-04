// Content script to handle dark/light mode switching
(function() {
  'use strict';
  
  let darkModeEnabled = false;
  let styleElement = null;
  
  // Dark mode CSS
  const darkModeCSS = `
    /* Dark mode styles */
    html[data-dark-mode="true"] {
      filter: invert(1) hue-rotate(180deg) !important;
    }
    
    html[data-dark-mode="true"] img,
    html[data-dark-mode="true"] video,
    html[data-dark-mode="true"] iframe,
    html[data-dark-mode="true"] canvas,
    html[data-dark-mode="true"] svg,
    html[data-dark-mode="true"] [style*="background-image"] {
      filter: invert(1) hue-rotate(180deg) !important;
    }
    
    html[data-dark-mode="true"] [src*=".jpg"],
    html[data-dark-mode="true"] [src*=".jpeg"],
    html[data-dark-mode="true"] [src*=".png"],
    html[data-dark-mode="true"] [src*=".gif"],
    html[data-dark-mode="true"] [src*=".webp"],
    html[data-dark-mode="true"] [src*=".svg"] {
      filter: invert(1) hue-rotate(180deg) !important;
    }
  `;
  
  // Initialize on page load
  init();
  
  async function init() {
    // Check if mode is saved for this site
    try {
      const result = await chrome.storage.sync.get([`mode_${window.location.href}`]);
      const savedMode = result[`mode_${window.location.href}`];
      
      if (savedMode === 'dark') {
        enableDarkMode();
      }
    } catch (error) {
      console.log('Extension storage not available');
    }
  }
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleMode') {
      if (request.mode === 'dark') {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
      sendResponse({ success: true });
    } else if (request.action === 'resetMode') {
      disableDarkMode();
      sendResponse({ success: true });
    }
  });
  
  function enableDarkMode() {
    if (darkModeEnabled) return;
    
    darkModeEnabled = true;
    document.documentElement.setAttribute('data-dark-mode', 'true');
    
    // Create and inject style element
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dark-mode-extension-styles';
      styleElement.textContent = darkModeCSS;
      document.head.appendChild(styleElement);
    }
  }
  
  function disableDarkMode() {
    if (!darkModeEnabled) return;
    
    darkModeEnabled = false;
    document.documentElement.removeAttribute('data-dark-mode');
    
    // Remove style element
    if (styleElement) {
      styleElement.remove();
      styleElement = null;
    }
  }
  
  // Handle dynamic content
  const observer = new MutationObserver((mutations) => {
    if (darkModeEnabled) {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Re-apply dark mode if needed
            if (!document.documentElement.hasAttribute('data-dark-mode')) {
              document.documentElement.setAttribute('data-dark-mode', 'true');
            }
          }
        });
      });
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();