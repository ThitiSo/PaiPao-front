'use client'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

// Utility to generate time labels
const timeSlots = Array.from({ length: 15 }, (_, i) => {
  const hour = 8 + i
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour > 12 ? hour - 12 : hour
  return `${String(formattedHour).padStart(2, '0')}:00 ${suffix}`
})

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

const defaultPlans: DayPlan[] = [
  {
    date: '2025-03-20',
    label: 'Day 1 - Thursday, March 20',
    activities: [
      {
        time: '08:00 AM',
        title: 'Visit Bangsaen Beach',
        location: 'Bangsaen Beach',
        image: '/test.png',
      },
      {
        time: '10:00 AM',
        title: 'Eating Breakfast',
        location: 'PAPPER International Buffet',
        image: '/test.png',
      },
    ],
  },
  {
    date: '2025-03-21',
    label: 'Day 2 - Friday, March 21',
    activities: [],
  },
]

export default function TimeSlotDayBox() {
  const [plans, setPlans] = useState<DayPlan[]>(defaultPlans)
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

  const places = [
    {
      name: "Wat Arun",
      location: "Bangkok",
      description: "Beautiful riverside temple with stunning sunset views.",
      image: "/wat-arun.jpg"
    },
    {
      name: "Chatuchak Market",
      location: "Bangkok",
      description: "Massive market with everything from clothes to street food.",
      image: "/chatuchak.jpg"
    },
  ]

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
                .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((place) => (
                  <div
                    key={place.name}
                    className="flex border rounded p-3 gap-4 items-center"
                    onClick={() => {
                      if (selectedDayIndex === null || selectedTime === null) return
                      const updatedPlans = [...plans]
                      const plan = updatedPlans[selectedDayIndex]
                      plan.activities = plan.activities.filter((a) => a.time !== selectedTime)
                      plan.activities.push({
                        time: selectedTime,
                        title: place.name,
                        location: place.location,
                        image: place.image,
                      })
                      setPlans(updatedPlans)
                      setModalOpen(false)
                      setSelectedTime(null)
                      setSelectedDayIndex(null)
                    }}
                  >
                    <img src={place.image} alt="" className="w-[80px] h-[80px] rounded object-cover" />
                    <div className="flex-grow">
                      <div className="font-bold">{place.name}</div>
                      <div className="text-sm text-gray-500">{place.location}</div>
                      <div className="text-xs text-gray-400">{place.description}</div>
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
