import { useState, useCallback } from "react";
import { MONTHS, MONTH_THEMES } from "./constants";

// Components
import Sidebar        from "./components/Sidebar";
import BigCalendar    from "./components/BigCalendar";
import YearView       from "./components/YearView";
import AgendaView     from "./components/AgendaView";
import PhotoManager   from "./components/PhotoManager";
import AddEventModal  from "./components/AddEventModal";

const now   = new Date();
const TODAY = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };

export default function App() {
  // ── Navigation state ──────────────────────────────────────────────────────
  const [viewYear,  setViewYear]  = useState(2025);
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [view,      setView]      = useState("month"); // "month" | "year" | "agenda"
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // ── Selection state ───────────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState(TODAY);

  // ── Events state ──────────────────────────────────────────────────────────
  const [events, setEvents] = useState([
    { year: 2025, month: 2,  day: 15, text: "Team Meetup"     },
    { year: 2025, month: 5,  day: 21, text: "Launch Day"      },
    { year: 2025, month: 9,  day: 10, text: "Conference"      },
    { year: 2026, month: 0,  day: 10, text: "Planning Sprint" },
  ]);
  const [showEventModal, setShowEventModal] = useState(false);

  // ── Photos state (12 slots, one per month) ────────────────────────────────
  const [photos, setPhotos] = useState(Array(12).fill(null));
  const [showPhotoManager, setShowPhotoManager] = useState(false);

  // ── Derived ───────────────────────────────────────────────────────────────
  const theme        = MONTH_THEMES[viewMonth];
  const currentPhoto = photos[viewMonth];
  const photosSet    = photos.filter(Boolean).length;

  // ── Photo handlers ────────────────────────────────────────────────────────
  const setMonthPhoto  = useCallback((idx, data) => setPhotos(p => { const n = [...p]; n[idx] = data; return n; }), []);
  const setAllPhotos   = useCallback((data) => setPhotos(Array(12).fill(data)), []);
  const removePhoto    = useCallback((idx)  => setPhotos(p => { const n = [...p]; n[idx] = null; return n; }), []);

  // ── Event handlers ────────────────────────────────────────────────────────
  function addEvent(text) {
    if (!selectedDate) return;
    setEvents(prev => [...prev, { ...selectedDate, text }]);
    setShowEventModal(false);
  }
  function removeEvent(idx) {
    setEvents(prev => prev.filter((_, i) => i !== idx));
  }

  // ── Navigation helpers ────────────────────────────────────────────────────
  function prevMonth() {
    if (viewMonth === 0) { if (viewYear > 2025) { setViewMonth(11); setViewYear(y => y - 1); } }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { if (viewYear < 2026) { setViewMonth(0); setViewYear(y => y + 1); } }
    else setViewMonth(m => m + 1);
  }
  function goToday() {
    setSelectedDate(TODAY);
    setViewMonth(TODAY.month);
    setViewYear(TODAY.year);
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: theme.bg, fontFamily: "'DM Sans', sans-serif", transition: "background .8s ease" }}
    >
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {currentPhoto ? (
          <>
            <img src={currentPhoto} alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0" style={{ background: `${theme.bg}bb` }} />
          </>
        ) : (
          <div
            className="w-full h-full"
            style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${theme.accent}18 0%, transparent 70%)` }}
          />
        )}
      </div>

      {/* ════════════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════════════ */}
      <header
        className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3"
        style={{ borderBottom: `1px solid ${theme.accent}22`, background: `${theme.bg}dd`, backdropFilter: "blur(20px)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="text-white opacity-60 hover:opacity-100 transition-opacity text-xl"
          >
            ☰
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-xl sm:text-2xl font-black text-white tracking-tighter"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                CALENDARIUM
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${theme.accent}33`, color: theme.accent }}
              >
                2025–26
              </span>
            </div>
            <p className="text-xs opacity-40 text-white tracking-widest uppercase">Annual Planner</p>
          </div>
        </div>

        {/* Month navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white opacity-60 hover:opacity-100 hover:scale-110 transition-all text-lg"
            style={{ background: `${theme.accent}22` }}
          >
            ‹
          </button>
          <div className="text-center min-w-[130px] relative">
            <h2
              className="text-lg font-black text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {MONTHS[viewMonth]}
            </h2>
            <button
              onClick={() => setShowYearPicker(s => !s)}
              className="text-xs font-bold tracking-widest"
              style={{ color: theme.accent }}
            >
              {viewYear} ▾
            </button>
            {showYearPicker && (
              <div
                className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-2 z-50 rounded-xl p-3"
                style={{ background: "#111", border: `1px solid ${theme.accent}44`, boxShadow: "0 20px 60px #00000080" }}
              >
                {[2025, 2026].map(y => (
                  <button
                    key={y}
                    onClick={() => { setViewYear(y); setShowYearPicker(false); }}
                    className="px-5 py-2 rounded-lg font-black text-sm transition-all"
                    style={{ background: viewYear === y ? theme.accent : `${theme.accent}22`, color: viewYear === y ? theme.bg : theme.accent }}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white opacity-60 hover:opacity-100 hover:scale-110 transition-all text-lg"
            style={{ background: `${theme.accent}22` }}
          >
            ›
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Photos button */}
          <button
            onClick={() => setShowPhotoManager(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all hover:scale-105"
            style={{ background: `${theme.accent}22`, color: theme.accent, border: `1.5px solid ${theme.accent}44` }}
          >
            📸 Photos
            {photosSet > 0 && (
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center font-black"
                style={{ background: theme.accent, color: theme.bg, fontSize: 9 }}
              >
                {photosSet}
              </span>
            )}
          </button>

          {/* View switcher */}
          {["month", "year", "agenda"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-full text-xs font-black tracking-widest uppercase transition-all"
              style={{ background: view === v ? theme.accent : `${theme.accent}18`, color: view === v ? theme.bg : theme.accent }}
            >
              {v}
            </button>
          ))}

          <button
            onClick={goToday}
            className="px-3 py-1.5 rounded-full text-xs font-black tracking-widest uppercase"
            style={{ background: `${theme.accent}18`, color: theme.accent }}
          >
            Today
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          BODY
      ════════════════════════════════════════════════════════ */}
      <div
        className="relative z-10 flex flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 66px)" }}
      >
        {/* Sidebar */}
        <div
          className="transition-all duration-300 overflow-hidden"
          style={{ width: sidebarOpen ? 272 : 0, flexShrink: 0 }}
        >
          {sidebarOpen && (
            <Sidebar
              viewYear={viewYear}
              viewMonth={viewMonth}
              selectedDate={selectedDate}
              events={events}
              photos={photos}
              onMonthPhoto={(img) => setMonthPhoto(viewMonth, img)}
              onAllPhoto={setAllPhotos}
              onRemovePhoto={() => removePhoto(viewMonth)}
              onAddEventClick={() => setShowEventModal(true)}
              onRemoveEvent={removeEvent}
              onSelectDate={setSelectedDate}
            />
          )}
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-3 sm:p-5">
          {view === "month" && (
            <BigCalendar
              year={viewYear}
              month={viewMonth}
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
              today={TODAY}
              events={events}
              photo={currentPhoto}
              onMonthPhoto={(img) => setMonthPhoto(viewMonth, img)}
              onAllPhoto={setAllPhotos}
              onRemovePhoto={() => removePhoto(viewMonth)}
            />
          )}

          {view === "year" && (
            <YearView
              viewYear={viewYear}
              selectedDate={selectedDate}
              today={TODAY}
              events={events}
              photos={photos}
              onMonthClick={(i) => { setViewMonth(i); setView("month"); }}
              onSelectDate={setSelectedDate}
            />
          )}

          {view === "agenda" && (
            <AgendaView
              viewYear={viewYear}
              viewMonth={viewMonth}
              events={events}
            />
          )}
        </main>
      </div>

      {/* ── Photo Manager Modal ── */}
      {showPhotoManager && (
        <PhotoManager
          photos={photos}
          theme={theme}
          onMonthPhoto={setMonthPhoto}
          onRemovePhoto={removePhoto}
          onAllPhoto={setAllPhotos}
          onClose={() => setShowPhotoManager(false)}
        />
      )}

      {/* ── Add Event Modal ── */}
      {showEventModal && (
        <AddEventModal
          selectedDate={selectedDate}
          theme={theme}
          onAdd={addEvent}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </div>
  );
}
