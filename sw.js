self.addEventListener('push', function(event) {
    var data = {};
    try { data = event.data.json(); } catch(e) {}
    event.waitUntil(
        self.registration.showNotification(data.title || 'Control Tower', {
            body: data.body || '',
            data: { url: data.url || self.location.origin + '/control-tower/' }
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
