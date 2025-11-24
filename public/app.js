const publicVapidKey = 'BHRVIb_laKbPLditm4OYseSZB3wwjwvaBhRGYSWnjNKYlje8H7uDeyTVGzJpqRXZzy9HRPAXRDbDMBj_aUIHmes';

const subscribeBtn = document.getElementById('subscribe-btn');
const triggerBtn = document.getElementById('trigger-btn');
const alertControls = document.getElementById('alert-controls');

if ('serviceWorker' in navigator) {
    subscribeBtn.addEventListener('click', () => {
        registerServiceWorker().catch(err => console.error(err));
    });
}

async function registerServiceWorker() {
    console.log('Registering Service Worker...');
    const register = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
    });
    console.log('Service Worker Registered...');

    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registered...');

    console.log('Sending Push...');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Sent...');

    subscribeBtn.style.display = 'none';
    alertControls.style.display = 'block';
}

triggerBtn.addEventListener('click', async () => {
    await fetch('/trigger-alert', {
        method: 'POST'
    });
    alert('Alerta enviada!');
});

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
