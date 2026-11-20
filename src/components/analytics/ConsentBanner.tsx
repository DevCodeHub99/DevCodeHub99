import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAnalyticsConsent, updateAnalyticsConsent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only display if user has not yet made a choice
    const consent = getAnalyticsConsent();
    if (consent === "pending") {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    updateAnalyticsConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    updateAnalyticsConsent(false);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          role="region"
          aria-label="Privacy and Analytics Consent"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-2xl text-foreground text-sm"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl" aria-hidden="true">🍪</span>
            <div className="space-y-2 flex-grow">
              <h4 className="font-semibold text-foreground text-sm">Privacy & Analytics</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                This site uses anonymous Google Analytics cookies to help improve visitor experience and understand recruiter engagement. No personal data is ever collected.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="rounded-full px-4 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground h-8"
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDecline}
                  className="rounded-full px-4 text-xs font-medium border-border hover:bg-muted text-muted-foreground hover:text-foreground h-8"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
