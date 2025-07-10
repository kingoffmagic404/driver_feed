import React from "react";
import { AIAssistantButton } from "../../components/ai-assistant/AIAssistantButton";
import { MainContentSection } from "./sections/MainContentSection";
import { OrdersListSection } from "./sections/OrdersListSection";

export const DriverFeed: React.FC = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-col items-center justify-start w-full min-h-screen">
      <div className="bg-white w-full max-w-[360px] flex flex-col relative sticky top-0 z-10">
        <MainContentSection />
      </div>
      <div className="w-full max-w-[360px] flex flex-col relative flex-1 overflow-y-auto pb-16">
        <OrdersListSection />
      </div>
      <AIAssistantButton />
    </div>
  );
}; 