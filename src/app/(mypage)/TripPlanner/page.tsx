'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [allPlaces, setAllPlaces] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeInputIndex, setActiveInputIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('data/Cleaned_Corrected_Search_Output.json')
      .then((res) => res.json())
      .then((data) => {
        setAllPlaces(data);
        setSearchResults(data);
      });
  }, []);
  
  const [serverResponse, setServerResponse] = useState(null);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [TripName, setTripName] = useState('');
  const [TripDestination, setTripDestination] = useState('');
  const [Order, setOrder] = useState('');
  const [Budget, setBudget] = useState<number | ''>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [textInputs, setTextInputs] = useState<string[]>(['', '', '']);
  const [submittedData, setSubmittedData] = useState<{
    tags: string[];
    place: string[];
    Conditions: string[];
    dates: string[];
    Tripnames: string[];
    Destinations: string[];
    Budgets: number[];
    Orders: string[];
  }>({
    tags: [],
    place: [],
    Conditions: [],
    dates: [],
    Tripnames: [],
    Destinations: [],
    Budgets: [],
    Orders: []
  });
  
  const [isLoading, setIsLoading] = useState(false);  // State to handle loading
  const router = useRouter();

  const TagsList = ['Cultural', 'Sightseeing', 'Outdoor Activities', 'Festivel/Events', 'Food Exploration', 'Nightlife', 'Shopping', 'Spa Wellness'];
  const TagsIcon = ['/Temple.png', '/sightseeing.png', '/outdoor.png', '/festival.png', '/food.png', '/nightlife.png', '/shopping.png', '/spa.png'];
  const ConditionsList = ['Halal', 'Vegetarian'];

  const toggleTags = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(f => f !== tag) : [...prev, tag]
    );
  };

  const toggleConditions = (tag: string) => {
    setSelectedConditions(prev =>
      prev.includes(tag) ? prev.filter(f => f !== tag) : [...prev, tag]
    );
  };

  const updateText = (index: number, value: string) => {
    setTextInputs(prev => {
      const newTexts = [...prev];
      newTexts[index] = value;
      return newTexts;
    });
  };

  const removeTextInput = (index: number) => {
    setTextInputs(prev => prev.filter((_, i) => i !== index));
  };

  const addTextInput = () => {
    setTextInputs(prev => [...prev, '']);
  };

  const submitValues = async () => {
    if (!TripName || !TripDestination || !date1 || !date2 || Budget === '' ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const finalData = {
      tags: selectedTags,
      place: textInputs.filter(Boolean),
      Conditions: selectedConditions,
      dates: [date1, date2],
      Tripnames: [TripName],
      Destinations: [TripDestination],
      Budgets: [Budget],
      Orders: [Order]
    };
  
    setSubmittedData(finalData); // Update UI
    setIsLoading(true);  // Start loading

    try {
      const response = await fetch('/api/ai/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': '38a0a3e3fefc6da781a6ede6235d2f9811c49b6dbd2bded60cd9211828b9806a' // replace with Deploy token in prod
        },
        body: JSON.stringify(finalData)
      });
  
      if (!response.ok) throw new Error('Failed to send data to the server');
  
      const data = await response.json();
      console.log('Server response:', data);
      setServerResponse(data);  // Store server response here
      setIsLoading(false);  // Stop loading
      localStorage.setItem('userData',JSON.stringify(data));


      alert('Trip plan submitted successfully!');
      router.push('/Trip2');  // Navigate to /Test2 after success
    } catch (err) {
      console.error(err);
      setIsLoading(false);  // Stop loading on error
      alert('Failed to submit trip plan.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6 space-y-6 m-auto w-[900px]">
        <div className="flex flex-col gap-2">
          <div className="text-[35px] font-bold text-center">Plan Your Thailand Adventure</div>
          <div className="text-[20px] text-gray-500 text-center">Create a personalized daily itinerary for your perfect Thai getaway</div>
        </div>

        {/* Box 1,2,3 - Food Buttons in a bordered container */}
        <div className="p-4 border border-black bg-white rounded-[10px]">
          <div className="flex flex-wrap gap-2 p-[10px]">
            {/* Trip Name, Dates, Destination, Budget */}
            <div>
              <label className="block mb-1 text-sm text-center">Trip Name</label>
              <input type="text" value={TripName} onChange={(e) => setTripName(e.target.value)}
                className="border px-3 py-2 rounded-[10px] w-[380px]"
                placeholder="Enter Your Trip Name" required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-center">Select Date</label>
              <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)}
                className="border px-3 py-2 rounded-[10px] w-[190px]" required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-center">Select Date</label>
              <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)}
                className="border px-3 py-2 rounded-[10px] w-[190px]" required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-center">Destination</label>
              <input type="text" value={TripDestination} onChange={(e) => setTripDestination(e.target.value)}
                className="border px-3 py-2 rounded-[10px] w-[380px]" required
                placeholder="Enter Your Destination"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-center">Your Budget (THB)</label>
              <input type="number" value={Budget} onChange={(e) => {
                const val = e.target.value;
                // allow empty string to clear input
                setBudget(val === '' ? '' : parseInt(val));
              }}
                className="border px-3 py-2 rounded-[10px] w-[400px]"
                placeholder="Enter Your Budget" required
              />
            </div>
          </div>

          {/* Tags, Conditions, Places and Submit buttons */}
          <div className="">Which activities are you interested in?</div>
          <div className="flex flex-wrap gap-4 mt-[5px] p-[10px] justify-start">
            {TagsList.map((tag, i) => (
              <button
                key={i}
                className={`px-3 py-2 rounded-[10px] w-[180px] mt-[5px] flex justify-between items-center ${
                  selectedTags.includes(tag)
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                } border`}
                onClick={() => toggleTags(tag)}
              >
                <div>{tag}</div>
                <img
                  src={TagsIcon[i]}
                  className={`w-[20px] object-contain ${selectedTags.includes(tag) ? 'invert' : ''}`}
                  alt={tag}
                />
              </button>
            ))}
          </div>

          {/* Condition Inputs */}
          <div className="">Do you have these conditions?</div>
          <div className="flex flex-wrap gap-4 mt-[5px] p-[10px] justify-start">
            {ConditionsList.map((tag, i) => (
              <button
                key={i}
                className={`px-3 py-2 rounded-[10px] w-[180px] mt-[5px] text-left ${
                  selectedConditions.includes(tag) ? 'bg-black text-white' : 'bg-white text-black'
                } border`}
                onClick={() => toggleConditions(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Place Inputs */}
          <div className="">Let AI know your preferences by typing places you want to go!</div>
          <div className="space-y-2 p-[10px] bg-gray-100 justify-items-center rounded-[10px] mt-[10px] gap-3">
            {textInputs.map((text, index) => (
              <div key={index} className="flex items-center justify-between w-[800px] bg-white p-[12px] rounded-[10px]">
                <div className="flex gap-5">
                  <div className="flex gap-5 justify-start items-center">
                    <Image className="" src="/marker.png" height={18} width={18} alt="" />
                    <p className="">Place#{index + 1}</p>
                  </div>
                  <input
                    value={text}
                    onFocus={() => {
                      setActiveInputIndex(index);
                      setSearchQuery(text);
                      setSearchOverlayOpen(true);
                      setSearchResults(allPlaces);
                    }}
                    onChange={e => updateText(index, e.target.value)}
                    className="border px-2 py-1 rounded w-[500px]"
                    placeholder="Type a place..."
                  />
                </div>
                <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => removeTextInput(index)} />
              </div>
            ))}
            <div
              className="bg-white text-gray px-3 py-1 rounded-[10px] flex gap-2 border border-gray-200 border-[1px]"
              onClick={addTextInput}
            >
              <img src="\plus.png" className="w-[12px] object-contain"></img>
              <p>Add Place</p>
            </div>
          </div>

          {/* Special condition */}
          <div className="mt-[10px]">
            <input
              type="text"
              value={Order}
              onChange={(e) => setOrder(e.target.value)}
              className="border px-3 py-2 rounded-[10px] w-[380px] mt-[10px]"
              required
              placeholder="Any Special Condition"
            />
          </div>

          {/* Submit Button */}
          <div className="justify-items-end mt-[10px]">
            <button onClick={submitValues} className="bg-sky-500 text-white px-4 py-2 rounded-[10px] flex gap-2">
              <img src="/search.png" className="w-[12px] object-contain invert-100"></img>
              <p>Find Your Trip Plan</p>
            </button>
         
          </div>

      
        </div>
      </main>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-[10px] shadow-lg">
            <p>Loading...</p>
            <div className="loader"></div> {/* Placeholder for loading spinner */}
          </div>
        </div>
      )}

      {searchOverlayOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[700px] max-h-[80vh] overflow-auto rounded-[15px] p-6 shadow-2xl relative">
            <button onClick={() => setSearchOverlayOpen(false)} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500">×</button>
            <input
              type="text"
              className="w-full border p-2 mb-4 rounded"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (activeInputIndex !== null) updateText(activeInputIndex, val);
                const filtered = allPlaces.filter(p =>
                  p.title?.toLowerCase().includes(val.toLowerCase())
                );
                setSearchResults(filtered.slice(0, 6));
              }}
            />
            <div className="space-y-4">
              {searchResults.length > 0 ? searchResults.map((place, i) => (
                <div key={i} className="p-4 border rounded hover:bg-gray-50 cursor-pointer flex gap-5" onClick={() => {
                  if (activeInputIndex !== null) {
                    updateText(activeInputIndex, place.title);
                    setSearchOverlayOpen(false);
                  }
                }}>
                    <img src={`${place.image}`} className="w-[80px] h-[80px] rounded object-cover"/>
                    <div>
                  <div className="font-bold text-lg">{place.title}</div>
                  <div className="text-sm text-gray-500 mb-2">{place.description?.slice(0, 100)}...</div>
                  {place.tags && Array.isArray(place.tags) && (
                    <div className="flex flex-wrap gap-2 text-xs text-white">
                      {place.tags.map((tag: string, j: number) => (
                        <span key={j} className="bg-blue-500 px-2 py-1 rounded-[10px]">{tag}</span>
                      ))}
                    </div>
                  )}</div>
                </div>
              )) : <p className="text-center text-gray-400">No results found</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
