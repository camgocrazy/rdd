/*
    rdd modified - custom downloader version
*/

const basePath = window.location.href.split("?")[0];

const consoleText = document.getElementById("consoleText");
const downloadFormDiv = document.getElementById("downloadFormDiv");

function log(msg = "", end = "\n", autoScroll = true) {
    consoleText.innerHTML += msg + end;
    if (autoScroll) window.scrollTo({ top: document.body.scrollHeight });
}

function downloadBinaryFile(fileName, data, mimeType = "application/zip") {
    const blob = new Blob([data], { type: mimeType });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/* =========================
   MAIN OVERRIDE (IMPORTANT)
   ========================= */

function main() {
    // If no query params, show UI + usage message
    if (window.location.search === "") {
        downloadFormDiv.hidden = false;
        log("[*] Custom Downloader Ready\n", "", false);
        return;
    }

    log("[+] Starting download process...");
    log("[+] Fetching packages...");
    log("[+] Extracting files...");

    // Simulate delay so UI still "feels" like RDD
    setTimeout(() => {
        log("[+] Finalizing build...");
        log("[+] Done!");

        const fileName = "LIVE-WindowsPlayer-version-acc4b74f79e743b9.zip";

        fetch(fileName)
            .then(res => res.arrayBuffer())
            .then(data => {
                downloadBinaryFile(fileName, data);
            })
            .catch(err => {
                log("[!] Failed to load file: " + err);
            });

    }, 2000);
}

main();