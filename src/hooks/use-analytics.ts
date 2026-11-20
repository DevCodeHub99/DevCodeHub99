import { useEffect, useRef } from "react";
import { trackPageView, trackScrollDepth, trackSectionView, trackEvent } from "@/lib/analytics";
import { throttle } from "@/lib/performance";

/**
 * Hook to automate SPA virtual pageviews, scroll depth milestones,
 * recruiter section visibility tracking, and UTM campaign parameters.
 */
export function useAnalytics(): void {
  const firedScrollMilestones = useRef<Set<number>>(new Set());
  const observedSections = useRef<Set<string>>(new Set());
  const lastHashRef = useRef<string>("");

  // 1. Initial Page View & UTM Parameter Tracking
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Capture UTM campaign parameters if present in URL
    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmContent = searchParams.get("utm_content");
    const utmTerm = searchParams.get("utm_term");

    if (utmSource || utmCampaign) {
      trackEvent("navigation_click", {
        link_name: "campaign_landing",
        link_url: window.location.href,
        navigation_location: "utm_campaign",
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
        utm_content: utmContent || undefined,
        utm_term: utmTerm || undefined,
      });
    }

    // Fire initial pageview
    const initialPath = window.location.pathname + (window.location.hash || "");
    trackPageView(initialPath, document.title);
    lastHashRef.current = window.location.hash;

    // Listen to hash changes (e.g., clicking on #projects, #contact)
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (currentHash !== lastHashRef.current) {
        lastHashRef.current = currentHash;
        const pagePath = window.location.pathname + (currentHash || "");
        trackPageView(pagePath, `${document.title} - ${currentHash.replace("#", "")}`);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // 2. Scroll Depth Milestone Tracking (25%, 50%, 75%, 90%)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const milestones = [25, 50, 75, 90];

    const checkScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollProgress = (window.scrollY / docHeight) * 100;
      const currentPath = window.location.pathname + (window.location.hash || "");

      for (const milestone of milestones) {
        if (scrollProgress >= milestone && !firedScrollMilestones.current.has(milestone)) {
          firedScrollMilestones.current.add(milestone);
          trackScrollDepth(milestone, currentPath);
        }
      }
    };

    const throttledScroll = throttle(checkScroll, 200);
    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  // 3. Section Visibility & Recruiter Engagement Tracking (IntersectionObserver)
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const sectionIds = [
      "hero",
      "about",
      "experience",
      "skills",
      "projects",
      "blog",
      "testimonials",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            const id = entry.target.id;
            if (id && !observedSections.current.has(id)) {
              observedSections.current.add(id);
              trackSectionView(id);
            }
          }
        });
      },
      {
        threshold: [0.4],
      }
    );

    // Observe each section element once rendered
    const timeout = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);
}
