import LocaleSwitcher from "@/shared/ui/LocaleSwitcher";
import HeroSection from "@/widgets/header/ui/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 font-['Inter']">
      <div className="min-w-screen grid place-items-end p-[10px]">
        <LocaleSwitcher />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
        <HeroSection />
      </div>
    </div>
  );
}
