import { useState, useEffect } from "react";

/**
 * Checks whether WebGL / WebGL2 is supported and working on the current device.
 * Tests actual context creation and inspects GPU parameters.
 */
export const checkWebGLSupport = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      supported: false,
      webgl2: false,
      isMobile: false,
      isAndroid: false,
      renderer: "",
      vendor: "",
      error: "Window / document undefined",
    };
  }

  const userAgent = navigator.userAgent || "";
  const isAndroid = /Android/i.test(userAgent);
  const isMobile =
    isAndroid ||
    /iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
    (typeof window !== "undefined" && window.innerWidth <= 768);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;

    // Try WebGL2 first
    let gl = null;
    let isWebGL2 = false;

    try {
      gl = canvas.getContext("webgl2", {
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
      if (gl) isWebGL2 = true;
    } catch {
      // Ignore WebGL2 error and fallback to WebGL1
    }

    if (!gl) {
      try {
        gl =
          canvas.getContext("webgl", {
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }) ||
          canvas.getContext("experimental-webgl", {
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          });
      } catch (err) {
        return {
          supported: false,
          webgl2: false,
          isMobile,
          isAndroid,
          renderer: "",
          vendor: "",
          error: String(err),
        };
      }
    }

    if (!gl) {
      return {
        supported: false,
        webgl2: false,
        isMobile,
        isAndroid,
        renderer: "",
        vendor: "",
        error: "WebGL context creation returned null",
      };
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER) || "";
    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : gl.getParameter(gl.VENDOR) || "";
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048;

    // Clean up test context
    const loseContextExt = gl.getExtension("WEBGL_lose_context");
    if (loseContextExt) {
      loseContextExt.loseContext();
    }

    return {
      supported: true,
      webgl2: isWebGL2,
      isMobile,
      isAndroid,
      renderer,
      vendor,
      maxTextureSize,
      error: null,
    };
  } catch (e) {
    return {
      supported: false,
      webgl2: false,
      isMobile,
      isAndroid,
      renderer: "",
      vendor: "",
      error: String(e),
    };
  }
};

/**
 * Returns safe, optimized DPR (Device Pixel Ratio) array for React Three Fiber.
 * Clamps DPR to 1.25 or 1.5 on mobile/Android to prevent massive VRAM allocations.
 */
export const getOptimalDPR = () => {
  if (typeof window === "undefined") return [1, 1];
  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "") ||
    window.innerWidth <= 768;
  const dpr = window.devicePixelRatio || 1;
  if (isMobile) {
    return [1, Math.min(dpr, 1.5)];
  }
  return [1, Math.min(dpr, 2)];
};

/**
 * Standard WebGL configuration object for Canvas components
 */
export const defaultGLProps = {
  powerPreference: "high-performance",
  antialias: true,
  preserveDrawingBuffer: false,
  failIfMajorPerformanceCaveat: false,
  alpha: true,
  stencil: false,
  depth: true,
};

/**
 * Hook to check WebGL availability and device capabilities
 */
export const useWebGLAvailability = () => {
  const [status, setStatus] = useState(() => ({
    isAvailable: true,
    isWebGL2: true,
    isMobile: false,
    isAndroid: false,
    checked: false,
  }));

  useEffect(() => {
    const result = checkWebGLSupport();
    setStatus({
      isAvailable: result.supported,
      isWebGL2: result.webgl2,
      isMobile: result.isMobile,
      isAndroid: result.isAndroid,
      checked: true,
    });
  }, []);

  return status;
};

/**
 * Cross-browser responsive isMobile hook supporting legacy Android WebViews
 */
export const useIsMobile = (breakpoint = 500) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth <= breakpoint ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")
    );
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const updateMobile = (e) => {
      setIsMobile(
        (e ? e.matches : mediaQuery.matches) ||
          /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "")
      );
    };

    updateMobile();

    // Cross-browser event listener for MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMobile);
      return () => mediaQuery.removeEventListener("change", updateMobile);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateMobile);
      return () => mediaQuery.removeListener(updateMobile);
    }
  }, [breakpoint]);

  return isMobile;
};
