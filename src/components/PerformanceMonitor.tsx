import { useEffect } from 'react';
import { trackTiming, trackException } from '@/utils/analytics';

export const PerformanceMonitor = () => {
  useEffect(() => {
    try {
      // Monitor page load performance
      if (window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          trackTiming(
            'Page Load',
            'DOM Complete',
            Math.round(navigation.domComplete)
          );
          
          trackTiming(
            'Page Load',
            'First Contentful Paint',
            Math.round(navigation.responseStart)
          );
        }

        // Monitor long tasks
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) { // Tasks longer than 50ms
              trackTiming(
                'Long Task',
                'Duration',
                Math.round(entry.duration),
                entry.name
              );
            }
          });
        });

        observer.observe({ entryTypes: ['longtask'] });

        // Monitor frame rate
        let lastTime = performance.now();
        let frames = 0;
        const measureFrameRate = () => {
          frames++;
          const currentTime = performance.now();
          if (currentTime - lastTime > 1000) {
            const fps = Math.round((frames * 1000) / (currentTime - lastTime));
            trackTiming('Performance', 'FPS', fps);
            frames = 0;
            lastTime = currentTime;
          }
          requestAnimationFrame(measureFrameRate);
        };
        requestAnimationFrame(measureFrameRate);
      }
    } catch (error) {
      trackException(`Performance monitoring error: ${error}`);
      console.error('Performance monitoring error:', error);
    }
  }, []);

  return null;
};