"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// Event Detail Popup
function EventPopup({ 
  isOpen, 
  onClose, 
  eventDate,
  position 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  eventDate: Date | null;
  position: { x: number; y: number } | null;
}) {
  if (!isOpen || !eventDate || !position) return null;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const dayName = dayNames[eventDate.getDay()];
  const monthName = monthNames[eventDate.getMonth()];
  const day = eventDate.getDate();
  const year = eventDate.getFullYear();

  return (
    <>
      {/* Invisible backdrop to close popup when clicking outside */}
      <div 
        className="fixed inset-0 z-30"
        onClick={onClose}
      />
      
      {/* Popup positioned at mouse click location */}
      <div 
        className="absolute z-40 bg-white rounded-xl shadow-2xl border border-gray-200 max-w-sm w-80"
        style={{
          left: position.x + 10,
          top: position.y,
          maxHeight: '400px'
        }}
      >
        {/* Arrow pointing from left-top corner to the event */}
        <div 
          className="absolute w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"
          style={{
            left: '-6px',
            top: '12px'
          }}
        />
        
        <div className="p-4 overflow-y-auto max-h-96">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <h3 
              className="text-sm font-bold leading-tight pr-2"
              style={{ color: "var(--green-deep)" }}
            >
              LindaBen&apos;s Healthy Food Market (Food Giveaway)
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Date and Time */}
          <div className="mb-3 p-2 rounded-md" style={{ background: "var(--green-pale)" }}>
            <p 
              className="text-xs font-semibold"
              style={{ color: "var(--green-deep)" }}
            >
              {dayName}, {monthName} {day}, {year} • 1:00pm - 3:00pm
            </p>
          </div>

          {/* Description */}
          <div className="mb-3">
            <p 
              className="text-xs leading-relaxed mb-2"
              style={{ color: "var(--text-dark)" }}
            >
              Client-Choice Food Giveaway Every Tuesday between 1pm to 3pm. Our registration opens at 12pm.
            </p>
            <p 
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-dark)" }}
            >
              LindaBen provides hunger relief and healthy access to food for vulnerable families through our community pantry.
            </p>
          </div>

          {/* Sponsors */}
          <div className="mb-3">
            <h4 
              className="text-xs font-semibold mb-1"
              style={{ color: "var(--green-deep)" }}
            >
              Major Sponsors:
            </h4>
            <p 
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-mid)" }}
            >
              Capital Area Food Bank, TEFAP, Saint Bernard Church, Celestial Manna, Central Union Mission, Food Donation Connection, UMD Ext Snap program, Maryland Diaper Bank
            </p>
          </div>

          {/* Note */}
          <div 
            className="p-2 rounded-md border-l-2"
            style={{ 
              background: "var(--cream)", 
              borderLeftColor: "var(--green-mid)" 
            }}
          >
            <h4 
              className="text-xs font-semibold mb-1"
              style={{ color: "var(--green-deep)" }}
            >
              Note:
            </h4>
            <p 
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-dark)" }}
            >
              We ask people to come to our pantry with shopping bags and their proof of residency.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Calendar Component
function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ isEmpty: true, index: i });
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isWednesday = date.getDay() === 3; // Wednesday is day 3
    days.push({ day, isWednesday, date, isEmpty: false });
  }
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const goToPreviousYear = () => {
    setCurrentDate(new Date(currentYear - 1, currentMonth, 1));
  };
  
  const goToNextYear = () => {
    setCurrentDate(new Date(currentYear + 1, currentMonth, 1));
  };
  
  return (
    <>
      <EventPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        eventDate={selectedEventDate}
        position={popupPosition}
      />
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 max-w-4xl mx-auto relative">
        {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Year Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousYear}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Previous year"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xl font-bold min-w-20 text-center" style={{ color: "var(--green-deep)" }}>
              {currentYear}
            </span>
            <button
              onClick={goToNextYear}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Next year"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M6 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Month Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Previous month"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xl font-bold min-w-30 text-center" style={{ color: "var(--green-deep)" }}>
              {monthNames[currentMonth]}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Next month"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-4 py-2 rounded-full text-white text-sm font-medium transition-colors duration-200 hover:opacity-90"
          style={{ background: "var(--green-mid)" }}
        >
          Today
        </button>
      </div>
      
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-semibold"
            style={{ color: "var(--text-mid)" }}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((dayObj) => {
          if (dayObj.isEmpty) {
            return <div key={`empty-${dayObj.index}`} className="p-2 h-28"></div>;
          }
          
          const { day, isWednesday } = dayObj;
          const today = new Date();
          const isToday = 
            today.getDate() === day &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;
          
          return (
            <div
              key={`day-${day}`}
              className={`p-2 h-28 border border-gray-100 rounded-lg relative transition-colors duration-200 hover:bg-gray-50 ${
                isToday ? 'ring-2 ring-[var(--green-mid)]' : ''
              }`}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  isToday 
                    ? 'text-white bg-[var(--green-mid)] w-6 h-6 rounded-full flex items-center justify-center' 
                    : 'text-gray-900'
                }`}
              >
                {day}
              </div>
              
              {isWednesday && (
                <div className="mt-1">
                  <div
                    className="text-xs px-1 py-1 rounded text-white leading-tight cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    style={{ background: "var(--green-deep)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      
                      // Get mouse position relative to page (for absolute positioning that follows scroll)
                      setPopupPosition({
                        x: e.pageX,
                        y: e.pageY
                      });
                      
                      setSelectedEventDate(new Date(currentYear, currentMonth, day));
                      setIsPopupOpen(true);
                    }}
                  >
                    <div className="font-semibold text-center">1am</div>
                    <div className="text-[10px] mt-0.5">
                      LindaBen&apos;s Healthy Food Market (Food Giveaway)
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1
            className="text-4xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-merriweather), serif" }}
          >
            Upcoming Events
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p
              className="text-sm font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ color: "var(--green-mid)" }}
            >
              Gather for Good
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold mb-8"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              Join Us in Making a Difference
            </h2>
            <div className="max-w-4xl mx-auto">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--text-mid)" }}
              >
                Our events are at the heart of the LindaBen Foundation&apos;s mission to uplift and support our community. From food drives and community outreach to educational workshops and volunteer opportunities, our events are designed to bring people together, foster connections, and create positive change. Whether you&apos;re looking to give back, learn, or simply connect with like-minded individuals, there&apos;s something for everyone. Explore our upcoming events and see how you can be part of our journey to make a lasting impact.
              </p>
            </div>
          </div>
          
          {/* Calendar */}
          <EventCalendar />
        </div>
      </section>

      {/* Donation CTA */}
      <DonationCTA />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}