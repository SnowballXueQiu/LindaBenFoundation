"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/client";

type CalendarCell =
  | { isEmpty: true; index: number }
  | { isEmpty: false; day: number; isWednesday: boolean; date: Date };

function EventPopup({
  isOpen,
  onClose,
  eventDate,
  position,
}: {
  isOpen: boolean;
  onClose: () => void;
  eventDate: Date | null;
  position: { x: number; y: number } | null;
}) {
  const { dictionary } = useI18n();
  const page = dictionary.pages.events;
  if (!isOpen || !eventDate || !position) return null;

  const dayName = page.days[eventDate.getDay()];
  const monthName = page.months[eventDate.getMonth()];

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div
        className="absolute z-40 bg-white rounded-xl shadow-2xl border border-gray-200 max-w-sm w-80"
        style={{ left: position.x + 10, top: position.y, maxHeight: "400px" }}
      >
        <div className="absolute w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45" style={{ left: "-6px", top: "12px" }} />
        <div className="p-4 overflow-y-auto max-h-96">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-bold leading-tight pr-2" style={{ color: "var(--green-deep)" }}>
              {page.marketTitle}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200 shrink-0" aria-label={dictionary.common.close}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-3 p-2 rounded-md" style={{ background: "var(--green-pale)" }}>
            <p className="text-xs font-semibold" style={{ color: "var(--green-deep)" }}>
              {dayName}, {monthName} {eventDate.getDate()}, {eventDate.getFullYear()} - 1:00am - 3:00am
            </p>
          </div>
          <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-dark)" }}>
            {page.marketDescription}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-dark)" }}>
            {page.marketRelief}
          </p>
        </div>
      </div>
    </>
  );
}

function EventCalendar() {
  const { dictionary } = useI18n();
  const page = dictionary.pages.events;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days: CalendarCell[] = [
    ...Array.from({ length: firstDayOfMonth }, (_, index): CalendarCell => ({ isEmpty: true, index })),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const date = new Date(currentYear, currentMonth, day);
      return { day, isWednesday: date.getDay() === 3, date, isEmpty: false } satisfies CalendarCell;
    }),
  ];

  return (
    <>
      <EventPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} eventDate={selectedEventDate} position={popupPosition} />
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 max-w-4xl mx-auto relative">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <CalendarButton label={page.previousYear} onClick={() => setCurrentDate(new Date(currentYear - 1, currentMonth, 1))} text="<<" />
            <span className="text-xl font-bold min-w-20 text-center" style={{ color: "var(--green-deep)" }}>{currentYear}</span>
            <CalendarButton label={page.nextYear} onClick={() => setCurrentDate(new Date(currentYear + 1, currentMonth, 1))} text=">>" />
            <CalendarButton label={page.previousMonth} onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))} text="<" />
            <span className="text-xl font-bold min-w-30 text-center" style={{ color: "var(--green-deep)" }}>{page.months[currentMonth]}</span>
            <CalendarButton label={page.nextMonth} onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))} text=">" />
          </div>
          <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 rounded-full text-white text-sm font-medium transition-colors duration-200 hover:opacity-90" style={{ background: "var(--green-mid)" }}>
            {page.today}
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {page.days.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-semibold" style={{ color: "var(--text-mid)" }}>{day.slice(0, 3)}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((dayObj) => {
            if (dayObj.isEmpty) return <div key={`empty-${dayObj.index}`} className="p-2 h-28" />;
            const today = new Date();
            const isToday = today.getDate() === dayObj.day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
            return (
              <div key={`day-${dayObj.day}`} className={`flex h-28 min-w-0 flex-col overflow-hidden rounded-lg border border-gray-100 p-2 transition-colors duration-200 hover:bg-gray-50 ${isToday ? "ring-2 ring-(--green-mid)" : ""}`}>
                <div className={`text-sm font-medium mb-1 ${isToday ? "text-white bg-(--green-mid) w-6 h-6 rounded-full flex items-center justify-center" : "text-gray-900"}`}>
                  {dayObj.day}
                </div>
                {dayObj.isWednesday && (
                  <button
                    className="mt-1 min-h-0 w-full flex-1 overflow-hidden rounded px-1 py-1 text-left text-xs leading-tight text-white transition-opacity duration-200 hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                    onClick={(e) => {
                      setPopupPosition({ x: e.pageX, y: e.pageY });
                      setSelectedEventDate(new Date(currentYear, currentMonth, dayObj.day));
                      setIsPopupOpen(true);
                    }}
                  >
                    <div className="text-center font-semibold">1am</div>
                    <div className="mt-0.5 line-clamp-3 overflow-hidden break-words text-[10px] leading-tight">
                      {page.marketTitle}
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function CalendarButton({ label, onClick, text }: { label: string; onClick: () => void; text: string }) {
  return (
    <button onClick={onClick} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label={label}>
      {text}
    </button>
  );
}

export default function EventsPage() {
  const { dictionary } = useI18n();
  const page = dictionary.pages.events;

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-merriweather), serif" }}>{page.title}</h1>
        </div>
      </section>
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <EventCalendar />
        </div>
      </section>
      <DonationCTA />
      <ContactForm />
      <Footer />
    </div>
  );
}
