import { motion } from "framer-motion";
import { Section } from "@/components/layout";
import { experiences, siteConfig } from "@/config/site";
import { Briefcase, MapPin, Calendar, ExternalLink, Download, Eye } from "@/lib/icons";
import { trackResume, trackLink, trackSkill } from "@/lib/analytics";

export function Experience() {
  const handleResumeDownload = () => {
    trackResume({
      action: "download",
      placement: "experience_banner",
      document_url: siteConfig.resumeUrl,
      document_name: siteConfig.resumeDownloadName,
    });
  };

  const handleResumeView = () => {
    trackResume({
      action: "view",
      placement: "experience_banner",
      document_url: siteConfig.resumeUrl,
      document_name: siteConfig.resumeDownloadName,
    });
  };

  return (
    <Section id="experience" subtitle="Career Journey" title="Professional Experience">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Experience Timeline */}
        <div className="relative border-l-2 border-primary/20 pl-6 md:pl-8 space-y-10 ml-2 md:ml-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:scale-125 group-hover:bg-primary transition-all duration-300" />

              {/* Card Container */}
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-border/60 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-primary font-medium">
                      <span>{exp.company}</span>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackLink({
                              name: exp.company,
                              url: exp.companyUrl!,
                              type: "external",
                              placement: "experience_company_link",
                            })
                          }
                          className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                          aria-label={`Visit ${exp.company}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border/40">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 animate-pulse">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{exp.location}</span>
                </div>

                {/* Description Bullets */}
                <ul className="space-y-2 mb-6">
                  {exp.description.map((point, i) => (
                    <li key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed flex items-start gap-2.5">
                      <span className="text-primary mt-1.5 text-xs">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
                  {exp.skills.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => trackSkill(skill, "experience_timeline")}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted/60 text-foreground/80 border border-border/30 hover:border-primary/40 hover:text-primary transition-colors cursor-pointer text-left"
                      aria-label={`Skill: ${skill}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resume Quick Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6 mt-12"
        >
          <div>
            <h4 className="text-lg md:text-xl font-bold text-foreground mb-1">
              Want the full timeline & technical credentials?
            </h4>
            <p className="text-sm text-muted-foreground">
              Download my official one-page resume or preview it directly in your browser.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeView}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition-all duration-200 hover:scale-105"
            >
              <Eye className="w-4 h-4 text-muted-foreground" />
              View Online
            </a>
            <a
              href={siteConfig.resumeUrl}
              download={siteConfig.resumeDownloadName}
              onClick={handleResumeDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition-all duration-200 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
