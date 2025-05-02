"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "/home.png", label: "Home" },
  { href: "/TripPlanner", icon: "/Location.png", label: "Trip Planner" },
  { href: "/Hotel", icon: "/Hotel.png", label: "Hotel" },
  { href: "/Nightlife", icon: "/nightlife.png", label: "Nightlife" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full p-4 flex justify-between items-center text-sm bg-transparent">
      <div className="text-[40px] font-bold">
        <a href="/">PaiPao</a>
      </div>
      <div className="flex gap-7">
        {navItems.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          return (
            <a key={href} href={href}>
              <button
                className={`rounded-[10px] px-4 py-2 flex items-center gap-2 transition text-[25px]
                  ${isActive ? "bg-blue-500 text-white"  : "bg-transparent text-black hover:bg-blue-100 "}`}
              >
                <Image src={icon} alt={label} width={20} height={20} className={`${isActive ? "invert":""}`} />
                {label}
              </button>
            </a>
          );
        })}
      </div>
    </header>
  );
}
