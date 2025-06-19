import { createContext, useRef, useCallback } from "react";

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const hostingRef = useRef(null);

  const scrollToHosting = useCallback((options = {}) => {
    if (hostingRef.current) {
      const scrollOptions = {
        behavior: "smooth",
        block: "start",
        ...options,
      };

      // First try immediate scroll
      hostingRef.current.scrollIntoView(scrollOptions);

      // Fallback with timeout if needed
      setTimeout(() => {
        hostingRef.current?.scrollIntoView(scrollOptions);
      }, 300);
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ hostingRef, scrollToHosting }}>
      {children}
    </ScrollContext.Provider>
  );
};
