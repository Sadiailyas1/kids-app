// Register the service worker so the app works offline once installed.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

// --- "Add to Home Screen" prompt handling ---
let deferredInstallPrompt = null;
const installBanner = document.getElementById("installBanner");
const installBtn = document.getElementById("installBtn");
const dismissBtn = document.getElementById("dismissBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installBanner) installBanner.classList.add("visible");
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBanner.classList.remove("visible");
  });
}

if (dismissBtn) {
  dismissBtn.addEventListener("click", () => {
    installBanner.classList.remove("visible");
  });
}

// --- Track which worksheets a child has completed (stored on-device) ---
function getDoneList() {
  try {
    return JSON.parse(localStorage.getItem("done-worksheets") || "[]");
  } catch {
    return [];
  }
}

function markCardsDone() {
  const done = getDoneList();
  document.querySelectorAll(".card[data-id]").forEach((card) => {
    if (done.includes(card.dataset.id)) card.classList.add("done");
  });
}
markCardsDone();

// Used on individual worksheet pages
function setupDoneButton(worksheetId) {
  const btn = document.getElementById("doneBtn");
  if (!btn) return;
  const done = getDoneList();
  if (done.includes(worksheetId)) {
    btn.textContent = "Marked as done ✔";
    btn.classList.add("is-done");
  }
  btn.addEventListener("click", () => {
    const list = getDoneList();
    if (!list.includes(worksheetId)) {
      list.push(worksheetId);
      localStorage.setItem("done-worksheets", JSON.stringify(list));
    }
    btn.textContent = "Marked as done ✔";
    btn.classList.add("is-done");
  });
}
