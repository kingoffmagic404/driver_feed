import React, { useState } from "react";
import { TabBar } from "./components/navigation/TabBar";
import { DriverFeed } from "./screens/DriverFeed";
import { Performance } from "./screens/Performance";

export const App: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<'ride-requests' | 'performance' | 'wallet'>('ride-requests');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'ride-requests':
        return <DriverFeed />;
      case 'performance':
        return <Performance />;
      case 'wallet':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#7B5CFA] text-2xl font-bold">
            Wallet (Coming soon)
          </div>
        );
      default:
        return <DriverFeed />;
    }
  };

  return (
    <div className="relative">
      {renderActivePage()}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}; 