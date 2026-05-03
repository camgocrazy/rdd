/* RDD Modified - Custom Downloader Version 
    Cleaned & Fixed for GitHub Pages
*/

const consoleText = document.getElementById("consoleText");
const downloadFormDiv = document.getElementById("downloadFormDiv");

// Helper to log messages to the on-screen console
function log(msg = "", end = "\n", autoScroll = true) {
    if (consoleText) {
        consoleText.innerHTML += msg + end;
        if (autoScroll) window.scrollTo({ top: document.body.scrollHeight });
    } else {
        console.log(msg); // Fallback to browser console
    }
}

// Function to trigger the actual download
function downloadBinaryFile(fileName, data, mimeType = "application/zip") {
    const blob = new Blob([data], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href); // Clean up memory
}

/* =========================
   MAIN OVERRIDE LOGIC
   ========================= */

function main() {
    // If no query params, show the UI/Form
    if (window.location.search === "") {
        if (downloadFormDiv) downloadFormDiv.hidden = false;
        log("[*] Custom Downloader Ready\n", "", false);
        return;
    }

    log("[+] Starting custom download process...");
    log("[+] Initializing file request...");

    // Delay to simulate the "work" being done
    setTimeout(() => {
        log("[+] Fetching specific package...");
        
        // Exact filename from your GitHub root
        const fileName = "LIVE-WindowsPlayer-version-acc4b74f79e743b9.zip";
        
        // Use a relative path to the root of your site
        fetch("./" + fileName)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server responded with ${res.status}. Check if the file is actually uploaded to GitHub.`);
                }
                return res.arrayBuffer();
            })
            .then(data => {
                log("[+] File received. Finalizing...");
                downloadBinaryFile(fileName, data);
                log("[+] Done! Download started.");
            })
            .catch(err => {
                log("[!] Error: " + err.message);
                console.error(err);
            });

    }, 2000);
}

// Replace the bottom part of your rdd.js with this:
function downloadFromForm(event) {
    // If the browser passes an event, stop the page from refreshing
    if (event) event.preventDefault();
    
    // Add a query param to the URL and run main
    if (window.location.search === "") {
        window.history.pushState({}, '', '?channel=LIVE');
    }
    
    main(); 
}

// Make absolutely sure the button can find the function
window.downloadFromForm = downloadFromForm;

// Run main on load in case there are already URL parameters
window.onload = main;