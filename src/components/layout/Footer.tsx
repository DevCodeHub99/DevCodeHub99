import { siteConfig, footerContent } from "@/config/site";
import { Heart, ChevronUp } from "@/lib/icons";
import { trackNavigation } from "@/lib/analytics";

export function Footer() {
  const scrollToTop = () => {
    trackNavigation({
      link_name: "back_to_top",
      link_url: "#top",
      navigation_location: "footer",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-border/50 bg-muted/30">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back to top button */}
          <div className="flex justify-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background/80 hover:bg-card hover:border-primary/40 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm cursor-pointer"
              aria-label="Back to top"
            >
              <ChevronUp className="w-3.5 h-3.5 text-primary" />
              <span>Back to Top</span>
            </button>
          </div>

          {/* Main copyright text */}
          <div className="text-center">
            <p className="text-foreground/90 font-medium mb-2">
              &copy; {new Date().getFullYear()} {siteConfig.name}
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {footerContent.copyright}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-border/50" />
            <Heart className="w-4 h-4 text-primary/60 animate-pulse" />
            <div className="h-px w-16 bg-border/50" />
          </div>

          {/* Secondary info */}
          <div className="space-y-3 text-center">
            <p className="text-muted-foreground text-sm">
              {footerContent.formspreeCredit}
            </p>
            <p className="text-muted-foreground/80 text-xs italic max-w-2xl mx-auto">
              {footerContent.devHumor}
            </p>
          </div>

          {/* Tagline */}
          <div className="pt-4 border-t border-border/30">
            <p className="text-center text-muted-foreground/60 text-xs font-medium tracking-wide">
              {footerContent.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
