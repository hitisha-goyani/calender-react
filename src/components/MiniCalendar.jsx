import { MONTHS, DAYS, MONTH_THEMES } from "../constants";
import { buildCalendarCells, getHoliday } from "../utils";

/**
 * MiniCalendar — compact calendar tile used in the Year overview grid.
 * Shows an optional photo banner at the top.
 */
export default function MiniCalendar({ year, month, onSelect, selectedDate, today, events, photo }) {
  const theme = MONTH_THEMES[month];
  const cells = buildCalendarCells(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: theme.bg, border: `1px solid ${theme.accent}22` }}
    >
      {/* Optional photo banner */}
      {photo && (
        <div className="relative overflow-hidden" style={{ height: 88 }}>
          <img src={photo} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, transparent 30%, ${theme.bg}ee)` }}
          />
        </div>
      )}

      {/* Month header */}
      <div
        className="px-3 py-2"
        style={{
          background: photo ? "transparent" : `${theme.accent}18`,
          borderBottom: `1px solid ${theme.accent}22`,
        }}
      >
        <p
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: theme.accent, opacity: 0.6, fontFamily: "'DM Sans', sans-serif" }}
        >
          {theme.name}
        </p>
        <h3
          className="text-base font-black text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {MONTHS[month]}
        </h3>
      </div>

      {/* Day grid */}
      <div className="p-2">
        <div className="grid grid-cols-7 mb-0.5">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-bold"
              style={{ color: theme.accent, opacity: 0.5, fontFamily: "'DM Sans', sans-serif" }}
            >
              {d[0]}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const isToday  = today.year === year && today.month === month && today.day === day;
            const isSel    = selectedDate?.year === year && selectedDate?.month === month && selectedDate?.day === day;
            const holiday  = getHoliday(year, month, day);
            const hasEvent = events.some((e) => e.year === year && e.month === month && e.day === day);
            const dow      = (firstDay + day - 1) % 7;
            const isWknd   = dow === 0 || dow === 6;

            return (
              <button
                key={i}
                onClick={() => onSelect({ year, month, day })}
                className="relative aspect-square rounded-md flex items-center justify-center text-xs transition-all duration-150 hover:scale-110"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: isSel ? theme.accent : isToday ? `${theme.accent}30` : "transparent",
                  color: isSel ? theme.bg : isToday ? theme.accent : isWknd ? `${theme.accent}90` : "#ccc",
                  fontWeight: isSel || isToday ? 800 : 500,
                }}
              >
                {day}
                {(holiday || hasEvent) && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: isSel ? theme.bg : theme.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
