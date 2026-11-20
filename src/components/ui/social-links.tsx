import { getIcon } from "@/lib/icons";
import type { SocialLink } from "@/types";
import { trackSocialLink } from "@/lib/analytics";

interface SocialLinksProps {
  links: SocialLink[];
  size?: string;
  className?: string;
  location?: string;
}

export function SocialLinks({ links, size = "w-6 h-6", className = "", location = "general" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-6 text-muted-foreground ${className}`}>
      {links.map((link) => {
        const Icon = getIcon(link.icon);
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackSocialLink({
                platform: link.name,
                profile_url: link.url,
                placement: location,
              })
            }
            className="hover:text-foreground hover:scale-110 transition-all"
            aria-label={link.ariaLabel}
          >
            <Icon className={size} />
          </a>
        );
      })}
    </div>
  );
}
