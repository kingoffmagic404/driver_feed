import { Car, TrendingUp } from "lucide-react";
import React from "react";

interface TabBarProps {
  activeTab: 'ride-requests' | 'performance' | 'wallet';
  onTabChange: (tab: 'ride-requests' | 'performance' | 'wallet') => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    {
      id: 'ride-requests' as const,
      icon: Car,
      label: "Ride requests",
    },
    {
      id: 'performance' as const,
      icon: TrendingUp,
      label: "Performance",
    },
    {
      id: 'wallet' as const,
      icon: null,
      label: "Wallet",
    },
  ];

  return (
    <nav className="w-full border-t border-gray-200 bg-white fixed bottom-0 left-0 right-0 z-20 max-w-[360px] mx-auto">
      <div className="flex h-14 items-start">
        {navigationItems.map((item) => (
          <button
            key={`nav-item-${item.id}`}
            onClick={() => onTabChange(item.id)}
            className="flex flex-1 flex-col items-center justify-center py-2 px-0.5"
          >
            {item.icon ? (
              <item.icon
                className={`w-6 h-6 ${
                  activeTab === item.id ? "text-[#7B5CFA]" : "text-gray-500"
                }`}
              />
            ) : (
              <img
                src="/wallet.svg"
                alt="wallet"
                className={`w-6 h-6 ${
                  activeTab === item.id ? "" : "opacity-50"
                }`}
              />
            )}
            <div
              className={`text-center text-xs font-medium mt-1 ${
                activeTab === item.id ? "text-[#7B5CFA]" : "text-gray-500"
              }`}
            >
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
}; 