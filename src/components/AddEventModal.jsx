import { useState } from "react";
import { MONTHS, MONTH_THEMES } from "../constants";

/**
 * AddEventModal — Simple modal to add a custom event to a selected date.
 */
export default function AddEventModal({ selectedDate, theme, onAdd, onClose }) {
  const [text, setText] = useState("");

  function handleAdd() {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#00000088", backdropFilter: "blur(8px)" }}
    >
      <div
        className="rounded-3xl p-8 w-96 shadow-2xl"
        style={{ background: theme.bg, border: `1px solid ${theme.accent}44` }}
      >
        <h3
          className="text-xl font-black text-white mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Add Event
        </h3>
        <p
          className="text-sm opacity-50 text-white mb-6"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {selectedDate
            ? `${MONTHS[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`
            : ""}
        </p>

        <input
          className="w-full rounded-xl px-4 py-3 text-white text-sm font-semibold outline-none mb-4"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: "#ffffff12",
            border: `1px solid ${theme.accent}44`,
            caretColor: theme.accent,
          }}
          placeholder="Event title..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          autoFocus
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-black"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "#ffffff12", color: "#ffffff88" }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 py-3 rounded-xl text-sm font-black hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'DM Sans', sans-serif", background: theme.accent, color: theme.bg }}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}
