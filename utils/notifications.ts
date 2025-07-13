// Optimized notification system with haptic feedback and visual effects

interface NotificationOptions {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  haptic?: boolean;
}

class NotificationManager {
  private container: HTMLElement | null = null;
  private activeNotifications: Set<string> = new Set();

  constructor() {
    this.initContainer();
  }

  private initContainer() {
    if (typeof window === 'undefined') return;
    
    this.container = document.createElement('div');
    this.container.className = 'fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none';
    this.container.style.transform = 'translateZ(0)';
    document.body.appendChild(this.container);
  }

  private triggerHaptic(pattern: number[] = [100]) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  private createNotificationElement(options: NotificationOptions): HTMLElement {
    const { title, message, type, duration = 4000, haptic = true } = options;
    const id = `notification-${Date.now()}-${Math.random()}`;
    
    const notification = document.createElement('div');
    notification.id = id;
    notification.className = `
      glass rounded-xl p-4 min-w-[300px] max-w-[400px] pointer-events-auto
      transform transition-all duration-300 ease-out
      translate-x-full opacity-0 scale-95
      hover:scale-105 cursor-pointer
      ${type === 'success' ? 'border-l-4 border-green-400' : ''}
      ${type === 'error' ? 'border-l-4 border-red-400' : ''}
      ${type === 'warning' ? 'border-l-4 border-yellow-400' : ''}
      ${type === 'info' ? 'border-l-4 border-blue-400' : ''}
    `;

    const icon = this.getIcon(type);
    const color = this.getColor(type);

    notification.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${color} animate-pulse">
          ${icon}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-white font-semibold text-sm">${title}</h4>
          <p class="text-gray-300 text-sm mt-1">${message}</p>
        </div>
        <button class="flex-shrink-0 text-gray-400 hover:text-white transition-colors ml-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    // Add event listeners
    const closeBtn = notification.querySelector('button');
    closeBtn?.addEventListener('click', () => this.removeNotification(id));
    
    notification.addEventListener('click', () => this.removeNotification(id));

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.remove('translate-x-full', 'opacity-0', 'scale-95');
      notification.classList.add('translate-x-0', 'opacity-100', 'scale-100');
    });

    // Auto remove
    setTimeout(() => this.removeNotification(id), duration);

    // Haptic feedback
    if (haptic) {
      this.triggerHaptic(type === 'error' ? [100, 50, 100] : [100]);
    }

    this.activeNotifications.add(id);
    return notification;
  }

  private getIcon(type: string): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  }

  private getColor(type: string): string {
    switch (type) {
      case 'success': return 'bg-green-500/20';
      case 'error': return 'bg-red-500/20';
      case 'warning': return 'bg-yellow-500/20';
      case 'info': return 'bg-blue-500/20';
      default: return 'bg-gray-500/20';
    }
  }

  private removeNotification(id: string) {
    const notification = document.getElementById(id);
    if (notification && this.activeNotifications.has(id)) {
      notification.classList.add('translate-x-full', 'opacity-0', 'scale-95');
      
      setTimeout(() => {
        notification.remove();
        this.activeNotifications.delete(id);
      }, 300);
    }
  }

  show(options: NotificationOptions) {
    if (!this.container) return;
    
    const notification = this.createNotificationElement(options);
    this.container.appendChild(notification);
  }

  success(title: string, message: string, options?: Partial<NotificationOptions>) {
    this.show({ title, message, type: 'success', ...options });
  }

  error(title: string, message: string, options?: Partial<NotificationOptions>) {
    this.show({ title, message, type: 'error', ...options });
  }

  warning(title: string, message: string, options?: Partial<NotificationOptions>) {
    this.show({ title, message, type: 'warning', ...options });
  }

  info(title: string, message: string, options?: Partial<NotificationOptions>) {
    this.show({ title, message, type: 'info', ...options });
  }

  clear() {
    this.activeNotifications.forEach(id => this.removeNotification(id));
  }
}

// Global notification manager instance
const notificationManager = new NotificationManager();

// Optimized notification methods for immediate use
export const notifications = {
  objectSpawned: () => notificationManager.success(
    '🎉 Object Created',
    'New object spawned successfully in your realm!'
  ),
  
  realmSaved: () => notificationManager.success(
    '💾 Realm Saved',
    'Your immersive world has been saved to the cloud.'
  ),
  
  realmPublished: () => notificationManager.success(
    '🌍 Realm Published',
    'Your realm is now live and discoverable!'
  ),
  
  copilotLaunched: () => notificationManager.info(
    '🤖 AI Copilot',
    'Your AI assistant is ready to help build your world.'
  ),
  
  vrPreview: () => notificationManager.info(
    '🥽 VR Preview',
    'Launching immersive preview mode...'
  ),
  
  assetUploaded: (filename: string) => notificationManager.success(
    '📦 Asset Uploaded',
    `${filename} has been processed and added to your library.`
  ),
  
  error: (message: string) => notificationManager.error(
    '❌ Error',
    message
  ),
  
  custom: (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => 
    notificationManager.show({ title, message, type })
};

export default notificationManager;