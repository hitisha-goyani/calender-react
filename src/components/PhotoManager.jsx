import { MONTHS, MONTH_THEMES } from "../constants";
import ImgBtn from "./ImgBtn";

/**
 * PhotoManager — Full-screen modal.
 * Shows all 12 month tiles with photo previews.
 * Two actions:
 *   1) Per-month upload (🖼️ Add/Change Photo)
 *   2) Apply one image to all months (✨ Apply to ALL Months) — in header
 */
export default function PhotoManager({ photos, theme, onMonthPhoto, onRemovePhoto, onAllPhoto, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "#000000bb", backdropFilter: "blur(14px)" }}
    >
      <div
        className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl"
        style={{
          background: "#0e0e0e",
          border: `1px solid ${theme.accent}33`,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* ── Modal Header ── */}
        <div
          className="flex items-center justify-between px-6 py-5 sticky top-0 z-10"
          style={{
            background: "#0e0e0eee",
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${theme.accent}22`,
          }}
        >
          <div>
            <h2
              className="text-xl font-black text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              📸 Photo Manager
            </h2>
            <p
              className="text-xs text-white/40 font-semibold mt-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Assign individual photos per month — or apply one image to every month at once
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Global apply-to-all button in modal header */}
            <ImgBtn
              label="Apply to ALL Months"
              icon="✨"
              accent={theme.accent}
              bg="#0e0e0e"
              onImage={onAllPhoto}
              glow={true}
            />
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white text-lg transition-all"
              style={{ background: "#ffffff10" }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Month grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
          {MONTHS.map((m, i) => {
            const t = MONTH_THEMES[i];
            const p = photos[i];
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden flex flex-col shadow-lg"
                style={{ background: t.bg, border: `1px solid ${t.accent}25` }}
              >
                {/* Photo preview */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 112, background: `${t.accent}10` }}
                >
                  {p ? (
                    <>
                      <img src={p} alt="" className="w-full h-full object-cover" />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to bottom, transparent 45%, #00000099)" }}
                      />
                      {/* Remove button */}
                      <button
                        onClick={() => onRemovePhoto(i)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black hover:scale-110 transition-all"
                        style={{ background: "#ff4444cc", color: "#fff" }}
                      >
                        ✕
                      </button>
                      <span
                        className="absolute bottom-1.5 left-2.5 text-xs font-black text-white drop-shadow"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {m}
                      </span>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1" style={{ opacity: 0.25 }}>
                      <span className="text-3xl">🖼️</span>
                      <span
                        className="text-xs text-white font-bold"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {m}
                      </span>
                    </div>
                  )}
                </div>

                {/* Per-month upload button */}
                <div className="p-2.5">
                  <ImgBtn
                    label={p ? "Change Photo" : "Add Photo"}
                    icon={p ? "🔄" : "📷"}
                    accent={t.accent}
                    bg={t.bg}
                    onImage={(img) => onMonthPhoto(i, img)}
                    glow={false}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Legend ── */}
        <div
          className="px-6 pb-6 flex flex-wrap gap-4 items-center"
          style={{ borderTop: `1px solid ${theme.accent}15` }}
        >
          <div className="flex items-center gap-2 pt-4">
            <span
              className="px-2 py-1 rounded-lg text-xs font-black"
              style={{ fontFamily: "'DM Sans', sans-serif", background: `${theme.accent}20`, color: theme.accent }}
            >
              📷 Add / Change
            </span>
            <span
              className="text-xs text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Upload for that specific month only
            </span>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <span
              className="px-2 py-1 rounded-lg text-xs font-black"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}99)`,
                color: "#000",
              }}
            >
              ✨ Apply to ALL
            </span>
            <span
              className="text-xs text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              One photo applied to every month
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
