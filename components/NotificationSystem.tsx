"use client"

import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Listen for notification events
    const handleNotification = (event: CustomEvent<Notification>) => {
      const notification = {
        ...event.detail,
        id: Date.now().toString(),
        duration: event.detail.duration || 5000
      };
      
      setNotifications(prev => [...prev, notification]);
      
      // Auto remove after duration
      setTimeout(() => {
        removeNotification(notification.id);
      }, notification.duration);
    };

    window.addEventListener('showNotification' as any, handleNotification);
    
    return () => {
      window.removeEventListener('showNotification' as any, handleNotification);
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationStyles = (type: string) => {
    const styles = {
      success: 'bg-green-100 border-green-500 text-green-800',
      error: 'bg-red-100 border-red-500 text-red-800',
      warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
      info: 'bg-blue-100 border-blue-500 text-blue-800'
    };
    return styles[type as keyof typeof styles] || styles.info;
  };

  const getIcon = (type: string) => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type as keyof typeof icons] || '📢';
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border-l-4 shadow-lg transform transition-all duration-300 ease-in-out ${getNotificationStyles(notification.type)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <span className="text-lg">{getIcon(notification.type)}</span>
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm mt-1">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to show notifications from anywhere in the app
export const showNotification = (notification: Omit<Notification, 'id'>) => {
  const event = new CustomEvent('showNotification', { detail: notification });
  window.dispatchEvent(event);
};

export default NotificationSystem;