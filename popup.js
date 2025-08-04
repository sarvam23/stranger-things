document.addEventListener('DOMContentLoaded', async function() {
  const toggle = document.getElementById('modeToggle');
  const status = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');
  
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Load current mode from storage
  const result = await chrome.storage.sync.get([`mode_${tab.url}`]);
  const currentMode = result[`mode_${tab.url}`] || 'light';
  
  // Set initial state
  updateUI(currentMode);
  
  // Toggle click handler
  toggle.addEventListener('click', async function() {
    const newMode = toggle.classList.contains('active') ? 'light' : 'dark';
    
    // Save mode for this site
    await chrome.storage.sync.set({ [`mode_${tab.url}`]: newMode });
    
    // Send message to content script
    try {
      await chrome.tabs.sendMessage(tab.id, { 
        action: 'toggleMode', 
        mode: newMode 
      });
      
      updateUI(newMode);
      status.textContent = `Switched to ${newMode} mode`;
    } catch (error) {
      status.textContent = 'Please refresh the page';
    }
  });
  
  // Reset button handler
  resetBtn.addEventListener('click', async function() {
    // Remove mode setting for this site
    await chrome.storage.sync.remove([`mode_${tab.url}`]);
    
    // Send reset message to content script
    try {
      await chrome.tabs.sendMessage(tab.id, { 
        action: 'resetMode'
      });
      
      updateUI('light');
      status.textContent = 'Reset to default mode';
    } catch (error) {
      status.textContent = 'Please refresh the page';
    }
  });
  
  function updateUI(mode) {
    if (mode === 'dark') {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
    status.textContent = `Current mode: ${mode}`;
  }
});