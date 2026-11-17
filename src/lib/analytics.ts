import { track as vercelTrack } from "@vercel/analytics";

/**
 * Universal Event Telemetry for Max Tracking
 * Supports Vercel Analytics, Google Analytics 4 (gtag), and PostHog
 */

export type AnalyticsEventName =
  | "resume_click"
  | "social_click"
  | "project_click"
  | "package_click"
  | "contact_click"
  | "contact_submit"
  | "nav_click"
  | "section_view"
  | "theme_toggle"
  | "view_more_click";

export type AnalyticsPropertyValue = string | number | boolean | null;
export type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

export interface AnalyticsEventParams {
  resume_click: {
    location: "navbar" | "hero" | "experience" | "footer" | "about";
    action: "download" | "view";
  };
  social_click: {
    platform: string;
    url: string;
    location?: string;
  };
  project_click: {
    project: string;
    type: "demo" | "github";
    url: string;
  };
  package_click: {
    package: string;
    type: "npm" | "github";
    url: string;
  };
  contact_click: {
    channel: "email" | "phone" | "form";
    value?: string;
  };
  contact_submit: {
    status: "attempt" | "success" | "error";
    error?: string;
  };
  nav_click: {
    section: string;
  };
  section_view: {
    section: string;
  };
  theme_toggle: {
    theme: string;
  };
  view_more_click: {
    section: "projects" | "blog";
    action: "expand" | "collapse" | "redirect";
    target?: string;
  };
}

// Global window declarations for third-party trackers
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    posthog?: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Track an event across all active telemetry channels
 */
export function trackEvent<E extends AnalyticsEventName>(
  eventName: E,
  properties: AnalyticsEventParams[E]
): void {
  const payload = properties as unknown as AnalyticsProperties;

  // 1. Vercel Analytics
  try {
    vercelTrack(eventName, payload);
  } catch {
    // Vercel analytics graceful skip
  }

  // 2. Google Tag Manager / Google Analytics 4 (dataLayer & gtag)
  if (typeof window !== "undefined") {
    try {
      const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
      if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push({
          event: eventName,
          ...(payload as Record<string, unknown>),
        });
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, payload as Record<string, unknown>);
      }
    } catch (e) {
      console.warn("GTM/GA4 event tracking failed", e);
    }
  }

  // 3. PostHog (if initialized)
  if (typeof window !== "undefined" && window.posthog?.capture) {
    try {
      window.posthog.capture(eventName, payload as Record<string, unknown>);
    } catch (e) {
      console.warn("PostHog event tracking failed", e);
    }
  }

  // 4. Developer logging in development mode
  if (import.meta.env.DEV) {
    console.log(`[📊 Analytics Event] ${eventName}:`, payload);
  }
}

/**
 * Initialize Analytics providers (Google Tag Manager or GA4 if defined)
 */
export function initAnalytics(): void {
  const gaId = import.meta.env.VITE_GTM_ID || import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (typeof window !== "undefined") {
    const win = window as unknown as { dataLayer?: unknown[]; gtag?: unknown };
    win.dataLayer = win.dataLayer || [];
    if (!win.gtag) {
      win.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        (win.dataLayer as unknown[]).push(arguments);
      };
    }

    if (gaId) {
      const alreadyLoaded = document.querySelector(`script[src*="${gaId}"]`);
      if (!alreadyLoaded) {
        const isGtm = gaId.startsWith("GTM-");
        const script = document.createElement("script");
        script.src = isGtm
          ? `https://www.googletagmanager.com/gtm.js?id=${gaId}`
          : `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.async = true;
        document.head.appendChild(script);

        if (!isGtm && typeof window.gtag === "function") {
          window.gtag("js", new Date());
          window.gtag("config", gaId);
        }
      }
    }
  }
}
