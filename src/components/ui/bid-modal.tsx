import React, { useState } from 'react';
import { X, MapPin, Navigation, DollarSign } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: number;
    destination: string;
    origin: string;
    totalPrice: string;
    distance: string;
    passengerName: string;
  };
  onBidSubmit: (orderId: number, bidAmount: string) => void;
}

export const BidModal: React.FC<BidModalProps> = ({
  isOpen,
  onClose,
  order,
  onBidSubmit,
}) => {
  if (!isOpen) return null;

  const currentPrice = parseFloat(order.totalPrice);
  const plus5Price = (currentPrice * 1.05).toFixed(2);
  const plus10Price = (currentPrice * 1.10).toFixed(2);

  const handleSubmitBid = (bidAmount: string) => {
    onBidSubmit(order.id, bidAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full h-full max-w-[360px] max-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#c1f11d]" />
            <span className="font-semibold text-black">Place Your Bid</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Map Section (Top 2/3) */}
        <div className="flex-1 bg-gray-100 relative">
          {/* Mock Map with Route */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Route Line */}
            <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-[#c1f11d] transform -translate-y-1/2 rounded-full shadow-lg"></div>
            {/* Origin Point */}
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-[#c1f11d] rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md text-xs font-medium text-black whitespace-nowrap">
                {order.origin}
              </div>
            </div>
            {/* Destination Point */}
            <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md text-xs font-medium text-black whitespace-nowrap">
                {order.destination}
              </div>
            </div>
            {/* Distance Indicator */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#c1f11d]" />
                <span className="text-sm font-medium text-black">{order.distance} km</span>
              </div>
            </div>
            {/* ETA Indicator */}
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#c1f11d] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-black">ETA: 8 min</span>
              </div>
            </div>
          </div>
          {/* Passenger Info Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#c1f11d]" />
                    <span className="text-sm font-medium text-black">Passenger: {order.passengerName}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bidding Section (Bottom 1/3) */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="space-y-4">
            {/* Bid Options */}
            <div className="space-y-4">
              {/* Current Price */}
              <button
                onClick={() => handleSubmitBid(order.totalPrice)}
                className="w-full p-6 rounded-xl border-2 border-[#c1f11d] bg-gradient-to-r from-[#c1f11d] to-[#a8d919] hover:from-[#a8d919] hover:to-[#c1f11d] transition-all duration-200 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-black">${order.totalPrice}</div>
                </div>
              </button>

              {/* +5% Price */}
              <button
                onClick={() => handleSubmitBid(plus5Price)}
                className="w-full p-6 rounded-xl border-2 border-[#c1f11d] bg-gradient-to-r from-[#c1f11d] to-[#a8d919] hover:from-[#a8d919] hover:to-[#c1f11d] transition-all duration-200 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-black">${plus5Price}</div>
                </div>
              </button>

              {/* +10% Price */}
              <button
                onClick={() => handleSubmitBid(plus10Price)}
                className="w-full p-6 rounded-xl border-2 border-[#c1f11d] bg-gradient-to-r from-[#c1f11d] to-[#a8d919] hover:from-[#a8d919] hover:to-[#c1f11d] transition-all duration-200 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-black">${plus10Price}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 