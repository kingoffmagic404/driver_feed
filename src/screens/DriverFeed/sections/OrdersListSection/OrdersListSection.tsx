import { ArrowRight, Star, User, TrendingUp, Award } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { NavigationModal } from "../../../../components/navigation/NavigationModal";
import { BidModal } from "../../../../components/ui/bid-modal";

// Define order data structure for mapping
const orders = [
  {
    id: 1,
    destination: "Narayanhiti Palace Museum",
    origin: "Jhamsikhel Road",
    totalPrice: "28",
    distance: "0.9",
    rating: "4.8",
    reviewCount: "739",
    passengerName: "Rajesh K.",
    passengerAvatar: "/passenger-rajesh.svg",
    badge: "great-price",
  },
  {
    id: 2,
    destination: "Trinity Int'l College",
    origin: "Rising Mall, Teendhara",
    totalPrice: "18",
    distance: "1.2",
    rating: "4.6",
    reviewCount: "203",
    passengerName: "Priya S.",
    passengerAvatar: "/passenger-priya.svg",
    badge: null,
  },
  {
    id: 3,
    destination: "Naxal Banquet",
    origin: "Devkota Memorial Institute",
    totalPrice: "25",
    distance: "1.2",
    rating: "4.9",
    reviewCount: "156",
    passengerName: "Amit L.",
    passengerAvatar: "/passenger-amit.svg",
    badge: "surge",
  },
  {
    id: 4,
    destination: "Cinemax Travels & Tours",
    origin: "Universal Engineering College",
    totalPrice: "32",
    distance: "4.7",
    rating: "4.7",
    reviewCount: "892",
    passengerName: "Sarah M.",
    passengerAvatar: "/passenger-sarah.svg",
    badge: null,
  },
];

interface SwipeToAcceptProps {
  orderId: number;
  onAccept: (orderId: number) => void;
}

const SwipeToAccept: React.FC<SwipeToAcceptProps> = ({ orderId, onAccept }) => {
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const ACCEPTANCE_THRESHOLD = 0.75;
  const MAX_SLIDE_DISTANCE = 240;

  const handleStart = (clientX: number) => {
    if (isAccepted) return;
    setIsDragging(true);
    startXRef.current = clientX;
    currentXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || isAccepted || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const deltaX = clientX - startXRef.current;
    const progress = Math.min(Math.max(deltaX / MAX_SLIDE_DISTANCE, 0), 1);

    setSwipeProgress(progress);
    currentXRef.current = clientX;
  };

  const handleEnd = () => {
    if (!isDragging || isAccepted) return;

    setIsDragging(false);

    if (swipeProgress >= ACCEPTANCE_THRESHOLD) {
      setIsAccepted(true);
      setSwipeProgress(1);
      setTimeout(() => {
        onAccept(orderId);
      }, 300);
    } else {
      setSwipeProgress(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleEnd();
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, swipeProgress]);

  const getSliderText = () => {
    if (isAccepted) return "Order Accepted!";
    if (swipeProgress >= ACCEPTANCE_THRESHOLD) return "Release to Accept";
    return "Swipe to Accept Order";
  };

  return (
    <div
      ref={containerRef}
      className="relative h-12 bg-gray-100 rounded-full overflow-hidden cursor-pointer select-none touch-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress background */}
      <div
        className={`absolute inset-0 transition-all duration-300 ease-out`}
        style={{
          background: `linear-gradient(to right, #c1f11d, #a8d919)`,
          width: `${swipeProgress * 100}%`,
          opacity: swipeProgress > 0 ? 1 : 0,
        }}
      />

      {/* Slider button */}
      <div
        className={`absolute left-1 top-1 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 transition-all duration-300 ease-out ${
          isDragging ? "scale-110" : "scale-100"
        } ${isAccepted ? "bg-[#c1f11d]" : "bg-white"}`}
        style={{
          transform: `translateX(${swipeProgress * MAX_SLIDE_DISTANCE}px)`,
          transition: isDragging ? "scale 0.2s ease-out" : "all 0.3s ease-out",
        }}
      >
        <ArrowRight
          className={`w-5 h-5 transition-colors duration-300 ${
            isAccepted ? "text-white" : "text-black"
          }`}
        />
      </div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className={`font-medium transition-all duration-300 text-sm ${
            swipeProgress > 0.3 ? "text-black" : "text-gray-600"
          } ${isAccepted ? "text-black font-semibold" : ""}`}
        >
          {getSliderText()}
        </span>
      </div>

      {/* Ripple effect when accepted */}
      {isAccepted && (
        <div className="absolute inset-0 bg-[#c1f11d] rounded-full animate-ping opacity-75" />
      )}
    </div>
  );
};

export const OrdersListSection = (): JSX.Element => {
  const [acceptedOrders, setAcceptedOrders] = useState<Set<number>>(new Set());
  const [navigationModal, setNavigationModal] = useState<{
    isOpen: boolean;
    order: (typeof orders)[0] | null;
  }>({ isOpen: false, order: null });
  const [bidModal, setBidModal] = useState<{
    isOpen: boolean;
    order: (typeof orders)[0] | null;
  }>({ isOpen: false, order: null });

  const handleAcceptOrder = (orderId: number) => {
    console.log(`Order ${orderId} accepted!`);
    setAcceptedOrders((prev) => new Set([...prev, orderId]));

    // Find the accepted order and show navigation modal
    const acceptedOrder = orders.find((order) => order.id === orderId);
    if (acceptedOrder) {
      setTimeout(() => {
        setNavigationModal({ isOpen: true, order: acceptedOrder });
      }, 300);
    }
  };

  const handleCloseNavigationModal = () => {
    setNavigationModal({ isOpen: false, order: null });
  };

  const handleOpenBidModal = (order: (typeof orders)[0]) => {
    setBidModal({ isOpen: true, order });
  };

  const handleCloseBidModal = () => {
    setBidModal({ isOpen: false, order: null });
  };

  const handleBidSubmit = (orderId: number, bidAmount: string) => {
    console.log(`Bid submitted for order ${orderId}: $${bidAmount}`);
    // Here you would typically send the bid to your backend
    // For now, we'll just close the modal and show a success message
    setBidModal({ isOpen: false, order: null });
  };

  const renderBadge = (badge: string | null) => {
    if (!badge) return null;

    if (badge === "great-price") {
      return (
        <div className="flex items-center gap-1 bg-[#c1f11d] px-2 py-1 rounded-full">
          <Award className="w-3 h-3 text-black" />
          <span className="text-xs font-medium text-black">Great Price</span>
        </div>
      );
    }

    if (badge === "surge") {
      return (
        <div className="flex items-center gap-1 bg-red-500 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3 text-white" />
          <span className="text-xs font-medium text-white">Surge</span>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="flex flex-col w-full max-w-[360px] gap-4 p-4 bg-white">
      {orders
        .filter((order) => !acceptedOrders.has(order.id))
        .map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl active:scale-[0.98] transition-all duration-200 cursor-pointer"
            onClick={() => handleOpenBidModal(order)}
          >
            {/* Header with Price, Distance, and Badge */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-2xl font-bold ${
                    order.badge === "surge" ? "text-red-500" : "text-black"
                  }`}
                >
                  ${order.totalPrice}
                </span>
                {renderBadge(order.badge)}
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  {order.distance} km
                </span>
              </div>
            </div>

            {/* Route Information */}
            <div className="px-4 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-3 h-3 bg-[#c1f11d] rounded-full"></div>
                  <div className="w-0.5 h-6 bg-gray-300"></div>
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-medium text-black truncate">
                    {order.origin}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {order.destination}
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Info */}
            <div className="flex items-center justify-between px-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={order.passengerAvatar}
                    alt={`${order.passengerName} avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to User icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML =
                          '<svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>';
                      }
                    }}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-black">
                    {order.passengerName}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#c1f11d] text-[#c1f11d]" />
                    <span className="text-xs text-gray-600">
                      {order.rating} ({order.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Swipe to Accept */}
            <div className="px-4 pb-4">
              <SwipeToAccept orderId={order.id} onAccept={handleAcceptOrder} />
            </div>
          </div>
        ))}

      {acceptedOrders.size > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 bg-[#c1f11d] text-black px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
            {acceptedOrders.size} order{acceptedOrders.size > 1 ? "s" : ""}{" "}
            accepted
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      {navigationModal.order && (
        <NavigationModal
          isOpen={navigationModal.isOpen}
          onClose={handleCloseNavigationModal}
          order={navigationModal.order}
        />
      )}

      {/* Bid Modal */}
      {bidModal.order && (
        <BidModal
          isOpen={bidModal.isOpen}
          onClose={handleCloseBidModal}
          order={bidModal.order}
          onBidSubmit={handleBidSubmit}
        />
      )}
    </section>
  );
};
