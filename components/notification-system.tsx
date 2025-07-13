'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X, Zap } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'system';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

let notificationId = 0;

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${++notificationId}`;
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Expose the addNotification function globally
  useEffect(() => {
    (window as any).showNotification = addNotification;
  }, []);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'info': return <Info className="h-5 w-5 text-blue-400" />;
      case 'system': return <Zap className="h-5 w-5 text-purple-400" />;
    }
  };

  const getStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-500/20 border-green-500/50';
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/50';
      case 'info': return 'bg-blue-500/20 border-blue-500/50';
      case 'system': return 'bg-purple-500/20 border-purple-500/50';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`backdrop-blur-md border rounded-xl p-4 text-white shadow-lg transform transition-all duration-300 ease-out ${
            getStyles(notification.type)
          }`}
          style={{
            animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
          }}
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{notification.title}</h4>
              <p className="text-sm opacity-90 mt-1">{notification.message}</p>
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="mt-2 text-xs font-medium hover:underline opacity-80 hover:opacity-100"
                >
                  {notification.action.label}
                </button>
              )}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}