// Popup script for Roam Research URL Saver
let currentTab = null;

// Load current tab info and saved settings
document.addEventListener('DOMContentLoaded', async () => {
  // Load saved settings
  try {
    const settings = await chrome.storage.local.get(['roamGraph', 'roamApiToken', 'formatPreference']);

    if (settings.roamGraph) {
      document.getElementById('graph').value = settings.roamGraph;
    }

    if (settings.roamApiToken) {
      document.getElementById('apiToken').value = settings.roamApiToken;
    }

    if (settings.formatPreference) {
      document.getElementById('format').value = settings.formatPreference;
    } else {
      document.getElementById('format').value = 'title-link';
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }

  // Get current tab info
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tabs && tabs[0]) {
      currentTab = {
        url: tabs[0].url,
        title: tabs[0].title
      };
      document.getElementById('pageTitle').textContent = currentTab.title || 'Untitled';
      document.getElementById('pageUrl').textContent = currentTab.url || '';
    } else {
      document.getElementById('pageTitle').textContent = 'Error: No tab found';
      document.getElementById('pageUrl').textContent = '';
    }
  } catch (error) {
    document.getElementById('pageTitle').textContent = 'Error loading tab';
    document.getElementById('pageUrl').textContent = error.message;
  }

  // Add event listeners
  document.getElementById('settingsToggle').addEventListener('click', toggleSettings);
  document.getElementById('saveBtn').addEventListener('click', saveToRoam);
});

function toggleSettings() {
  const panel = document.getElementById('settingsPanel');
  panel.style.display = panel.style.display === 'none' || panel.style.display === '' ? 'block' : 'none';
}

async function saveToRoam() {
  const graph = document.getElementById('graph').value.trim();
  const apiToken = document.getElementById('apiToken').value.trim();
  const format = document.getElementById('format').value;
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  // Validate inputs
  if (!graph) {
    showStatus('Please enter your Roam graph name', 'error');
    document.getElementById('graph').focus();
    return;
  }

  if (!apiToken) {
    showStatus('Please enter your API token in Authentication Settings', 'error');
    const panel = document.getElementById('settingsPanel');
    if (panel.style.display === 'none' || panel.style.display === '') {
      panel.style.display = 'block';
    }
    document.getElementById('apiToken').focus();
    return;
  }

  if (!currentTab) {
    showStatus('Could not get current page information', 'error');
    return;
  }

  // Save settings for next time
  await chrome.storage.local.set({
    roamGraph: graph,
    roamApiToken: apiToken,
    formatPreference: format
  });

  // Disable button and show loading
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';
  status.style.display = 'none';

  try {
    // Format the content based on user preference
    const content = formatContent(currentTab.title, currentTab.url, format) + ' [[To Read]]';

    // Get today's date in MM-DD-YYYY format for daily-note-page
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const dateStr = `${month}-${day}-${year}`;

    // Write the block to today's daily notes
    const writeUrl = `https://api.roamresearch.com/api/graph/${graph}/write`;

    const writeResponse = await fetch(writeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${apiToken}`
      },
      body: JSON.stringify({
        action: 'create-block',
        location: {
          'page-title': {
            'daily-note-page': dateStr
          },
          order: -1
        },
        block: {
          string: content
        }
      })
    });

    if (!writeResponse.ok) {
      const errorText = await writeResponse.text();
      throw new Error(`Failed to write to Roam (${writeResponse.status}): ${errorText}`);
    }

    showStatus('Successfully saved to Roam Research!', 'success');

    // Close popup after 1 second
    setTimeout(() => {
      window.close();
    }, 1000);

  } catch (error) {
    console.error('Error saving to Roam:', error);
    showStatus('Error: ' + error.message, 'error');
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save to Today\'s Page';
  }
}

function formatContent(title, url, format) {
  switch (format) {
    case 'link':
      return url;
    case 'title-link':
      return `[${title}](${url})`;
    case 'bullet':
      return `${title} - ${url}`;
    default:
      return `[${title}](${url})`;
  }
}

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  status.style.display = 'block';
}
