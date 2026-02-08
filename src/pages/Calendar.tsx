import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun",
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar",
];

const DAYS = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];

const Calendar = () => {
  const [visible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = lastDay.getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  // Placeholder: no booked dates yet. Connect to Google Calendar API later.
  const bookedDates: number[] = [];
  const isBooked = (day: number) => bookedDates.includes(day);

  const cells = [];
  for (let i = 0; i < startDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const booked = isBooked(d);
    const todayClass = isToday(d);
    cells.push(
      <div
        key={d}
        className={`aspect-square flex items-center justify-center font-serif text-lg transition-all cursor-default
          ${booked ? "bg-muted text-muted-foreground line-through" : "hover:bg-accent"}
          ${todayClass ? "border border-foreground" : ""}
        `}
      >
        {d}
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <p className="heading-caps text-muted-foreground mb-4">Kalendar</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light italic">
            Proveri dostupnost
          </h1>
          <p className="text-muted-foreground mt-4 font-light text-sm">
            Datumi označeni precrtano su već rezervisani. 
            Za rezervaciju kontaktirajte me putem email-a ili telefona.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevMonth}
              className="hover:opacity-60 transition-opacity"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <h2 className="font-serif text-2xl italic">
              {MONTHS[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="hover:opacity-60 transition-opacity"
              aria-label="Next month"
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div key={day} className="text-center heading-caps text-xs text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-8 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-foreground" />
              <span className="heading-caps text-xs text-muted-foreground">Danas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted" />
              <span className="heading-caps text-xs text-muted-foreground">Rezervisano</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calendar;
