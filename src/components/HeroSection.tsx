import { Button } from "@/components/ui/button";
import { Info, FileText, Layers, Mail, MapPin, Calendar } from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useEffect, useMemo, useState } from "react";
import ElectricBorder from "@/components/ElectricBorder";
import ShinyText from "@/components/ShinyText";
import ClickSpark from "@/components/ClickSpark";

const HeroSection = () => {
  const dockItems = [
    {
      title: "About",
      icon: <Info className="h-full w-full" />,
      href: "#about",
    },
    {
      title: "Details",
      icon: <FileText className="h-full w-full" />,
      href: "#details",
    },
    {
      title: "Home",
      icon: <img src="/hacksus_logo.svg" alt="HackS'US" className="h-full w-full object-contain scale-[2]" />,
      href: "#",
    },
    {
      title: "Tracks",
      icon: <Layers className="h-full w-full" />,
      href: "#tracks",
    },
    {
      title: "Contact",
      icon: <Mail className="h-full w-full" />,
      href: "#footer",
    },
  ];

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${4 + Math.random() * 4}s`,
      size: Math.random() > 0.85 ? 2 : 1,
      opacity: 0.25 + Math.random() * 0.55,
    }));
  }, []);

  const [enableHeroMotion, setEnableHeroMotion] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const slowUpdateQuery = window.matchMedia("(update: slow)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const syncMotionMode = () => {
      setEnableHeroMotion(
        !reducedMotionQuery.matches &&
          !slowUpdateQuery.matches &&
          finePointerQuery.matches &&
          desktopQuery.matches,
      );
    };

    syncMotionMode();

    reducedMotionQuery.addEventListener("change", syncMotionMode);
    slowUpdateQuery.addEventListener("change", syncMotionMode);
    finePointerQuery.addEventListener("change", syncMotionMode);
    desktopQuery.addEventListener("change", syncMotionMode);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncMotionMode);
      slowUpdateQuery.removeEventListener("change", syncMotionMode);
      finePointerQuery.removeEventListener("change", syncMotionMode);
      desktopQuery.removeEventListener("change", syncMotionMode);
    };
  }, []);

  const prizeCardContent = (
    <div
      className={`group relative w-full rounded-[30px] border border-border/60 px-4 py-4 sm:px-6 sm:py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_20px_52px_rgba(255,49,46,0.14)] ${
        enableHeroMotion ? "bg-card/55 backdrop-blur-md" : "bg-card/80"
      }`}
    >
      <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-primary/12 via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.42em] text-primary/85">
            Total Prize Pool
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground tracking-[0.3em]">
              EDITION V
            </span>
            <span className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/90 transition-all duration-300 hover:border-primary/55 hover:bg-primary/20">
              Early Bird
            </span>
          </div>
        </div>

        <div className="text-center">
          <div
            className="font-display tabular-nums text-[clamp(2.45rem,7.3vw,5.2rem)] leading-[0.9] tracking-[-0.02em] transition-transform duration-300 group-hover:scale-[1.01] uppercase"
            style={{
              textShadow: "0 0 16px rgba(255, 255, 255, 0.2), 0 0 28px rgba(255, 49, 46, 0.12)",
              background: "linear-gradient(180deg, #ffffff 0%, #f5f5f5 48%, #e3e3e3 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            ₹2 LAKHS+
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Track prizes, partner perks, and bragging rights.
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { value: "42", label: "HOURS" },
            { value: "500+", label: "HACKERS" },
            { value: "4-6", label: "TEAM SIZE" },
            { value: "6", label: "TRACKS" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/70 bg-background/40 px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background/55 hover:shadow-[0_10px_24px_rgba(255,49,46,0.12)] text-center"
            >
              <div className="font-display text-2xl sm:text-[1.8rem] leading-none text-foreground">{stat.value}</div>
              <div className="mt-1 font-mono text-[9px] tracking-[0.32em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="inline-block w-full sm:w-auto">
            {enableHeroMotion ? (
              <ClickSpark sparkColor="#ff312e" sparkRadius={16} sparkSize={10} sparkCount={9} duration={380}>
                <ElectricBorder color="#ff312e" speed={0.9} chaos={0.07} borderRadius={16} className="w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto px-9">
                    <a
                      href="https://konfhub.com/hacksus-edition-5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10"
                    >
                      Register Now
                    </a>
                  </Button>
                </ElectricBorder>
              </ClickSpark>
            ) : (
              <Button
                variant="hero"
                size="lg"
                className="w-full sm:w-auto px-9 shadow-[0_0_14px_hsl(var(--electric-red)/0.2)] hover:shadow-[0_0_24px_hsl(var(--electric-red)/0.28)]"
              >
                <a
                  href="https://konfhub.com/hacksus-edition-5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10"
                >
                  Register Now
                </a>
              </Button>
            )}
          </div>

          <a
            href="#tracks"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-primary/50 bg-primary/15 px-6 py-3 font-mono text-xs tracking-[0.24em] text-foreground hover:bg-primary/25 hover:border-primary transition-colors shadow-[0_0_16px_hsl(var(--electric-red)/0.16)]"
          >
            EXPLORE TRACKS
          </a>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-xl border border-border/60 bg-background/30 px-3 py-2 text-primary transition-all duration-300 hover:border-primary/30 hover:bg-background/40">
          <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em]">
            <Calendar size={14} className="flex-shrink-0" />
            <span>MARCH 6-8, 2026</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <MapPin size={14} className="flex-shrink-0" />
            <span>Kochi, Kerala</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen overflow-hidden scanlines pt-0 pb-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.08]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-primary/50 ${enableHeroMotion ? "animate-float" : ""}`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: enableHeroMotion ? p.animationDelay : undefined,
              animationDuration: enableHeroMotion ? p.animationDuration : undefined,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-6">
        <div className="min-h-[100svh] flex items-start justify-center pt-2 pb-8">
          <div className="w-full max-w-[62rem] text-center -translate-y-4 sm:-translate-y-5 lg:-translate-y-6">
            <h1
              className="font-BrittanicBold text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] text-foreground leading-none tracking-wider mb-0 select-none flex justify-center items-end gap-0 w-full animate-fade-in -translate-x-2 sm:-translate-x-2.5 md:-translate-x-3"
              style={{
                animationDelay: "0.25s",
                textShadow: "4px 6px 10px rgba(255, 49, 46, 0.9), 4px 6px 10px rgba(255, 49, 46, 0.9)",
              }}
            >
              <img
                src="/hacksus_logo.svg"
                alt="HackS'US"
                className="h-[2em] w-auto object-contain translate-y-[0.3em] -mr-[0.16em] sm:-mr-[0.2em] md:-mr-[0.24em]"
                style={{ filter: "drop-shadow(4px 6px 10px rgba(255, 49, 46, 0.5))" }}
              />
              <span>ackS'US</span>
            </h1>

            <div className="relative mb-2 -mt-1 flex justify-center animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <img src="/images/EditionV-Ribbon.png" alt="Edition V" className="w-64 sm:w-72 lg:w-[20rem]" />
            </div>

            <p
              className="font-mono text-base sm:text-lg md:text-xl text-muted-foreground mb-3 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              India's First{" "}
              {enableHeroMotion ? (
                <ShinyText
                  text="AI-Workflow"
                  speed={2.2}
                  color="#bdbdbd"
                  shineColor="#ffffff"
                  spread={120}
                  pauseOnHover
                  className="font-mono"
                />
              ) : (
                "AI-Workflow"
              )}{" "}
              Hackathon
            </p>

            <div className="mx-auto max-w-[54rem] animate-fade-in" style={{ animationDelay: "0.55s" }}>
              {enableHeroMotion ? (
                <ElectricBorder color="#ff312e" speed={0.8} chaos={0.06} borderRadius={30} className="w-full">
                  {prizeCardContent}
                </ElectricBorder>
              ) : (
                <div className="rounded-[30px] border border-primary/35 shadow-[0_0_32px_hsl(var(--electric-red)/0.16)]">
                  {prizeCardContent}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dock */}
      {enableHeroMotion ? (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden [@media(min-height:900px)]:block">
          <FloatingDock items={dockItems} />
        </div>
      ) : null}

      {/* Scroll indicator
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll to content"
      >
        <ChevronDown size={32} />
      </a> */}
    </section>
  );
};

export default HeroSection;
