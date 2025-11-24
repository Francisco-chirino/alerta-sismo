console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Recieved...');
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'https://img.icons8.com/color/48/000000/earthquakes.png' // Example icon
    });
});
