const tabListEl = document.getElementById("tabList");
const copyBtn = document.getElementById("copyBtn");
const exportBtn = document.getElementById("exportBtn");
const selectedCountEl = document.getElementById("selectedCount");
const selectAllBtn = document.getElementById("selectAllBtn");
const selectNoneBtn = document.getElementById("selectNoneBtn");
const toastEl = document.getElementById("toast");
const selectionBannerEl = document.getElementById("selectionBanner");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeToggleBadge = document.getElementById("themeToggleBadge");
const formatSelectEl = document.getElementById("formatSelect");
const searchInput = document.getElementById("tabSearch");
const scopeToggleEl = document.getElementById("scopeToggle");
const groupToggleEl = document.getElementById("groupToggle");

const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme() {
  const mode = localStorage.getItem("theme-mode") || "system";
  if (mode === "system") {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.setAttribute("data-theme-mode", "system");
    themeToggleBadge.textContent = "Auto";
    themeToggleBadge.classList.add("system-sync");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-theme-mode", mode);
    themeToggleBadge.textContent = mode;
    themeToggleBadge.classList.remove("system-sync");
  }
}

themeToggleBtn.addEventListener("click", () => {
  const currentMode = localStorage.getItem("theme-mode") || "system";
  if (currentMode === "system") {
    const isDark = systemPrefersDark.matches;
    const nextMode = isDark ? "light" : "dark";
    localStorage.setItem("theme-mode", nextMode);
  } else {
    localStorage.setItem("theme-mode", "system");
  }
  applyTheme();
});

systemPrefersDark.addEventListener("change", () => {
  const currentMode = localStorage.getItem("theme-mode") || "system";
  if (currentMode === "system") {
    applyTheme();
  }
});

// Initialize theme immediately
applyTheme();

let tabs = [];

// Fallback icon as inline SVG data URI (used when a tab has no favicon)
const FALLBACK_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" rx="3" fill="%23d1d5db"/></svg>'
  );

function updateFooter() {
  const checkboxes = tabListEl.querySelectorAll('.tab-row input[type="checkbox"]');
  const checked = Array.from(checkboxes).filter((cb) => cb.checked);
  selectedCountEl.textContent = `${checked.length} selected`;
  copyBtn.disabled = checked.length === 0;
  if (exportBtn) exportBtn.disabled = checked.length === 0;
}

function getDomain(urlStr) {
  try {
    const url = new URL(urlStr);
    let hostname = url.hostname;
    if (hostname.startsWith("www.")) {
      hostname = hostname.substring(4);
    }
    return hostname || "Local / Other";
  } catch (e) {
    return "Local / Other";
  }
}

function createTabRow(tab, hasBrowserMultiSelection) {
  const row = document.createElement("label");
  row.className = "tab-row";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.tabId = String(tab.id);
  checkbox.checked = hasBrowserMultiSelection && tab.highlighted;
  
  if (checkbox.checked) {
    row.classList.add("selected");
  }
  
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      row.classList.add("selected");
    } else {
      row.classList.remove("selected");
    }
    updateFooter();
  });

  const favicon = document.createElement("img");
  favicon.className = "tab-favicon";
  favicon.src = tab.favIconUrl && tab.favIconUrl.startsWith("http") ? tab.favIconUrl : FALLBACK_ICON;
  favicon.addEventListener("error", () => {
    favicon.src = FALLBACK_ICON;
  });

  const info = document.createElement("div");
  info.className = "tab-info";

  const title = document.createElement("div");
  title.className = "tab-title";
  title.textContent = tab.title || tab.url;

  const url = document.createElement("div");
  url.className = "tab-url";
  url.textContent = tab.url;

  info.appendChild(title);
  info.appendChild(url);

  row.appendChild(checkbox);
  row.appendChild(favicon);
  row.appendChild(info);

  return row;
}

function renderTabs() {
  tabListEl.innerHTML = "";
  if (searchInput) searchInput.value = "";

  if (tabs.length === 0) {
    tabListEl.innerHTML = '<div class="empty-state">No open tabs found.</div>';
    return;
  }

  const highlightedTabs = tabs.filter((tab) => tab.highlighted);
  const hasBrowserMultiSelection = highlightedTabs.length > 1;

  if (hasBrowserMultiSelection) {
    selectionBannerEl.classList.remove("hidden");
    selectionBannerEl.innerHTML = "";

    const text = document.createElement("span");
    text.textContent = `${highlightedTabs.length} tabs selected in browser — pre-checked below`;

    const clearBtn = document.createElement("button");
    clearBtn.className = "text-btn";
    clearBtn.textContent = "Clear";
    clearBtn.addEventListener("click", () => setAllChecked(false));

    selectionBannerEl.appendChild(text);
    selectionBannerEl.appendChild(clearBtn);
  } else {
    selectionBannerEl.classList.add("hidden");
  }

  const groupByDomain = groupToggleEl && groupToggleEl.checked;

  if (groupByDomain) {
    const groups = {};
    tabs.forEach((tab) => {
      const domain = getDomain(tab.url);
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(tab);
    });

    const sortedDomains = Object.keys(groups).sort();

    sortedDomains.forEach((domain) => {
      const domainTabs = groups[domain];

      const groupContainer = document.createElement("div");
      groupContainer.className = "domain-group";
      groupContainer.dataset.domain = domain;

      const header = document.createElement("div");
      header.className = "domain-group-header";

      const groupCheckbox = document.createElement("input");
      groupCheckbox.type = "checkbox";
      groupCheckbox.title = `Select all tabs under ${domain}`;
      
      const isAllGroupChecked = domainTabs.every((tab) => hasBrowserMultiSelection && tab.highlighted);
      groupCheckbox.checked = isAllGroupChecked;

      const titleText = document.createElement("span");
      titleText.className = "domain-title-text";
      titleText.textContent = `${domain} (${domainTabs.length})`;

      header.appendChild(groupCheckbox);
      header.appendChild(titleText);
      groupContainer.appendChild(header);

      const rowsContainer = document.createElement("div");
      rowsContainer.className = "domain-rows";

      const rowsList = [];

      domainTabs.forEach((tab) => {
        const row = createTabRow(tab, hasBrowserMultiSelection);
        rowsContainer.appendChild(row);
        rowsList.push(row);
      });

      groupContainer.appendChild(rowsContainer);
      tabListEl.appendChild(groupContainer);

      groupCheckbox.addEventListener("change", () => {
        const isChecked = groupCheckbox.checked;
        rowsList.forEach((row) => {
          if (!row.classList.contains("hidden")) {
            const cb = row.querySelector('input[type="checkbox"]');
            if (cb) {
              cb.checked = isChecked;
              if (isChecked) row.classList.add("selected");
              else row.classList.remove("selected");
            }
          }
        });
        updateFooter();
      });

      const updateGroupCb = () => {
        const visibleCbs = rowsList
          .filter((r) => !r.classList.contains("hidden"))
          .map((r) => r.querySelector('input[type="checkbox"]'))
          .filter(Boolean);
        
        const allChecked = visibleCbs.length > 0 && visibleCbs.every((c) => c.checked);
        groupCheckbox.checked = allChecked;
      };

      rowsList.forEach((row) => {
        const cb = row.querySelector('input[type="checkbox"]');
        if (cb) {
          cb.addEventListener("change", updateGroupCb);
        }
      });
      // Initial trigger
      updateGroupCb();
    });
  } else {
    tabs.forEach((tab) => {
      const row = createTabRow(tab, hasBrowserMultiSelection);
      tabListEl.appendChild(row);
    });
  }

  updateFooter();
}

async function loadTabs() {
  const allWindows = scopeToggleEl ? scopeToggleEl.checked : false;
  tabs = await chrome.tabs.query(allWindows ? {} : { currentWindow: true });
  renderTabs();
}

function setAllChecked(checked) {
  tabListEl.querySelectorAll('.tab-row:not(.hidden)').forEach((row) => {
    const cb = row.querySelector('input[type="checkbox"]');
    if (cb) {
      cb.checked = checked;
      if (checked) {
        row.classList.add("selected");
      } else {
        row.classList.remove("selected");
      }
    }
  });

  tabListEl.querySelectorAll('.domain-group:not(.hidden)').forEach((group) => {
    const groupCb = group.querySelector('.domain-group-header input[type="checkbox"]');
    if (groupCb) {
      groupCb.checked = checked;
    }
  });

  updateFooter();
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  setTimeout(() => {
    toastEl.classList.add("hidden");
  }, 1200);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

async function copySelectedUrls() {
  const checkboxes = Array.from(tabListEl.querySelectorAll('.tab-row input[type="checkbox"]'));
  const selectedIds = checkboxes.filter((cb) => cb.checked).map((cb) => Number(cb.dataset.tabId));

  const selectedTabsList = tabs.filter((tab) => selectedIds.includes(tab.id));

  if (selectedTabsList.length === 0) return;

  const format = formatSelectEl.value;
  let text = "";

  if (format === "markdown") {
    text = selectedTabsList.map((tab) => `[${tab.title || tab.url}](${tab.url})`).join("\n");
  } else if (format === "html") {
    text = selectedTabsList.map((tab) => `<a href="${tab.url}">${escapeHtml(tab.title || tab.url)}</a>`).join("\n");
  } else if (format === "json") {
    text = JSON.stringify(selectedTabsList.map((tab) => ({ title: tab.title, url: tab.url })), null, 2);
  } else {
    // Default to plain text
    text = selectedTabsList.map((tab) => tab.url).join("\n");
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast(`Copied ${selectedTabsList.length} URL${selectedTabsList.length > 1 ? "s" : ""}!`);
  } catch (err) {
    showToast("Copy failed");
    console.error("Clipboard write failed:", err);
  }
}

function exportSelectedUrls() {
  const checkboxes = Array.from(tabListEl.querySelectorAll('.tab-row input[type="checkbox"]'));
  const selectedIds = checkboxes.filter((cb) => cb.checked).map((cb) => Number(cb.dataset.tabId));

  const selectedTabsList = tabs.filter((tab) => selectedIds.includes(tab.id));

  if (selectedTabsList.length === 0) return;

  const format = formatSelectEl.value;
  let text = "";
  let fileExtension = "txt";
  let mimeType = "text/plain";

  if (format === "markdown") {
    text = selectedTabsList.map((tab) => `[${tab.title || tab.url}](${tab.url})`).join("\n");
    fileExtension = "md";
  } else if (format === "html") {
    text = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Exported Tabs</title>
  <style>
    body { font-family: -apple-system, sans-serif; padding: 20px; line-height: 1.6; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 8px; }
    a { color: #6366f1; text-decoration: none; font-weight: 500; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Exported Tabs</h1>
  <ul>
    ${selectedTabsList.map((tab) => `<li><a href="${tab.url}" target="_blank">${escapeHtml(tab.title || tab.url)}</a></li>`).join("\n    ")}
  </ul>
</body>
</html>`;
    fileExtension = "html";
    mimeType = "text/html";
  } else if (format === "json") {
    text = JSON.stringify(selectedTabsList.map((tab) => ({ title: tab.title, url: tab.url })), null, 2);
    fileExtension = "json";
    mimeType = "application/json";
  } else {
    text = selectedTabsList.map((tab) => tab.url).join("\n");
    fileExtension = "txt";
  }

  try {
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `tabs_export_${dateStr}.${fileExtension}`;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Exported successfully!");
  } catch (err) {
    showToast("Export failed");
    console.error("Export failed:", err);
  }
}

formatSelectEl.addEventListener("change", () => {
  localStorage.setItem("copy-format", formatSelectEl.value);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const isGrouped = groupToggleEl && groupToggleEl.checked;
  let totalVisibleCount = 0;

  if (isGrouped) {
    const groups = tabListEl.querySelectorAll(".domain-group");
    groups.forEach((group) => {
      const rows = group.querySelectorAll(".tab-row");
      let visibleGroupCount = 0;

      rows.forEach((row) => {
        const title = row.querySelector(".tab-title").textContent.toLowerCase();
        const url = row.querySelector(".tab-url").textContent.toLowerCase();
        
        if (title.includes(query) || url.includes(query)) {
          row.classList.remove("hidden");
          visibleGroupCount++;
          totalVisibleCount++;
        } else {
          row.classList.add("hidden");
        }
      });

      if (visibleGroupCount === 0) {
        group.classList.add("hidden");
      } else {
        group.classList.remove("hidden");
      }
    });
  } else {
    const rows = tabListEl.querySelectorAll(".tab-row");
    rows.forEach((row) => {
      const title = row.querySelector(".tab-title").textContent.toLowerCase();
      const url = row.querySelector(".tab-url").textContent.toLowerCase();
      
      if (title.includes(query) || url.includes(query)) {
        row.classList.remove("hidden");
        totalVisibleCount++;
      } else {
        row.classList.add("hidden");
      }
    });
  }

  // Handle empty state for search
  const allRowsCount = tabListEl.querySelectorAll(".tab-row").length;
  let filterEmptyEl = document.getElementById("filterEmptyState");
  if (totalVisibleCount === 0 && allRowsCount > 0) {
    if (!filterEmptyEl) {
      filterEmptyEl = document.createElement("div");
      filterEmptyEl.id = "filterEmptyState";
      filterEmptyEl.className = "empty-state";
      filterEmptyEl.textContent = "No matching tabs found.";
      tabListEl.appendChild(filterEmptyEl);
    } else {
      filterEmptyEl.classList.remove("hidden");
    }
  } else if (filterEmptyEl) {
    filterEmptyEl.classList.add("hidden");
  }
});

scopeToggleEl.addEventListener("change", () => {
  localStorage.setItem("copy-scope", scopeToggleEl.checked);
  loadTabs();
});

groupToggleEl.addEventListener("change", () => {
  localStorage.setItem("copy-group", groupToggleEl.checked);
  renderTabs();
});

selectAllBtn.addEventListener("click", () => setAllChecked(true));
selectNoneBtn.addEventListener("click", () => setAllChecked(false));
copyBtn.addEventListener("click", copySelectedUrls);
exportBtn.addEventListener("click", exportSelectedUrls);

document.addEventListener("DOMContentLoaded", () => {
  // Load saved format preference
  const savedFormat = localStorage.getItem("copy-format") || "text";
  formatSelectEl.value = savedFormat;

  // Load saved scope preference
  const savedScope = localStorage.getItem("copy-scope") === "true";
  scopeToggleEl.checked = savedScope;

  // Load saved group preference
  const savedGroup = localStorage.getItem("copy-group") === "true";
  groupToggleEl.checked = savedGroup;
  
  loadTabs();
});
