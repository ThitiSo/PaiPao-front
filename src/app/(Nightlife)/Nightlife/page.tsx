"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
{ href: "/", icon: "/home.png", label: "Home" },
{ href: "/TripPlanner", icon: "/Location.png", label: "Trip Planner" },
{ href: "https://www.agoda.com/", icon: "/Hotel.png", label: "Hotel" },
{ href: "/Nightlife", icon: "/nightlife.png", label: "Nightlife" },
];

export default function Page() {
const pathname = usePathname();

return (
<>
  <header className="w-full p-4 flex justify-between items-center text-sm bg-[#120E1B]">
    <div className="text-[40px] font-bold bg-gradient-to-r from-[#00f0ff] to-[#d000ff] bg-clip-text text-transparent">
      <a href="/">PaiPao</a>
    </div>
    <div className="flex gap-7">
      {navItems.map(({ href, icon, label }) => {
      const isActive = pathname === href;
      return (
      <a key={href} href={href}>
        <button className={`rounded-[10px] px-4 py-2 flex items-center gap-2 text-[25px] transition ${isActive
          ? "bg-[#CF50E2] text-white" : "bg-transparent text-white hover:bg-[#CF50E2] " }`}>
          <Image src={icon} alt={label} width={20} height={20} className={`${isActive ? "invert" :"invert"}`} />
          {label}
        </button>
      </a>
      );
      })}
    </div>
  </header>





  <main className="flex-grow p-30 space-y-6 m-auto bg-[#120E1B]">
    <div className=" flex flex-col gap-2 items-center text-center">
      <div
        className="text-[50px] font-bold text-center bg-gradient-to-r from-[#00f0ff] to-[#d000ff] bg-clip-text text-transparent">
        Thailand Nightlife
      </div>
      <div className="text-[30px] text-gray-500 text-center w-3/4">Explore Thailand's vibrant nightlife scene, from
        rooftop bars in Bangkok to beach parties in Koh
        Phangan.</div>
    </div>
    {/* Column*/}
    <div className="flex flex-col border border-[#2c1448] p-10 bg-[#120E1B] rounded-[10px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-5 w-3/5">
          <div className="flex gap-2 items-center text-[#00f0ff] rounded-[20px] p-2 bg-[#2c1448] w-fit">
            <img src="Location.png" className="h-[18px] invert brightness-0 " />
            <div>Location-based</div>
          </div>

          <div className="text-[30px] font-bold"><span className="text-white">Discover Nightlife</span> <span className="text-[#00f0ff]">Near You</span></div>
          <div className="text-[#ABB0BA] text-[25px]">Allow location access to find the hottest bars, clubs and entertainment
            venues around you in Thailand.</div>
          
          <div className="relative inline-block rounded-[15px] w-fit">
          <div
            className="absolute inset-0 rounded-[15px] blur-md opacity-70 bg-gradient-to-r from-[#00f0ff] to-[#d000ff] z-[-1]">
          </div>

          <div className="p-3 rounded-[10px] w-fit text-white text-black bg-gradient-to-r from-[#00f0ff] to-[#d000ff]">

            <div className="flex gap-2 items-center">
            
            <img src="target.png" className="h-[20px]"/>
            <div className="text-[25px]">
              Find Nightlife Near Me!
            </div>
          </div>

          </div>
        </div>
        </div>

        <div className="items-center text-white bg-[#201c3c] rounded-[10px]">
          <div className="p-5  flex flex-col text-center text-[25px]">
            <div>Distance Filter</div>
            <div className="flex justify-between gap-2 items-center font-bold mt-[10px]">
            <a href="Nightlife"><div className="rounded-[20px] p-2 bg-[#9D4EDD]">All venues</div></a>
              <a href="5km"><div className="rounded-[20px] p-2 border border-[#2F2442]">5 km</div></a>
              <a href="10km"><div className="rounded-[20px] p-2 border border-[#2F2442]">10 km</div></a>
              <a href="20km"><div className="rounded-[20px] p-2 border border-[#2F2442]">20 km</div></a>
            </div>

          </div>


        </div>
      </div>
    </div>


    {/*Experience*/}

    <div className="relative w-full rounded-[10px] text-[25px]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url(/Nightlifeexperience.png)] bg-cover bg-center brightness-50 z-0 rounded-[10px]"></div>

      {/* Foreground content */}
      <div className="relative z-10 flex border p-10 justify-between items-center rounded-[10px] border-[#2F2442]">
        <div className="flex flex-col gap-5 w-3/4">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex gap-2 pt-1 pb-1 pr-2 pl-2 border border-[#2F2442] rounded-[20px]">
              <img src="aigemini.png" className="h-[20px] invert"/>
              <div className="text-[#00f0ff]">Featured Experience</div>
            </div>
            <div className="text-2xl text-white font-bold">Experience Thailand's Electric Nightlife</div>
            <div className="text-center text-[#ABB0BA]">
              From rooftop bars with stunning city views to beachside full moon parties, Thailand offers some of Asia's
              most renowned nightlife experiences. Discover the perfect venues for your evening adventures.
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 rounded-[20px] bg-[#517AE1] pt-1 pb-1 pr-2 pl-2 text-white items-center">
              <img src="beer.png" className="h-[20px] invert"/>
              <div>Bar</div>
            </div>
            <div className="flex gap-2 rounded-[20px]  bg-[#517AE1] pt-1 pb-1 pr-2 pl-2 text-white items-center">
            <img src="music.png" className="h-[20px] invert"/>
              <div>Clubs</div>
            </div>
            <div className="flex gap-2 rounded-[20px] bg-[#517AE1] pt-1 pb-1 pr-2 pl-2 text-white items-center">
            <img src="beach.png" className="h-[20px] invert"/>
              <div>Beach Parties</div>
            </div>
          </div>
        </div>


        <div className="relative inline-block rounded-[15px]">
          <div
            className="absolute inset-0 rounded-[15px] blur-md opacity-70 bg-gradient-to-r from-[#00f0ff] to-[#d000ff] z-[-1]">
          </div>

          <div className="p-3 rounded-[10px] w-fit text-white text-black bg-gradient-to-r from-[#00f0ff] to-[#d000ff]">

            Explore All Venue

          </div>
        </div>

      </div>
    </div>


    {/* Card flex*/}
    <div className="flex justify-center">
      <div className="flex flex-wrap  justify-between gap-10">

        <div className=" w-4/17 rounded-[10px] border border-[#2F2442] bg-[#20142c]">
          <img src="test.png" className="h-[150px] w-full rounded-t-[10px]" />
          <div className="flex flex-col gap-5 p-10">
            <div className="text-[25px] font-bold text-white">
              Sky Bar
            </div>
            <div className="flex gap-2 items-center">
              <img src="location.png" className="h-[18px] invert" />
              <div className="text-[#ABB0BA]">
                Bangkok
              </div>
            </div>
            <div className="text-[#ABB0BA]">
              Rooftop bar with panoramic views of Bangkok
              skyline, featured in The Hangover II movie.
            </div>
            <div className="text-white">
              Rooftop Bar
            </div>
            <div className="flex gap-2 items-center  mt-[10px] text-white">
              
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Cocktails</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Skylines View</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Upscale</div>
            </div>
          </div>
        </div>
        <div className=" w-4/17 rounded-[10px] border border-[#2F2442] bg-[#20142c]">
          <img src="test.png" className="h-[150px] w-full rounded-t-[10px]" />
          <div className="flex flex-col gap-5 p-10">
            <div className="text-[25px] font-bold text-white">
              Sky Bar
            </div>
            <div className="flex gap-2 items-center">
              <img src="location.png" className="h-[18px] invert" />
              <div className="text-[#ABB0BA]">
                Bangkok
              </div>
            </div>
            <div className="text-[#ABB0BA]">
              Rooftop bar with panoramic views of Bangkok
              skyline, featured in The Hangover II movie.
            </div>
            <div className="text-white">
              Rooftop Bar
            </div>
            <div className="flex gap-2 items-center  mt-[10px] text-white">
              
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Cocktails</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Skylines View</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Upscale</div>
            </div>
          </div>
        </div>
        <div className=" w-4/17 rounded-[10px] border border-[#2F2442] bg-[#20142c]">
          <img src="test.png" className="h-[150px] w-full rounded-t-[10px]" />
          <div className="flex flex-col gap-5 p-10">
            <div className="text-[25px] font-bold text-white">
              Sky Bar
            </div>
            <div className="flex gap-2 items-center">
              <img src="location.png" className="h-[18px] invert" />
              <div className="text-[#ABB0BA]">
                Bangkok
              </div>
            </div>
            <div className="text-[#ABB0BA]">
              Rooftop bar with panoramic views of Bangkok
              skyline, featured in The Hangover II movie.
            </div>
            <div className="text-white">
              Rooftop Bar
            </div>
            <div className="flex gap-2 items-center  mt-[10px] text-white">
              
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Cocktails</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Skylines View</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Upscale</div>
            </div>
          </div>
        </div>
        <div className=" w-4/17 rounded-[10px] border border-[#2F2442] bg-[#20142c]">
          <img src="test.png" className="h-[150px] w-full rounded-t-[10px]" />
          <div className="flex flex-col gap-5 p-10">
            <div className="text-[25px] font-bold text-white">
              Sky Bar
            </div>
            <div className="flex gap-2 items-center">
              <img src="location.png" className="h-[18px] invert" />
              <div className="text-[#ABB0BA]">
                Bangkok
              </div>
            </div>
            <div className="text-[#ABB0BA]">
              Rooftop bar with panoramic views of Bangkok
              skyline, featured in The Hangover II movie.
            </div>
            <div className="text-white">
              Rooftop Bar
            </div>
            <div className="flex gap-2 items-center  mt-[10px] text-white">
              
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Cocktails</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Skylines View</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Upscale</div>
            </div>
          </div>
        </div>
        <div className=" w-4/17 rounded-[10px] border border-[#2F2442] bg-[#20142c]">
          <img src="test.png" className="h-[150px] w-full rounded-t-[10px]" />
          <div className="flex flex-col gap-5 p-10">
            <div className="text-[25px] font-bold text-white">
              Sky Bar
            </div>
            <div className="flex gap-2 items-center">
              <img src="location.png" className="h-[18px] invert" />
              <div className="text-[#ABB0BA]">
                Bangkok
              </div>
            </div>
            <div className="text-[#ABB0BA]">
              Rooftop bar with panoramic views of Bangkok
              skyline, featured in The Hangover II movie.
            </div>
            <div className="text-white">
              Rooftop Bar
            </div>
            <div className="flex gap-2 items-center  mt-[10px] text-white">
              
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Cocktails</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Skylines View</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Upscale</div>
            </div>
          </div>
        </div>
        <div className=" w-4/17 rounded-[10px] border border-[#2F2442] bg-[#20142c]">
          <img src="test.png" className="h-[150px] w-full rounded-t-[10px]" />
          <div className="flex flex-col gap-5 p-10">
            <div className="text-[25px] font-bold text-white">
              Sky Bar
            </div>
            <div className="flex gap-2 items-center">
              <img src="location.png" className="h-[18px] invert" />
              <div className="text-[#ABB0BA]">
                Bangkok
              </div>
            </div>
            <div className="text-[#ABB0BA]">
              Rooftop bar with panoramic views of Bangkok
              skyline, featured in The Hangover II movie.
            </div>
            <div className="text-white">
              Rooftop Bar
            </div>
            <div className="flex gap-2 items-center  mt-[10px] text-white">
              
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Cocktails</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Skylines View</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Upscale</div>
            </div>
          </div>
        </div>
        <div className=" w-4/17 rounded-[10px] border border-[#2F2442] bg-[#20142c]">
          <img src="test.png" className="h-[150px] w-full rounded-t-[10px]" />
          <div className="flex flex-col gap-5 p-10">
            <div className="text-[25px] font-bold text-white">
              Sky Bar
            </div>
            <div className="flex gap-2 items-center">
              <img src="location.png" className="h-[18px] invert" />
              <div className="text-[#ABB0BA]">
                Bangkok
              </div>
            </div>
            <div className="text-[#ABB0BA]">
              Rooftop bar with panoramic views of Bangkok
              skyline, featured in The Hangover II movie.
            </div>
            <div className="text-white">
              Rooftop Bar
            </div>
            <div className="flex gap-2 items-center  mt-[10px] text-white">
              
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Cocktails</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Skylines View</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Upscale</div>
            </div>
          </div>
        </div>
        <div className=" w-4/17 rounded-[10px] border border-[#2F2442] bg-[#20142c]">
          <img src="test.png" className="h-[150px] w-full rounded-t-[10px]" />
          <div className="flex flex-col gap-5 p-10">
            <div className="text-[25px] font-bold text-white">
              Sky Bar
            </div>
            <div className="flex gap-2 items-center">
              <img src="location.png" className="h-[18px] invert" />
              <div className="text-[#ABB0BA]">
                Bangkok
              </div>
            </div>
            <div className="text-[#ABB0BA]">
              Rooftop bar with panoramic views of Bangkok
              skyline, featured in The Hangover II movie.
            </div>
            <div className="text-white">
              Rooftop Bar
            </div>
            <div className="flex gap-2 items-center  mt-[10px] text-white">
              
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Cocktails</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Skylines View</div>
              <div className="rounded-[20px] pt-1 pb-1 pr-2 pl-2 border border-[#2F2442]">Upscale</div>
            </div>
          </div>
        </div>
        
        


        



      </div>
    </div>
  </main>
  {/* Footer */}
  <footer className="w-full p-4 flex justify-between items-center text-[#ABB0BA] text-sm bg-[#120E1B]">
            <div>© 2025 PaiPao. All rights reserved.</div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact</span>
            </div>
          </footer>
</>


);
}