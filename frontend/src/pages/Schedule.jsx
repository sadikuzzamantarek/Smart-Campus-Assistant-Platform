import { Clock, MapPin } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import { SCHEDULE } from "../data/mockData";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

export default function Schedule() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Schedule" />

      <div className="space-y-4">
        {DAYS.map((day) => {
          const classes = SCHEDULE.filter((s) => s.day === day);
          if (classes.length === 0) return null;

          return (
            <div
              key={day}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="bg-campus-primary px-5 py-3">
                <h3 className="font-semibold text-white">{day}</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {classes.map((cls, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{cls.course}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 text-campus-primary" />
                        {cls.room}
                      </p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-sm font-medium text-campus-primary">
                      <Clock className="h-4 w-4" />
                      {cls.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
