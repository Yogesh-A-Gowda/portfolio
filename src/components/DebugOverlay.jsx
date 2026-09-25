import { useEffect, useState } from "react";
import * as THREE from "three";

const checkWebGL = () => {
  const results = {};
  try {
    const canvas = document.createElement("canvas");
    const gl2 = canvas.getContext("webgl2");
    results.webgl2 = !!gl2;
    if (gl2) {
      results.renderer = gl2.getParameter(gl2.RENDERER);
      results.vendor = gl2.getParameter(gl2.VENDOR);
    } else {
      const gl1 = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      results.webgl1 = !!gl1;
      if (gl1) {
        results.renderer = gl1.getParameter(gl1.RENDERER);
        results.vendor = gl1.getParameter(gl1.VENDOR);
      }
    }
  } catch (e) {
    results.error = String(e);
  }
  return results;
};

const DebugOverlay = () => {
  const [webglInfo] = useState(checkWebGL);
  const [canvases, setCanvases] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const log = (type, detail) => {
      setEvents((prev) => [
        ...prev,
        { type, detail, time: new Date().toISOString().slice(11, 19) },
      ].slice(-30));
    };

    const onError = (e) => {
      log("js-error", e.message + (e.filename ? ` @ ${e.filename}:${e.lineno}` : ""));
    };
    const onRejection = (e) => {
      log("promise-rejection", String(e.reason));
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    const prevOnError = THREE.DefaultLoadingManager.onError;
    THREE.DefaultLoadingManager.onError = (url) => {
      log("asset-load-error", url);
      if (prevOnError) prevOnError(url);
    };

    const interval = setInterval(() => {
      const list = Array.from(document.querySelectorAll("canvas")).map((c, i) => {
        const rect = c.getBoundingClientRect();
        return {
          i,
          cssW: Math.round(rect.width),
          cssH: Math.round(rect.height),
          bufW: c.width,
          bufH: c.height,
        };
      });
      setCanvases(list);
    }, 1000);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      THREE.DefaultLoadingManager.onError = prevOnError;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999999,
        background: "rgba(0,0,0,0.85)",
        color: "#0f0",
        fontFamily: "monospace",
        fontSize: 11,
        lineHeight: 1.4,
        padding: 8,
        maxHeight: "50vh",
        overflowY: "auto",
        pointerEvents: "auto",
      }}
    >
      <div style={{ color: "#fff", fontWeight: "bold" }}>DEBUG OVERLAY (?debug=1)</div>
      <div>webgl2: {String(webglInfo.webgl2)} | webgl1: {String(webglInfo.webgl1)}</div>
      <div>renderer: {webglInfo.renderer || "n/a"}</div>
      <div>vendor: {webglInfo.vendor || "n/a"}</div>
      {webglInfo.error && <div style={{ color: "red" }}>webgl check error: {webglInfo.error}</div>}
      <div style={{ marginTop: 4, color: "#fff" }}>
        canvases found: {canvases.length}
      </div>
      {canvases.map((c) => (
        <div key={c.i}>
          #{c.i} css={c.cssW}x{c.cssH} buffer={c.bufW}x{c.bufH}
        </div>
      ))}
      <div style={{ marginTop: 4, color: "#fff" }}>events:</div>
      {events.length === 0 && <div>(none yet)</div>}
      {events.map((e, i) => (
        <div key={i} style={{ color: e.type === "asset-load-error" || e.type === "js-error" ? "#f66" : "#ff0" }}>
          [{e.time}] {e.type}: {e.detail}
        </div>
      ))}
    </div>
  );
};

export default DebugOverlay;
