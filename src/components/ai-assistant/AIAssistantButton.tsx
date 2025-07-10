import React, { useState, useEffect } from "react";
import {
  Bot,
  TrendingUp,
  Navigation,
  Target,
  X,
  Mic,
  MicOff,
  DollarSign,
  MapPin,
  Clock,
  Zap,
  Award,
  Fuel,
  CloudRain,
} from "lucide-react";

interface AIAssistantProps {
  className?: string;
}

interface EarningsData {
  currentHourly: number;
  projectedDaily: number;
  surgeMultiplier: number;
}

interface RouteData {
  currentTraffic: "light" | "moderate" | "heavy";
  weatherAlert: string | null;
}

interface GoalData {
  weeklyGoal: number;
  currentEarnings: number;
  progress: number;
  currentTier: string;
  nextTier: string;
}

export const AIAssistantButton: React.FC<AIAssistantProps> = ({
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"earnings" | "drive" | "goals">(
    "earnings",
  );
  const [isListening, setIsListening] = useState(false);
  const [aiActivity, setAiActivity] = useState(false);

  // Mock data - in real app this would come from APIs
  const [earningsData] = useState<EarningsData>({
    currentHourly: 24,
    projectedDaily: 180,
    surgeMultiplier: 1.8,
  });

  const [routeData] = useState<RouteData>({
    currentTraffic: "moderate",
    weatherAlert: "Light rain expected in 2 hours",
  });

  const [goalData] = useState<GoalData>({
    weeklyGoal: 1200,
    currentEarnings: 420,
    progress: 35,
    currentTier: "Silver",
    nextTier: "Gold",
  });

  // Simulate AI activity
  useEffect(() => {
    const interval = setInterval(() => {
      setAiActivity((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // In real app, this would integrate with speech recognition
  };

  const tabs = [
    { id: "earnings" as const, label: "Earnings", icon: TrendingUp },
    { id: "drive" as const, label: "Drive", icon: Navigation },
    { id: "goals" as const, label: "Goals", icon: Target },
  ];

  const renderEarningsTab = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-[#c1f11d] to-[#a8d919] p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-black">Hourly Rate</span>
          <Zap className="w-4 h-4" />
        </div>
        <div className="text-2xl font-bold text-black">
          ${earningsData.currentHourly}
        </div>
        <div className="text-sm text-black/70">
          +{((earningsData.surgeMultiplier - 1) * 100).toFixed(0)}% surge active
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Today's Projection</div>
        <div className="text-xl font-semibold text-black">
          ${earningsData.projectedDaily}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start gap-2">
          <Bot className="w-4 h-4 text-blue-600 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-blue-900">AI Tip</div>
            <div className="text-xs text-blue-700 mt-1">
              Airport area showing high demand. Consider heading there for
              better earnings.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDriveTab = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-black">Traffic Status</span>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              routeData.currentTraffic === "light"
                ? "bg-green-100 text-green-800"
                : routeData.currentTraffic === "moderate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {routeData.currentTraffic}
          </div>
        </div>
      </div>

      {routeData.weatherAlert && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium text-blue-900">Weather</div>
              <div className="text-xs text-blue-700">
                {routeData.weatherAlert}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderGoalsTab = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Weekly Loyalty Tiers</span>
          <Target className="w-4 h-4" />
        </div>
        <div className="text-2xl font-bold">${goalData.currentEarnings}</div>
        <div className="text-sm opacity-90">
          of ${goalData.weeklyGoal} weekly goal
        </div>
        <div className="mt-3 bg-white/20 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${goalData.progress}%` }}
          />
        </div>
        <div className="text-xs opacity-90 mt-1">
          {goalData.progress}% to {goalData.nextTier} tier
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Current Tier</div>
        <div className="text-xl font-semibold text-black">
          {goalData.currentTier}
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <div className="flex items-start gap-2">
          <Bot className="w-4 h-4 text-orange-600 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-orange-900">
              Weekly Tip
            </div>
            <div className="text-xs text-orange-700 mt-1">
              Complete 5 more rides to reach {goalData.nextTier} tier and unlock
              bonus rewards!
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating AI Button */}
      <div className={`fixed bottom-16 right-6 z-30 ${className}`}>
        <button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 bg-gradient-to-r from-[#c1f11d] to-[#a8d919] rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            aiActivity ? "animate-pulse" : ""
          }`}
        >
          <Bot className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* AI Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-end justify-center">
          <div className="bg-white w-full max-w-[360px] h-[70vh] rounded-t-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#c1f11d] to-[#a8d919]">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-black" />
                <div>
                  <h2 className="font-bold text-black">AI Driver Assistant</h2>
                  <p className="text-xs text-black/70">
                    Maximizing your earnings
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVoiceToggle}
                  className={`p-2 rounded-full transition-colors ${
                    isListening
                      ? "bg-red-500 text-white"
                      : "bg-white/20 text-black"
                  }`}
                >
                  {isListening ? (
                    <Mic className="w-4 h-4" />
                  ) : (
                    <MicOff className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/20 text-black hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-[#c1f11d] border-b-2 border-[#c1f11d] bg-gray-50"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "earnings" && renderEarningsTab()}
              {activeTab === "drive" && renderDriveTab()}
              {activeTab === "goals" && renderGoalsTab()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
