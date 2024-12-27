import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 measurement ID

export const initGA = () => {
  try {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      testMode: false,
      gaOptions: {
        debug_mode: false
      }
    });
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
};

export const trackPageView = (path: string) => {
  try {
    ReactGA.send({ 
      hitType: "pageview", 
      page: path,
      title: document.title
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
  nonInteraction?: boolean
) => {
  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
      nonInteraction
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  try {
    trackEvent('Timing', `${category} - ${variable}`, label, value);
  } catch (error) {
    console.error('Failed to track timing:', error);
  }
};

export const trackException = (description: string, fatal: boolean = false) => {
  try {
    trackEvent('Exception', description, fatal ? 'Fatal' : 'Non-Fatal');
  } catch (error) {
    console.error('Failed to track exception:', error);
  }
};