import Image from "next/image";
import Navbar from './navbar';
export default function Page() {
return (
<main className="relative min-h-screen w-full flex flex-col">
  {/* Background Image + Gradient Overlay */}
  <div className="absolute inset-0 bg-[url('/homebg.png')] bg-cover bg-center z-0" />
  <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-white/0 z-10" />

  {/* Navigation Bar (Transparent) */}
  <div
    className="relative z-50 ">
   <Navbar></Navbar>
  </div>

  {/* Main Content */}
  <div className="w-full flex items-center justify-center flex-1">
  <div className="relative z-50 flex flex-col items-center justify-center p-[30px] text-white drop-shadow w-[750px]">
    <div className="text-[50px] font-bold text-center">
      <span className="text-slate-700 opacity-80">Explore the Beauty of </span>
      <span className="text-blue-700 opacity-80">Thailand </span>
      <span className="text-slate-700 opacity-80">with </span>
      <span className="text-blue-700 opacity-80">PaiPao</span>
    </div>
    <div className="text-[20px] text-slate-700 text-center mt-4 ">
      Plan your perfect Thai adventure with real-time weather updates, curated
      destinations, and personalized itineraries.
    </div>

    <a href="TripPlanner"
      className="mt-6 bg-white text-gray-700 text-[20px] backdrop-blur-sm rounded-[10px] px-6 py-3 flex items-center gap-3 hover:bg-white/40 transition">
      <img className="w-[18px]" src="/search.png" alt="Search Icon" />
      Let’s Plan Your Trip!
    </a>
  </div></div>

  {/* Footer (Transparent) */}
  <div
    className="relative z-50 w-full p-4 flex justify-between items-center text-gray-1000 text-sm bg-transparent ">
    <div>© 2025 PaiPao. All rights reserved.</div>
    <div className="flex gap-4">
      <span>Privacy Policy</span>
      <span>Terms of Service</span>
      <span>Contact</span>
    </div>
  </div>
</main>
);
}

function NavButton({ href, icon, label }: { href: string; icon: string; label: string }) {
return (
<a href={href}>
  <button
    className="border border-white rounded-[10px] px-4 py-2 flex items-center gap-2 text-white hover:bg-white/10 transition">
    <Image src={icon} alt={label} width={20} height={20} />
    {label}
  </button>
</a>
);
}
