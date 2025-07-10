import React from "react";
import { RotateCcw } from "lucide-react";

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  isTriggered: boolean;
  pullProgress: number;
}

export const PullToRefreshIndicator: React.FC<PullToRefreshIndicatorProps> = ({
  pullDistance,
  isRefreshing,
  isTriggered,
  pullProgress,
}) => {
  const opacity = Math.min(pullProgress * 1.5, 1);
  const scale = Math.min(0.5 + pullProgress * 0.5, 1);
  const rotation = isRefreshing ? 360 : pullProgress * 180;

  return (
    <div
      className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-50 transition-all duration-200 ease-out"
      style={{
        transform: `translateX(-50%) translateY(${pullDistance * 0.8}px)`,
        opacity,
      }}
    >
      {/* Refresh Icon */}
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
          isTriggered ? "bg-[#c1f11d] text-black" : "bg-gray-200 text-gray-600"
        }`}
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          animation: isRefreshing ? "spin 1s linear infinite" : "none",
        }}
      >
        <RotateCcw className="w-4 h-4" />
      </div>

      {/* Loading Spinner for refresh state */}
      {isRefreshing && (
        <div className="mt-2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-[#c1f11d] rounded-full animate-pulse"></div>
            <div
              className="w-1 h-1 bg-[#c1f11d] rounded-full animate-pulse"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1 h-1 bg-[#c1f11d] rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      )}

      {/* Progress Ring */}
      <div className="absolute inset-0 w-8 h-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.2"
            className={isTriggered ? "text-black" : "text-gray-400"}
          />
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="87.96"
            strokeDashoffset={87.96 * (1 - pullProgress)}
            className={`transition-all duration-200 ${
              isTriggered ? "text-black" : "text-gray-600"
            }`}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text indicator */}
      {pullDistance > 20 && (
        <div className="mt-8 text-xs font-medium text-gray-600 animate-fade-in">
          {isRefreshing
            ? "Refreshing..."
            : isTriggered
              ? "Release to refresh"
              : "Pull to refresh"}
        </div>
      )}
    </div>
  );
};
