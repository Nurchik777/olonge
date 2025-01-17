// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();
  const breakPointDesktop = 1024;
  const breakPointTablet = 768;

  const commonScrollTriggerSettings = {
    start: "top 70%",
    end: "bottom 30%",
    toggleActions: "play reverse play reverse",
  };

  mm.add(
    {
      isDesktop: `(min-width: ${breakPointDesktop}px)`,
      isTablet: `(min-width: ${breakPointTablet}px) and (max-width: ${
        breakPointDesktop - 1
      }px)`,
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isDesktop, isTablet } = context.conditions;

      const yOffset = isDesktop ? 20 : isTablet ? 15 : 10;
      const xOffsetMainSection = isDesktop ? -25 : isTablet ? -20 : 20;

      gsap.from(".menu__item", {
        duration: 1,
        opacity: 0,
        y: yOffset,
        stagger: 0.2,
      });

      gsap.from(".hero__title", {
        duration: 1,
        opacity: 0,
        x: xOffsetMainSection,
      });

      gsap.from(".hero__subtitle", {
        duration: 1,
        opacity: 0,
        x: isDesktop ? 25 : isTablet ? 20 : -20,
      });

      gsap.from(".hero__description", {
        duration: 1,
        opacity: 0,
        x: xOffsetMainSection,
      });

      gsap.utils.toArray(".features__item").forEach((item, index) => {
        const content = item.querySelector(".features__content");
        const image = item.querySelector(".features__image");

        if (content && image) {
          const isSecond = index === 1;

          gsap.from(image, {
            duration: 1.2,
            opacity: 0,
            x: isSecond ? 50 : -50,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              ...commonScrollTriggerSettings,
            },
          });

          gsap.from(content, {
            duration: 1.2,
            opacity: 0,
            x: isSecond ? -50 : 50,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              ...commonScrollTriggerSettings,
            },
          });
        }
      });

      return () => context.revert();
    }
  );
});

// Smooth Scroll
document.addEventListener("DOMContentLoaded", () => {
  const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1100,
    speedAsDuration: false,
    durationMax: 2000,
    durationMin: 1100,
    easing: "easeInOutQuad",
    clip: true,
    updateURL: false,
    offset: (anchor) => {
      const elementHeight = anchor.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;
      return Math.max((viewportHeight - elementHeight) / 2, 0);
    },
  });

  const footerButton = document.getElementById("scroll-to-footer");
  if (footerButton) {
    footerButton.addEventListener("click", () => {
      scroll.animateScroll(document.querySelector("#footer"));
    });
  }
});
