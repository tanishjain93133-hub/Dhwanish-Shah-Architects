import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollRestoration() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);
  const isRestoring = useRef(false);

  // Save scroll position on scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (isRestoring.current) return;
      
      const currentScroll = window.scrollY;
      sessionStorage.setItem(`scroll-pos-${pathname}`, currentScroll.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Handle pathname and hash transitions
  useEffect(() => {
    // 1. Save the previous page's scroll position before doing anything
    if (prevPathname.current !== pathname) {
      // If we are leaving the previous page, save its exact scroll position
      sessionStorage.setItem(`scroll-pos-${prevPathname.current}`, window.scrollY.toString());
    }
    prevPathname.current = pathname;

    // 2. Set restoring flag to avoid scroll event listener overwriting state during restoration
    isRestoring.current = true;

    // 3. Handle Hash Scroll (like #lights, #contact, #home)
    if (hash) {
      const targetId = hash.replace('#', '');
      
      // We will search for the element and scroll to it. 
      // Use progressive attempts because the element might take a split second to render.
      const attempts = [0, 50, 150, 300, 500, 800, 1200];
      const timers = attempts.map((delay, index) => 
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            
            // Adjust offset for fixed navbar if necessary (e.g., subtracting 80px)
            const offsetTop = Math.max(0, absoluteTop - 80);
            
            window.scrollTo({
              top: offsetTop,
              behavior: index < 2 ? 'auto' : 'smooth' // auto first to jump, then smooth if it adjusts
            });
          }
          
          if (index === attempts.length - 1) {
            isRestoring.current = false;
          }
        }, delay)
      );

      return () => {
        timers.forEach(clearTimeout);
      };
    } else {
      // 4. Handle Page Scroll Restoration (No hash)
      const savedPosStr = sessionStorage.getItem(`scroll-pos-${pathname}`);
      const savedPos = savedPosStr ? parseInt(savedPosStr, 10) : 0;

      // We will restore the scroll position with progressive attempts
      const attempts = [0, 20, 75, 150, 300, 500, 800, 1200];
      const timers = attempts.map((delay, index) => 
        setTimeout(() => {
          const maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const targetY = Math.min(savedPos, maxScrollHeight > 0 ? maxScrollHeight : savedPos);
          
          window.scrollTo({
            top: targetY,
            behavior: 'auto'
          });

          if (index === attempts.length - 1) {
            isRestoring.current = false;
          }
        }, delay)
      );

      return () => {
        timers.forEach(clearTimeout);
      };
    }
  }, [pathname, hash]);

  return null;
}

