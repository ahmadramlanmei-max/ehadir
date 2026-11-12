const APP_URL = 'https://ahmadramlanmei-max.github.io/ehadir/';
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) { data = { body: event.data ? event.data.text() : '' }; }
  const title = data.title || 'Notifikasi E-Hadir';
  const options = { body: data.body || 'Ada informasi kehadiran anak.', icon: './favicon.ico', badge: './favicon.ico', tag: 'ehadir-attendance-' + (data.tag || Date.now()), renotify: false, data: { url: data.url || APP_URL } };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL(event.notification.data && event.notification.data.url || APP_URL, self.location.origin).href;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const client of list) { if ('focus' in client && client.url.startsWith(self.location.origin)) return client.focus().then(c => { if ('navigate' in c) return c.navigate(target); }); }
    return clients.openWindow(target);
  }));
});
