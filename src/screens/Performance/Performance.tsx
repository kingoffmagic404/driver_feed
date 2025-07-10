import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export function Performance() {
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-[360px] mx-auto relative font-sans">
      <div className="bg-[#7B5CFA] pt-2 pb-4">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 pb-4">
          <img src="/burger-menu.svg" alt="menu" className="w-6 h-6" />
          <div className="flex items-center gap-2">
            <img src="/cellular.svg" alt="cellular" />
            <span className="text-xs text-white font-semibold tracking-wide" style={{ fontFamily: 'SF Pro Text, Noto Sans, Helvetica, Arial, sans-serif' }}>20:30</span>
          </div>
        </div>
        {/* Profile Section */}
        <div className="px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Avatar className="w-14 h-14 border-4 border-white shadow-lg">
                <AvatarImage src="/photo6.png" alt="avatar" />
                <AvatarFallback className="bg-[#E6E6E6] text-[#7B5CFA]">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black rounded-full px-2 py-0.5 flex items-center gap-1 border-2 border-white shadow">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFD600" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                </svg>
                <span className="text-sm text-white font-bold">4.95</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-white leading-7 tracking-tight" style={{ fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif' }}>Platinum</span>
                <img src="/combined-shape.svg" alt="diamond" className="w-6 h-6" />
              </div>
              <span className="text-white/70 text-base font-normal" style={{ fontFamily: 'SF Pro Text, Noto Sans, Helvetica, Arial, sans-serif' }}>Your tier this week</span>
            </div>
          </div>
          <div className="bg-white/20 rounded-2xl p-4 mb-4">
            <div className="text-white text-sm mb-2 font-medium">Rides for Platinum completed</div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="w-full h-2.5 bg-white/20 rounded-full relative">
                  <div className="h-2.5 bg-white rounded-full absolute left-0 top-0" style={{ width: '100%' }}></div>
                </div>
              </div>
              <img src="/combined-shape-2.svg" alt="arrow" className="w-6 h-6" />
            </div>
            <div className="text-white/80 text-sm mt-2">Keep 4.95+ rating</div>
          </div>
          <Button className="w-full bg-white text-[#323942] hover:bg-white/90 font-semibold py-3 rounded-2xl mb-4 shadow-md text-base">See benefits</Button>
        </div>
      </div>
      {/* Income Card */}
      <div className="bg-white rounded-t-3xl flex-1 px-4 pt-4 pb-32 -mt-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#6A6B6E] text-sm font-medium">Today's income</span>
            <svg className="w-5 h-5 text-[#6A6B6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="flex items-end justify-between mb-1">
            <span className="text-3xl font-extrabold text-[#141414] leading-8">26 000 ₸</span>
            <span className="text-[#6A6B6E] text-base font-medium">35 000 ₸</span>
          </div>
          <div className="w-full h-2.5 bg-[#E6E6E6] rounded-full relative">
            <div className="h-2.5 bg-black rounded-full absolute left-0 top-0" style={{ width: '74%' }}></div>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-[#E6E6E6]">
          <div className="flex items-center gap-3">
            <img src="/wallet.svg" alt="wallet" className="w-7 h-7" />
            <div>
              <div className="text-lg font-bold text-[#141414]">0 ₸</div>
              <div className="text-[#6A6B6E] text-xs">Wallet balance</div>
            </div>
          </div>
          <div className="w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#6A6B6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-[#E6E6E6]">
          <div className="flex items-center gap-3">
            <img src="/money-2.svg" alt="bonus" className="w-7 h-7" />
            <div>
              <div className="text-lg font-bold text-[#141414]">0</div>
              <div className="text-[#6A6B6E] text-xs">Bonuses</div>
            </div>
          </div>
          <div className="w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#6A6B6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
              </svg>
            </div>
            <div className="text-lg font-bold text-[#141414]">Achievements</div>
          </div>
          <div className="w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#6A6B6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
