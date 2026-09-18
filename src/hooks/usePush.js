import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function usePush() {
  const { authHeaders } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);
  const [vapidPublicKey, setVapidPublicKey] = useState('');

  useEffect(() => {
    // Fetch VAPID public key from backend
    fetch('/api/alerts/vapidPublicKey')
      .then((r) => r.json())
      .then((data) => setVapidPublicKey(data.publicKey))
      .catch(console.error);
  }, []);

  const subscribe = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    const registration = await navigator.serviceWorker.ready;
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
    await fetch('/api/alerts/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify(sub),
    });
    setSubscription(sub);
  };

  // Utility to convert VAPID key
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return { subscription, subscribe };
}
