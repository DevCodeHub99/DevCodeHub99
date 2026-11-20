import { track as vercelTrack } from "@vercel/analytics";

/**
 * Universal Production Google Analytics 4 (GA4) & Telemetry System
 * Single Source of Truth for portfolio tracking.
 * Measurement ID is loaded exclusively via environment variable: VITE_PUBLIC_GA_ID
 */

// Window augmentation for Google tag (gtag.js)
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event" | "config" | "js" | "consent" | "set",
      targetOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

export type ConsentStatus = "granted" | "denied" | "pending";
const CONSENT_STORAGE_KEY = "analytics_consent";

/**
 * Retrieve the configured GA4 Measurement ID from environment
 */
export function getGaId(): string {
  const gaId = import.meta.env.VITE_PUBLIC_GA_ID;
  if (typeof gaId === "string" && gaId.trim().startsWith("G-") && gaId.trim() !== "G-XXXXXXXXXX") {
    return gaId.trim();
  }
  return "";
}

/**
 * Get current analytics consent state
 */
export function getAnalyticsConsent(): ConsentStatus {
  if (typeof window === "undefined") return "pending";
  const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (stored === "granted" || stored === "denied") return stored;
  return "pending";
}

/**
 * Update Google Consent Mode v2 status
 */
export function updateAnalyticsConsent(granted: boolean): void {
  const status: ConsentStatus = granted ? "granted" : "denied";
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, status);
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: status,
        });
      }
      if (import.meta.env.DEV) {
        console.log(`[🔒 Analytics Consent] Updated to: ${status}`);
      }
    } catch (e) {
      console.warn("Failed to update analytics consent", e);
    }
  }
}

/**
 * Core event names supported across telemetry
 */
export type AnalyticsEventName =
  | "page_view"
  | "navigation_click"
  | "resume_click"
  | "file_download"
  | "document_preview"
  | "social_link_click"
  | "project_click"
  | "project_view"
  | "contact_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "generate_lead"
  | "skill_click"
  | "article_click"
  | "theme_toggle"
  | "scroll_depth"
  | "section_view"
  | "view_more_click";

export type EventParamValue = string | number | boolean | null | undefined;
export type EventParams = Record<string, EventParamValue>;

/**
 * Generic event tracker dispatcher
 * Dispatches safely to GA4 (gtag) and Vercel Analytics.
 */
export function trackEvent(eventName: AnalyticsEventName, params: EventParams = {}): void {
  // 1. Sanitize payload (strip undefined/null, ensure no PII)
  const cleanParams: Record<string, string | number | boolean> = {};
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== null) {
      cleanParams[key] = val;
    }
  }

  // 2. Dispatch to GA4 via window.gtag
  if (typeof window !== "undefined") {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, cleanParams);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: eventName,
          ...cleanParams,
        });
      }
    } catch {
      // Graceful fallback if ad-blocker or script error occurs
    }
  }

  // 3. Dispatch to Vercel Analytics (swallows silently if blocked)
  try {
    vercelTrack(eventName, cleanParams);
  } catch {
    // Vercel analytics graceful skip
  }

  // 4. Console audit log in development
  if (import.meta.env.DEV) {
    console.log(`[📊 GA4 Event] ${eventName}:`, cleanParams);
  }
}

/**
 * Helper: Track Virtual & Section Pageviews for SPA
 */
export function trackPageView(page_path: string, page_title?: string): void {
  if (typeof window === "undefined") return;

  const path = page_path.startsWith("/") ? page_path : `/${page_path}`;
  const title = page_title || document.title;
  const location = window.location.href;

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: location,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[📄 GA4 PageView] path: ${path} | title: ${title}`);
  }
}

/**
 * Helper: Track Navigation clicks
 */
export function trackNavigation(params: {
  link_name: string;
  link_url: string;
  navigation_location: "header" | "footer" | "mobile_menu" | "hero";
}): void {
  trackEvent("navigation_click", {
    link_name: params.link_name,
    link_url: params.link_url,
    navigation_location: params.navigation_location,
  });
}

/**
 * Helper: Track Resume interactions (downloads and online preview)
 */
export function trackResume(params: {
  action: "download" | "view";
  placement: string;
  document_url?: string;
  document_name?: string;
}): void {
  const docUrl = params.document_url || "/resume.pdf";
  const docName = params.document_name || "Vikas_Kumar_full_stack_resume.pdf";

  trackEvent("resume_click", {
    document_name: docName,
    document_type: "pdf",
    document_url: docUrl,
    action: params.action,
    placement: params.placement,
  });

  if (params.action === "download") {
    trackEvent("file_download", {
      file_name: docName,
      file_extension: "pdf",
      link_url: docUrl,
      placement: params.placement,
    });
  } else {
    trackEvent("document_preview", {
      document_name: docName,
      document_url: docUrl,
      placement: params.placement,
    });
  }
}

/**
 * Helper: Track Social profile clicks
 */
export function trackSocialLink(params: {
  platform: string;
  profile_url: string;
  placement: string;
}): void {
  trackEvent("social_link_click", {
    platform: params.platform,
    profile_url: params.profile_url,
    placement: params.placement,
    link_type: "external_profile",
  });
}

/**
 * Helper: Track Project interactions (demo, github, npm)
 */
export function trackProject(params: {
  project_name: string;
  destination_type: "demo" | "github" | "npm";
  project_url: string;
  placement: string;
}): void {
  trackEvent("project_click", {
    project_name: params.project_name,
    destination_type: params.destination_type,
    project_url: params.project_url,
    placement: params.placement,
  });
}

/**
 * Helper: Track Direct Contact Channel clicks (email, location, etc.)
 */
export function trackContactClick(params: {
  channel: "email" | "location" | "social";
  placement: string;
}): void {
  trackEvent("contact_click", {
    channel: params.channel,
    placement: params.placement,
  });
}

/**
 * Helper: Track Contact Form engagement start
 */
export function trackFormStart(form_name = "contact_form"): void {
  trackEvent("form_start", {
    form_id: form_name,
    form_name,
  });
}

/**
 * Helper: Track Form validation errors (Zero PII - only field identifier)
 */
export function trackFormError(form_name: string, error_field: string): void {
  trackEvent("form_error", {
    form_id: form_name,
    error_type: `validation_${error_field}`,
  });
}

/**
 * Helper: Track Verified Form Submission / Lead Generation
 * Fired strictly upon successful HTTP 200 response from Formspree
 */
export function trackFormSuccess(form_name = "contact_form"): void {
  trackEvent("form_submit", {
    form_id: form_name,
    status: "success",
  });
  // GA4 Key Conversion Event
  trackEvent("generate_lead", {
    form_id: form_name,
    form_name,
    lead_source: "portfolio_contact_form",
  });
}

/**
 * Helper: Track Scroll Depth milestones (25%, 50%, 75%, 90%)
 */
export function trackScrollDepth(percent: number, page_path: string): void {
  trackEvent("scroll_depth", {
    percent_scrolled: percent,
    page_path,
  });
}

/**
 * Helper: Track Section Dwell & Visibility
 */
export function trackSectionView(section_name: string): void {
  trackEvent("section_view", {
    section_name,
  });
}

/**
 * Helper: Track Skill Card interactions
 */
export function trackSkill(skill_name: string, category: string): void {
  trackEvent("skill_click", {
    skill_name,
    category,
  });
}

/**
 * Helper: Track DEV.to Article clicks
 */
export function trackArticleClick(params: {
  article_title: string;
  article_url: string;
  placement: string;
}): void {
  trackEvent("article_click", {
    article_title: params.article_title,
    article_url: params.article_url,
    placement: params.placement,
  });
}

/**
 * Helper: Track Theme toggle
 */
export function trackThemeToggle(theme: "light" | "dark"): void {
  trackEvent("theme_toggle", {
    theme,
  });
}

/**
 * Helper: Track View More toggles
 */
export function trackViewMore(params: {
  section: "projects" | "blog";
  action: "expand" | "collapse" | "redirect";
  target?: string;
}): void {
  trackEvent("view_more_click", {
    section: params.section,
    action: params.action,
    target: params.target || "",
  });
}

/**
 * Helper: General link tracking utility
 */
export function trackLink(options: {
  name: string;
  url: string;
  type: "internal" | "external" | "download";
  placement: string;
}): void {
  trackEvent("navigation_click", {
    link_name: options.name,
    link_url: options.url,
    navigation_location: options.placement,
    link_type: options.type,
  });
}

/**
 * Initialize Analytics providers
 * Loads gtag.js if a valid VITE_PUBLIC_GA_ID is set and not already present.
 */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;

  const gaId = getGaId();

  // Initialize dataLayer and window.gtag
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  // Restore existing user consent choice if present
  const storedConsent = getAnalyticsConsent();
  if (storedConsent === "granted") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }

  // Inject gtag.js script if GA Measurement ID is present and script is not already loaded
  if (gaId) {
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);
    }

    // Configure GA4 with send_page_view: false (managed by SPA router)
    window.gtag("js", new Date());
    window.gtag("config", gaId, {
      send_page_view: false,
      restricted_data_processing: true,
      cookie_flags: "SameSite=None;Secure",
    });

    if (import.meta.env.DEV) {
      console.log(`[🚀 GA4 Initialized] Measurement ID: ${gaId}`);
    }
  } else if (import.meta.env.DEV) {
    console.log("[ℹ️ GA4 Standby] VITE_PUBLIC_GA_ID not provided or placeholder. Events will log to console.");
  }
}
