import { useState, useEffect } from 'react';

export const useWindowSize = (navRef, breakPoint) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    const safeClose = () => {
      if (
        width >= breakPoint &&
        navRef.current !== undefined &&
        navRef.current.classList.contains('active')
      ) {
        navRef.current.classList.remove('active');
      } else return;
    };

    const updateNavbar = () => {
      updateSize();
      safeClose();
    };

    window.addEventListener('resize', updateNavbar);
    return () => {
      window.removeEventListener('resize', updateNavbar);
    };
  }, [navRef, width, breakPoint]);

  return { width, height };
};

// Non usare in presenza di media query -> sono breakpoint istantanei
//const debounceUpdateNavbar = debounce(updateNavbar, 100);
