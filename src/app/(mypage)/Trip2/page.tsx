'use client'
import { useState,useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

// Utility to generate time labels
const timeSlots = Array.from({ length: (15 * 2) }, (_, i) => {
  const totalMinutes = 8 * 60 + i * 30; // start at 8:00 AM
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${suffix}`;
});

type Place = {
  title: string;
  image: string;
  tags?: string;
  description?: string;
};

type Activity = {
  time: string
  title: string
  location: string
  image: string
}

type DayPlan = {
  date: string
  label: string
  activities: Activity[]
}

type RawActivity = {
  day: number;
  time_start: string;
  time_end: string;
  location_name: string;
  images: string[];
  description: string | null;
};

type DayActivity = {
  time: string; // time_start
  title: string;
  location: string;
  image: string;
};

type GroupedPlan = {
  label: string;
  date: string; // still needed for table display
  activities: DayActivity[];
};



export default function TimeSlotDayBox() {
  const [plans, setPlans] = useState<GroupedPlan[]>([]);

  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    fetch('data/Cleaned_Corrected_Search_Output.json')
    .then((res) => res.json())
    .then((data) => {
      setPlaces(data);           // Set to places

    });
    const raw = localStorage.getItem('userData');
    if (!raw) return;
  
    const data = JSON.parse(raw);
    const grouped: Record<number, DayActivity[]> = {};
  
    for (const item of data.plan) {
      const image = item.images && item.images.length > 0 ? item.images[0] : 'test.png';
      if (!grouped[item.day]) grouped[item.day] = [];
  
      grouped[item.day].push({
        time: formatTo12Hour(item.time_start),
        title: item.location_name,
        location: item.location_name,
        image,
      });
    }
  
    const structuredPlans: GroupedPlan[] = Object.entries(grouped).map(
      ([dayStr, activities]) => {
        
        activities.sort((a, b) => {
          const toMinutes = (timeStr: string) => {
            const [hourMin, suffix] = timeStr.split(" ");
            const [hourStr, minStr] = hourMin.split(":");
            let hour = parseInt(hourStr, 10);
            const minutes = parseInt(minStr, 10);
            if (suffix === "PM" && hour !== 12) hour += 12;
            if (suffix === "AM" && hour === 12) hour = 0;
            return hour * 60 + minutes;
          };
          return toMinutes(a.time) - toMinutes(b.time);
        });
    
        const day = parseInt(dayStr, 10);
        const date = new Date(2025, 2, 19 + (day - 1));
        const label = `Day ${day} - ${date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}`;
    
        return {
          label,
          date: date.toISOString().split("T")[0],
          activities,
        };
      }
    );
    
  
    setPlans(structuredPlans);
  }, []);
  

  
  function formatTo12Hour(time: string): string {
    const [h, m] = time.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${suffix}`;
  }
  /*
  const [plans, setPlans] = useState<DayPlan[]>(defaultPlans)
  */
  const [showTable, setShowTable] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  

  const getActivityByTime = (activities: Activity[], time: string) =>
    activities.find((a) => a.time === time)

  const removeActivity = (dayIndex: number, time: string) => {
    const newPlans = [...plans]
    newPlans[dayIndex].activities = newPlans[dayIndex].activities.filter(a => a.time !== time)
    setPlans(newPlans)
  }

  const addActivity = (dayIndex: number, time: string) => {
    const newPlans = [...plans]
    newPlans[dayIndex].activities.push({
      time,
      title: 'New Activity',
      location: 'Add location...',
      image: '',
    })
    setPlans(newPlans)
  }

  

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6 space-y-6 m-auto w-[900px] justify-center items-center">
        {showTable ? (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-[35px] font-bold text-center">Your Saved Trip Plan</div>
              <div className="text-[20px] text-gray-500 text-center">
              Here‘s a summary of your Thailand adventure itinerary              
              </div>
            </div>
            <div className="flex justify-center rounded-[10px] overflow-hidden border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Time</th>
                  <th className="border px-4 py-2">Activity</th>
                  <th className="border px-4 py-2">Location</th>
                  <th className="border px-4 py-2">Note</th>
                  <th className="border px-4 py-2">Accommodation</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((day) =>
                  day.activities.map((activity, idx) => (
                    <tr key={`${day.date}-${idx}`} className="text-sm">
                      {idx === 0 && (
                        <td rowSpan={day.activities.length} className="border px-4 py-2 text-gray-600 font-medium">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                      )}
                      <td className="border px-4 py-2">{activity.time}</td>
                      <td className="border px-4 py-2">{activity.title}</td>
                      <td className="border px-4 py-2">{activity.location}</td>
                      <td className="border px-4 py-2 text-gray-400">—</td>
                      <td className="border px-4 py-2 text-gray-400">Hilton Hotel</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowTable(false)}
                className="border border-black text-gray-700 px-4 py-2 rounded-[10px] hover:bg-gray-100"
              >
                Back to Planner
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-[35px] font-bold text-center">Plan Your Thailand Adventure</div>
              <div className="text-[20px] text-gray-500 text-center">
                Create a personalized daily itinerary for your perfect Thai getaway
              </div>
            </div>

            <div className="p-10 border border-black bg-white rounded-[10px] flex flex-col gap-5">
              <div className="text-gray-500">
                Here is our AI suggestion plan trip. Feel free to do your edit add or delete!
              </div>

              {plans.map((plan, dayIndex) => (
                <div key={plan.date} className="bg-[#F9FAFB] p-4 rounded-[15px] space-y-4">
                  <div className="flex gap-2">
                    <img src="calendar.png" className="object-contain w-[20px]" />
                    <div className="text-lg font-semibold text-black">{plan.label}</div>
                  </div>

                  <div className="flex overflow-x-auto flex-nowrap gap-4 pb-2">
                    {timeSlots.map((time) => {
                      const activity = getActivityByTime(plan.activities, time)
                      return (
                        <div key={time}>
                          {activity ? (
                            <div className="flex-shrink-0 flex flex-col w-[200px] rounded-[10px] border bg-white">
                              {activity.image && (
                                <img
                                  className="h-[60px] object-cover rounded-t-[10px]"
                                  src={activity.image}
                                  alt=""
                                />
                              )}
                              <div className="m-[10px] flex flex-col gap-2">
                                <div className="text-xs text-gray-500">{time}</div>
                                <div className="font-semibold text-sm">{activity.title}</div>
                                <div className="flex justify-between">
                                  <div className="flex gap-2">
                                    <img src="marker.png" className="w-[12px] object-contain" alt="" />
                                    <div className="text-xs text-gray-500">{activity.location}</div>
                                  </div>
                                  <Trash2
                                    className="w-4 h-4 text-red-500 cursor-pointer"
                                    onClick={() => removeActivity(dayIndex, time)}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col w-[200px] h-fit rounded-[10px] border bg-white">
                              <div className="flex items-center justify-center p-4 flex-col">
                                <div className="text-xs text-gray-500">{time}</div>
                                <button
                                  onClick={() => {
                                    setSelectedTime(time)
                                    setSelectedDayIndex(dayIndex)
                                    setModalOpen(true)
                                  }}
                                  className="text-blue-500 text-sm border border-blue-200 rounded px-2 py-1"
                                >
                                  + Add Activity
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              <div className="justify-items-center mt-[10px]">
                <button
                  onClick={() => setShowTable(true)}
                  className="bg-sky-500 text-white px-4 py-2 rounded-[10px] flex gap-2"
                >
                  <img src="/search.png" className="w-[12px] object-contain invert-100" />
                  <p>Find Your Trip Plan</p>
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[600px] h-[600px] p-6 relative">
            <div className="flex justify-between items-center mb-[10px]">
              <div></div>
              <h2 className="text-xl font-bold text-center">Add to Itinerary</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-red-500">
                X
              </button>
            </div>
            <hr className="mb-[10px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places..."
              className="w-full p-2 border rounded mb-[10px]"
            />

            <div className="text-gray-500 font-[12px] mb-[10px]">Select Item to add to your itinerary</div>
            <div className="space-y-4 overflow-auto max-h-[400px]">
              {places
                .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((place) => (
                  <div
                    key={place.title}
                    className="flex border rounded p-3 gap-4 items-center"
                    onClick={() => {
                      if (selectedDayIndex === null || selectedTime === null) return
                      const updatedPlans = [...plans]
                      const plan = updatedPlans[selectedDayIndex]
                    
                      // Remove any existing activity at that time
                      plan.activities = plan.activities.filter((a) => a.time !== selectedTime)
                    
                      // Add the new activity
                      plan.activities.push({
                        time: selectedTime,
                        title: place.title,
                        location: place.title,
                        image: place.image || "test.png",
                      })
                    
                      // Sort activities by time
                      plan.activities.sort((a, b) => {
                        const toMinutes = (timeStr: string) => {
                          const [hourMin, suffix] = timeStr.split(" ");
                          const [hourStr, minStr] = hourMin.split(":");
                          let hour = parseInt(hourStr, 10);
                          const minutes = parseInt(minStr, 10);
                          if (suffix === "PM" && hour !== 12) hour += 12;
                          if (suffix === "AM" && hour === 12) hour = 0;
                          return hour * 60 + minutes;
                        };
                        return toMinutes(a.time) - toMinutes(b.time);
                      });
                    
                      setPlans(updatedPlans)
                      setModalOpen(false)
                      setSelectedTime(null)
                      setSelectedDayIndex(null)
                    }}
                    
                  >
                    <img src={place.image} alt="" className="w-[80px] h-[80px] rounded object-cover" />
                    <div className="flex-grow">
                      <div className="font-bold">{place.title}</div>
                      <div className="text-sm text-gray-500">{place.tags}</div>
                      <div className="text-xs text-gray-400">{place.description?.slice(0, 100)}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
