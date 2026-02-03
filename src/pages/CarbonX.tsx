import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import ResponsiveParticles from "@/components/ResponsiveParticles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const carbonX = {
  eventName: "CARBONX",
  year: "2026",
  tagline: "INNOVATION BEYOND BOUNDARIES",
  prizeAmount: "₹1,00,000",
  prizeCaption: "PRIZE POOL",
  prizeHelper: "Prizes worth Rs. 1 Lakh per Track",
  description:
    "A 42 hour national hackathon where developers, innovators, and students from across India team up to build practical, high-impact solutions. The event brings together industry experts, mentors, and tech enthusiasts in a round-the-clock marathon of problem-solving, prototyping, and pure chaos-powered innovation.",
  date: "6–8 MARCH, 2026",
  city: "KOCHI",
  organizer:
    "Organized by Department of Electronics and Communication Engineering, Rajagiri School of Engineering & Technology (Autonomous)",
  stats: [
    { label: "DURATION", value: "42 hours" },
    { label: "PARTICIPANTS", value: "250+ expected" },
    { label: "VISITORS", value: "3000+ expected" },
  ],
  chips: ["42 hours", "250+ participants", "3000+ visitors", "National hackathon"],
  aboutCards: [
    {
      title: "A 42-hour build marathon",
      body: "A 42 hour national hackathon where teams build practical, high-impact solutions.",
    },
    {
      title: "Who it’s for",
      body: "Developers, innovators, and students from across India.",
    },
    {
      title: "The vibe",
      body: "Round-the-clock problem-solving, prototyping, and chaos-powered innovation — with mentors and industry experts.",
    },
  ],
  experience: [
    {
      title: "Build Sprint (42 hours)",
      items: ["Team up", "Build", "Prototype", "Iterate"],
    },
    {
      title: "Mentors & Experts",
      items: ["Industry experts", "Mentorship", "Guidance"],
    },
    {
      title: "Prototype & Present",
      body: "Turn ideas into practical demos and present outcomes.",
    },
  ],
  tracks: [
    {
      title: "Vegathon",
      description: "Sustainability, climate, and impact-driven builds.",
    },
    {
      title: "Electrothon (EDA Based)",
      description: "Electronics / EDA-based innovation track.",
    },
    {
      title: "Wildcard",
      description: "Coming soon.",
      comingSoon: true,
    },
  ],
  whyItMatters: [
    "Direct access to skilled participants",
    "Early hiring pipeline",
    "Product exposure",
    "Data & insights",
    "Brand presence where it counts",
  ],
  partnershipOptions: [
    {
      title: "Technical Support",
      description: "Provision of hardware kits, software packages and licenses.",
    },
    {
      title: "Technical Contribution",
      description: "Mentorship and guidance from company experts.",
    },
    {
      title: "Track Sponsors",
      description: "Exclusive association with individual hackathon tracks.",
    },
    {
      title: "Equipment Sponsors",
      description: "Provide boards, kits or licenses.",
    },
    {
      title: "Prize Sponsors",
      description: "Fund prizes or provide merchandise.",
    },
    {
      title: "Food & Logistics Sponsors",
      description: "Provide meals, snacks and participant kits.",
    },
    {
      title: "Talent Engagement",
      description: "Internship or placement opportunities for top-performing participants.",
    },
  ],
  collaboration: {
    title: "IN COLLABORATION WITH",
    badge: "HackS'US — Edition V",
    body:
      "HackS'US is a flagship event from Rajagiri School of Engineering & Technology, presented in collaboration with its two premier student innovation bodies, Innovation and Entrepreneurship Development Center (IEDC) and Institution's Innovation Council (IIC).",
  },
  faq: [
    {
      q: "Who can apply?",
      a: "Anyone who wants to build and learn — details and eligibility will be shared when registrations go live.",
    },
    {
      q: "Is there a registration fee?",
      a: "Registration details will be announced soon. The current button is a placeholder.",
    },
    {
      q: "What should we bring?",
      a: "Bring your laptop, chargers, and anything you need to prototype — a full checklist will be shared later.",
    },
    {
      q: "How do teams work?",
      a: "Team formation and size guidelines will be announced closer to the event.",
    },
  ],
  contacts: [
    {
      name: "Mr. Nitheesh Kurian",
      phone: "+91 9497413879",
      email: "nitheshk@rajagiritech.edu.in",
    },
    {
      name: "Mr. Rony Antony",
      phone: "+91 9744433929",
      email: "ronya@rajagiritech.edu.in",
    },
    {
      name: "Mr. Kiran K A",
      phone: "+91 9747638947",
      email: "kirank@rajagiritech.edu.in",
    },
  ],
} as const;

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const nextId = (visible[0]?.target as HTMLElement | undefined)?.id;
        if (nextId) setActive(nextId);
      },
      {
        root: null,
        rootMargin: "-35% 0px -60% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px -20% 0px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="text-center mb-10 md:mb-12"
    >
      <div className="flex items-center justify-center gap-2">
        <span className="font-mono text-xs tracking-[0.35em] text-muted-foreground">
          {eyebrow}
        </span>
        <span className="h-px w-10 bg-border" />
      </div>
      <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-wide">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border-border/60 bg-card/55 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />
      <div className="relative">{children}</div>
    </Card>
  );
}

function CarbonXNavbar({
  activeId,
  items,
  onNavigate,
}: {
  activeId: string;
  items: { id: string; label: string }[];
  onNavigate: (id: string) => void;
}) {
  const linksWrapRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const syncIndicator = useCallback(() => {
    const wrap = linksWrapRef.current;
    const activeEl = linkRefs.current[activeId];
    if (!wrap || !activeEl) return;

    const wrapRect = wrap.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - wrapRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, [activeId]);

  useLayoutEffect(() => {
    syncIndicator();
  }, [syncIndicator, items]);

  useEffect(() => {
    const wrap = linksWrapRef.current;
    if (!wrap) return;

    const onResize = () => syncIndicator();
    window.addEventListener("resize", onResize, { passive: true });

    const ro = new ResizeObserver(() => syncIndicator());
    ro.observe(wrap);
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [syncIndicator]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="bg-background/40 backdrop-blur-xl border-b border-border/60">
        <div className="container max-w-6xl px-6">
          <div className="h-16 flex items-center justify-between gap-6">
            <a
              href="#top"
              className="font-mono tracking-[0.32em] text-sm text-foreground/90 hover:text-foreground transition-colors"
              aria-label="Go to top"
            >
              CARBONX
            </a>

            <div
              ref={linksWrapRef}
              className="relative hidden md:flex items-center gap-6"
            >
              <motion.div
                aria-hidden="true"
                className="absolute -bottom-2 h-0.5 bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.35)]"
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
                transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.25 }}
              />
              {items.map((it) => (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  ref={(el) => {
                    linkRefs.current[it.id] = el;
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(it.id);
                  }}
                  className={cn(
                    "relative text-xs tracking-[0.28em] uppercase transition-colors",
                    activeId === it.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {it.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                asChild
                className="rounded-full px-5 h-9 bg-scanline text-black hover:bg-scanline/90 shadow-[0_0_28px_hsl(var(--scanline-green)/0.25)]"
              >
                <a href="#register">
                  REGISTER NOW <ArrowRight className="ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CarbonX = () => {
  const location = useLocation();
  const sectionIds = useMemo(
    () => ["about", "experience", "tracks", "faq", "contact"],
    [],
  );
  const activeId = useActiveSection(sectionIds);
  const particleColors = useMemo(() => ["#ffffff"], []);
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 84; // navbar height + breathing room
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    // Keep the landing view stable on reload by not persisting section hashes.
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Prevent browser scroll restoration from skipping the hero on reload.
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      scrollToSection(id);
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.hash, scrollToSection]);

  return (
    <main id="top" className="relative text-foreground overflow-x-hidden">
      {/* Background: grid + stars/particles */}
      <div className="landing-bg pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.12]"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div className="landing-bg-particles absolute inset-0">
          <ResponsiveParticles
            minWidth={768}
            className="absolute inset-0"
            particleColors={particleColors}
            particleCount={240}
            particleSpread={12}
            speed={0.16}
            particleBaseSize={170}
            sizeRandomness={0.65}
            moveParticlesOnHover={true}
            hoverMode="window"
            particleHoverFactor={2.2}
            moveParticlesOnDeviceOrientation={true}
            deviceOrientationFactor={2.4}
            alphaParticles={true}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-radial from-white/[0.05] via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <CarbonXNavbar
          activeId={activeId}
          items={[
            { id: "about", label: "ABOUT" },
            { id: "experience", label: "EXPERIENCE" },
            { id: "tracks", label: "TRACKS" },
            { id: "faq", label: "FAQ" },
            { id: "contact", label: "CONTACT" },
          ]}
          onNavigate={scrollToSection}
        />

        {/* Hero */}
        <section className="relative pt-24 md:pt-28 pb-12 md:pb-16">
          <div className="container max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-center py-10 md:py-14"
            >
              <p className="font-mono text-[11px] tracking-[0.46em] text-muted-foreground">
                {carbonX.tagline}
              </p>

              <h1 className="mt-7 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-[0.18em] leading-none">
                <span className="text-foreground">{carbonX.eventName}</span>{" "}
                <span className="text-muted-foreground/55">{carbonX.year}</span>
              </h1>

              <div className="mt-7">
                <div className="font-mono text-4xl sm:text-5xl md:text-6xl tracking-[0.18em] text-foreground">
                  {carbonX.prizeAmount}
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.56em] text-muted-foreground">
                  {carbonX.prizeCaption}
                </div>
                <div className="mt-3 font-mono text-xs text-muted-foreground">
                  {carbonX.prizeHelper}
                </div>
              </div>

              <p className="mt-7 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
                A 42 hour national hackathon where developers, innovators, and students from across India team up to build practical, high-impact solutions.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  className="rounded-full px-7 h-11 bg-scanline text-black hover:bg-scanline/90 shadow-[0_0_34px_hsl(var(--scanline-green)/0.22)]"
                >
                  <a href="#register">REGISTER NOW</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-7 h-11 bg-background/10 border-border/60 hover:bg-background/20"
                >
                  <a href="#about">LEARN MORE</a>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px -20% 0px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="mt-14"
              >
                <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-background/10 backdrop-blur-md px-5 py-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0">
                    {carbonX.stats.map((s, idx) => (
                      <div
                        key={s.label}
                        className={cn(
                          "px-4 text-center",
                          idx !== 0 && "sm:border-l sm:border-border/60",
                        )}
                      >
                        <div className="font-mono text-[10px] tracking-[0.44em] text-muted-foreground">
                          {s.label}
                        </div>
                        <div className="mt-2 font-display text-xl tracking-wide">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Event strip */}
        <section id="register" className="relative py-10 md:py-12 scroll-mt-24">
        <div className="container max-w-6xl px-6">
          <GlassCard className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <Badge
                      className="rounded-full bg-primary/15 text-primary border border-primary/25"
                      variant="outline"
                    >
                      JOIN US
                    </Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2 text-foreground">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <span className="font-display text-2xl tracking-wide">
                        {carbonX.date}
                      </span>
                    </div>
                    <div className="h-6 w-px bg-border/70 hidden sm:block" />
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-display text-2xl tracking-wide">
                        {carbonX.city}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {carbonX.organizer}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {carbonX.chips.map((chip) => (
                    <Badge
                      key={chip}
                      variant="outline"
                      className="rounded-full border-border/60 bg-background/10 text-muted-foreground"
                    >
                      {chip}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/10 p-6 backdrop-blur-md">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                <div className="relative">
                  <div className="font-mono text-[11px] tracking-[0.38em] text-muted-foreground">
                    REGISTER NOW
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Registration opens soon. This is a placeholder button; link
                    will be added once registrations go live.
                  </p>
                  <div className="mt-6">
                    <Button
                      className="rounded-full px-6 h-10 bg-scanline text-black hover:bg-scanline/90"
                      type="button"
                    >
                      REGISTER NOW <ArrowRight className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
        </section>

        {/* About */}
        <section id="about" className="relative py-16 md:py-20 scroll-mt-24">
        <div className="container max-w-6xl px-6">
          <SectionHeading
            eyebrow="ABOUT"
            title="Built for builders."
            description="A national hackathon designed to move fast, build practical demos, and ship impact."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {carbonX.aboutCards.map((c) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px -20% 0px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="font-display text-2xl tracking-wide">
                    {c.title}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {c.body}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
        </section>

        {/* Experience */}
        <section id="experience" className="relative py-16 md:py-20 scroll-mt-24">
        <div className="container max-w-6xl px-6">
          <SectionHeading
            eyebrow="EXPERIENCE"
            title="A focused 42-hour arc."
            description="No rigid agenda — just a high-signal build experience with expert support."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {carbonX.experience.map((x) => (
              <motion.div
                key={x.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px -20% 0px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-display text-2xl tracking-wide">
                      {x.title}
                    </div>
                    <div className="h-10 w-10 rounded-full border border-border/60 bg-background/15 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.55)]" />
                    </div>
                  </div>

                  {x.items ? (
                    <ul className="mt-4 space-y-2">
                      {x.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {x.body}
                    </p>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
        </section>

        {/* Tracks */}
        <section id="tracks" className="relative py-16 md:py-20 scroll-mt-24">
        <div className="container max-w-6xl px-6">
          <SectionHeading
            eyebrow="TRACKS"
            title="Pick a track. Build something real."
            description="Each track has its own focus — keep it practical, high-impact, and demo-ready."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {carbonX.tracks.map((t) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px -20% 0px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-2xl tracking-wide">
                        {t.title}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                    {t.comingSoon ? (
                      <Badge className="rounded-full bg-muted/40 text-muted-foreground border border-border/60">
                        Coming soon
                      </Badge>
                    ) : (
                      <Badge className="rounded-full bg-primary/15 text-primary border border-primary/25">
                        Live
                      </Badge>
                    )}
                  </div>

                  <div className="mt-6 h-px w-full bg-border/70" />
                  <p className="mt-4 text-xs text-muted-foreground tracking-[0.26em] font-mono uppercase">
                    Prizes worth Rs. 1 Lakh per Track
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
        </section>

        {/* Why it matters */}
        <section className="relative py-16 md:py-20">
        <div className="container max-w-6xl px-6">
          <SectionHeading
            eyebrow="WHY IT MATTERS"
            title="Signal, not noise."
            description="A hackathon designed to connect people, products, and opportunities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {carbonX.whyItMatters.map((b) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px -20% 0px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-2xl border border-border/60 bg-background/15 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-display text-xl tracking-wide">
                      {b}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
        </section>

        {/* Partnerships */}
        <section className="relative py-16 md:py-20">
        <div className="container max-w-6xl px-6">
          <SectionHeading
            eyebrow="PARTNERSHIPS"
            title="Support the build."
            description="Partner with CarbonX across tracks, prizes, logistics, and talent engagement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {carbonX.partnershipOptions.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px -20% 0px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="font-display text-xl tracking-wide">
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-background/10 backdrop-blur-md px-6 py-5 text-center">
              <div className="font-mono text-xs tracking-[0.38em] text-muted-foreground">
                PRIZES
              </div>
              <div className="mt-2 font-display text-2xl tracking-wide">
                PRIZES WORTH RS. 1 LAKH PER TRACK
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* Collaboration callout */}
        <section className="relative py-10 md:py-12">
        <div className="container max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -20% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <GlassCard className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
                <div>
                  <div className="font-mono text-xs tracking-[0.38em] text-muted-foreground">
                    {carbonX.collaboration.title}
                  </div>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">
                    {carbonX.collaboration.body}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-primary/15 text-primary border border-primary/25">
                    {carbonX.collaboration.badge}
                  </Badge>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative py-16 md:py-20 scroll-mt-24">
        <div className="container max-w-4xl px-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Quick answers."
            description="A few common questions — final details will be shared with registrations."
          />

          <GlassCard className="p-2 md:p-4">
            <Accordion type="single" collapsible className="w-full">
              {carbonX.faq.map((f, idx) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${idx}`}
                  className="border-border/60"
                >
                  <AccordionTrigger className="px-4 md:px-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-6 text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-16 md:py-20 scroll-mt-24">
        <div className="container max-w-6xl px-6">
          <SectionHeading
            eyebrow="CONTACT INFORMATION"
            title="Get in touch."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {carbonX.contacts.map((c) => (
              <motion.div
                key={c.email}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px -20% 0px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="font-display text-xl tracking-wide">
                    {c.name}
                  </div>
                  <div className="mt-5 space-y-3 text-sm">
                    <a
                      href={`tel:${c.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{c.phone}</span>
                    </a>
                    <a
                      href={`mailto:${c.email}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{c.email}</span>
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
        </section>

        {/* Footer */}
        <footer className="relative py-10 md:py-12">
        <div className="container max-w-6xl px-6">
          <div className="rounded-2xl border border-border/60 bg-background/10 backdrop-blur-md p-6 md:p-8 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {carbonX.organizer}
            </p>
            <div className="mt-6 font-mono text-xs tracking-[0.34em] text-muted-foreground">
              © {carbonX.eventName} {carbonX.year}
            </div>
          </div>
        </div>
        </footer>
      </div>
    </main>
  );
};

export default CarbonX;
