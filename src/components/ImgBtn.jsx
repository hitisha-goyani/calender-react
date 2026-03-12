import { useRef } from "react";
import { readFileAsDataURL } from "../utils";

/**
 * ImgBtn — Reusable image-upload button.
 * Props:
 *   label   : string  — button text
 *   icon    : string  — emoji icon
 *   accent  : string  — hex accent colour
 *   bg      : string  — hex background colour (used for glow text colour)
 *   onImage : fn(dataUrl) — called with base64 image data
 *   glow    : bool    — true = filled/glowing style (Apply to All), false = outline style (per month)
 */
export default function ImgBtn({ label, icon, accent, bg, onImage, glow = false }) {
  const inputRef = useRef();

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const data = await readFileAsDataURL(file);
    onImage(data);
    e.target.value = ""; // allow re-selecting same file
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        onClick={() => inputRef.current.click()}
        title={glow ? "Upload one photo and apply it to every month" : `Upload a photo for this month only`}
        className="flex items-center gap-2 px-3 py-2 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-150 hover:scale-105 active:scale-95 whitespace-nowrap"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: glow
            ? `linear-gradient(135deg, ${accent}, ${accent}99)`
            : `${accent}20`,
          color: glow ? bg : accent,
          border: glow ? "none" : `1.5px solid ${accent}55`,
          boxShadow: glow ? `0 4px 18px ${accent}55` : "none",
        }}
      >
        <span className="text-sm">{icon}</span>
        <span>{label}</span>
      </button>
    </>
  );
}
