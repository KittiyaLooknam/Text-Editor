const butInstall = document.getElementById('buttonInstall');
let deferredPrompt; // Store the deferred prompt

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default browser behavior
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    butInstall.style.display = 'block'; // Show the install button
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt !== undefined) {
        // Check if the deferred prompt is available
        if (deferredPrompt.prompt) {
            // Show the installation prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const choiceResult = await deferredPrompt.userChoice;
            // Reset the deferred prompt
            deferredPrompt = null;
            // Hide the install button since we only want to ask the user once
            butInstall.style.display = 'none';
        }
    }
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("New PWA installed!");
});