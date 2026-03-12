import { MONTHS, DAYS, HOLIDAYS, MONTH_THEMES } from "../constants";
import { getDaysInMonth, getFirstDay, getHoliday } from "../utils";

/**
 * AgendaView — Chronological list of all holidays and events for the current month.
 */
export default function AgendaView({ viewYear, viewMonth, events }) {
  const theme = MONTH_THEMES[viewMonth];
  const today = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate() };

  const monthHolidays = Object.entries(HOLIDAYS)
    .filter(([k]) => k.startsWith(`${viewYear}-${viewMonth + 1}-`))
    .map(([k, v]) => ({ day: parseInt(k.split("-")[2]), name: v }))
    .sort((a, b) => a.day - b.day);

  const agendaEvents = events
    .filter((e) => e.year === viewYear && e.month === viewMonth)
    .sort((a, b) => a.day - b.day);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay    = getFirstDay(viewYear, viewMonth);

  return (
    <div>
      <h2
        className="text-4xl font-black text-white mb-6 tracking-tighter opacity-80"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Agenda — {MONTHS[viewMonth]} {viewYear}
      </h2>

      <div className="space-y-2 max-w-2xl">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const holiday = getHoliday(viewYear, viewMonth, day);
          const dayEv   = events.filter((e) => e.year === viewYear && e.month === viewMonth && e.day === day);
          if (!holiday && dayEv.length === 0) return null;

          const isToday  = today.year === viewYear && today.month === viewMonth && today.day === day;
          const dow      = (firstDay + day - 1) % 7;

          return (
            <div
              key={day}
              className="flex gap-4 rounded-2xl p-4"
              style={{
                background: isToday ? `${theme.accent}22` : "#ffffff08",
                border: `1px solid ${isToday ? theme.accent : "#ffffff0a"}`,
              }}
            >
              <div className="text-center min-w-[44px]">
                <p
                  className="text-2xl font-black"
                  style={{ color: theme.accent, fontFamily: "'Playfair Display', serif" }}
                >
                  {day}
                </p>
                <p
                  className="text-xs text-white opacity-40"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {DAYS[dow]}
                </p>
              </div>
              <div className="flex-1">
                {holiday && (
                  <p
                    className="text-sm font-bold text-white mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    🎉 {holiday}
                  </p>
                )}
                {dayEv.map((ev, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: theme.accent }}
                    />
                    <span
                      className="text-sm text-white opacity-80"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {ev.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {agendaEvents.length === 0 && monthHolidays.length === 0 && (
          <p
            className="text-white opacity-30 text-center py-16 text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            No events or holidays this month
          </p>
        )}
      </div>
    </div>
  );
}
