import React, { useState } from "react";
import { AIAssistantButton } from "../../components/ai-assistant/AIAssistantButton";
import { MainContentSection } from "./sections/MainContentSection";
import { OrdersListSection } from "./sections/OrdersListSection";
import { usePullToRefresh } from "../../lib/usePullToRefresh";
import { PullToRefreshIndicator } from "../../components/ui/PullToRefreshIndicator";

export const DriverFeed: React.FC = (): JSX.Element => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = async () => {
    // Simulate API call delay for fetching new orders
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Force re-render by updating refresh key
    setRefreshKey((prev) => prev + 1);
  };

  const {
    containerRef,
    isPulling,
    isRefreshing,
    pullDistance,
    pullProgress,
    isTriggered,
  } = usePullToRefresh({ onRefresh: handleRefresh });

  return (
    <div
      ref={containerRef}
      className="bg-white flex flex-col items-center justify-start w-full min-h-screen overflow-y-auto"
      style={{
        transform: isPulling
          ? `translateY(${Math.min(pullDistance * 0.5, 40)}px)`
          : "translateY(0px)",
        transition: isPulling ? "none" : "transform 0.3s ease-out",
      }}
    >
      <PullToRefreshIndicator
        pullDistance={pullDistance}
        isRefreshing={isRefreshing}
        isTriggered={isTriggered}
        pullProgress={pullProgress}
      />
      <div className="bg-white w-full max-w-[360px] flex flex-col relative sticky top-0 z-10">
        <MainContentSection />
      </div>
      <div className="w-full max-w-[360px] flex flex-col relative flex-1 overflow-y-auto pb-16">
        <OrdersListSection key={refreshKey} />
      </div>
      <AIAssistantButton />
    </div>
  );
};
