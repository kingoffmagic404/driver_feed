import React from "react";
import { X, Navigation, MapPin, Clock } from "lucide-react";

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: number;
    destination: string;
    origin: string;
    totalPrice: string;
    passengerName: string;
  };
}

export const NavigationModal: React.FC<NavigationModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen) return null;

  const handleNavigationApp = (app: "waze" | "google" | "apple") => {
    const destination = encodeURIComponent(order.destination);
    const origin = encodeURIComponent(order.origin);

    let url = "";

    switch (app) {
      case "waze":
        url = `https://waze.com/ul?q=${destination}&navigate=yes`;
        break;
      case "google":
        url = `https://www.google.com/maps/dir/${origin}/${destination}`;
        break;
      case "apple":
        url = `http://maps.apple.com/?daddr=${destination}&saddr=${origin}`;
        break;
    }

    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[340px] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#c1f11d] to-[#a8d919] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Navigation className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="font-bold text-black text-lg">
                  Order Accepted!
                </h2>
                <p className="text-black/70 text-sm">Ready to navigate</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 text-black hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-black">
              ${order.totalPrice}
            </span>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">ETA: 8 min</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#c1f11d] rounded-full"></div>
              <span className="text-sm text-gray-600">Pick up from:</span>
            </div>
            <p className="text-sm font-medium text-black ml-6">
              {order.origin}
            </p>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <span className="text-sm text-gray-600">Drop off at:</span>
            </div>
            <p className="text-sm font-medium text-black ml-6">
              {order.destination}
            </p>
          </div>

          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Passenger:{" "}
              <span className="font-medium text-black">
                {order.passengerName}
              </span>
            </p>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="p-4">
          <h3 className="font-medium text-black mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Choose your navigation app
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => handleNavigationApp("waze")}
              className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-black">Waze</p>
                <p className="text-xs text-gray-600">
                  Real-time traffic updates
                </p>
              </div>
            </button>

            <button
              onClick={() => handleNavigationApp("google")}
              className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-black">Google Maps</p>
                <p className="text-xs text-gray-600">
                  Comprehensive navigation
                </p>
              </div>
            </button>

            <button
              onClick={() => handleNavigationApp("apple")}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-black">Apple Maps</p>
                <p className="text-xs text-gray-600">
                  iOS integrated navigation
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
