import { useState, useEffect } from "react";

interface HeaderProps {
  lightMode: "day" | "evening";
  setLightMode: (mode: "day" | "evening") => void;
  onOpenInquiry: () => void;
  activeSection: string;
}

export default function Header({
  lightMode,
  setLightMode,
  onOpenInquiry,
  activeSection,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { label: "Projects", target: "projects" },
  ];

  return (
    <header
      id="dsa-main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Desktop Navigation */}
        <nav id="dsa-desktop-navigation" className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
            <button
              key={item.target}
              id={`nav-link-${item.target}`}
              onClick={() => scrollToSection(item.target)}
              className={`text-xs uppercase tracking-[0.2em] font-mono cursor-pointer transition-all duration-300 relative py-1 ${
                activeSection === item.target
                  ? "text-blue-400 font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.label}
              {activeSection === item.target && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 animate-pulse" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
