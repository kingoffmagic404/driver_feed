import { FilterIcon, MenuIcon, Zap } from "lucide-react";
import React from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

export const MainContentSection = (): JSX.Element => {
  // Status icons data
  const statusIcons = [
    {
      alt: "Combined shape",
      src: "/combined-shape-2.svg",
      wrapperClass:
        "relative w-[19px] h-[13.0px] bg-[url(/combined-shape.svg)] bg-[100%_100%]",
      imgClass: "absolute w-4 h-[11px] top-0.5 left-px",
    },
    {
      alt: "Combined shape",
      src: "/combined-shape-1.svg",
      wrapperClass:
        "relative w-[13px] h-[13px] bg-[url(/shape.svg)] bg-[100%_100%]",
      imgClass: "absolute w-[11px] h-[11px] top-0.5 left-0",
    },
    {
      alt: "Cellular",
      src: "/cellular.svg",
      imgClass: "relative w-[9px] h-3.5",
    },
  ];

  return (
    <header className="flex flex-col items-center gap-[25px] w-full border-b border-gray-200 bg-white sticky top-0 z-10">
      {/* Status bar and navigation */}
      <div className="flex flex-col w-full items-start bg-white border-b border-[#e4e5e6]">
        {/* Status bar */}
        <div className="flex flex-col items-end gap-2.5 px-4 py-1 w-full">
          <div className="inline-flex items-center justify-end gap-[5px]">
            {statusIcons.map((icon, index) =>
              icon.wrapperClass ? (
                <div key={`status-icon-${index}`} className={icon.wrapperClass}>
                  <img
                    className={icon.imgClass}
                    alt={icon.alt}
                    src={icon.src}
                  />
                </div>
              ) : (
                <img
                  key={`status-icon-${index}`}
                  className={icon.imgClass}
                  alt={icon.alt}
                  src={icon.src}
                />
              ),
            )}
            <div className="relative w-[35px] mt-[-1.00px] font-['Roboto',Helvetica] font-normal text-black text-sm text-right tracking-[0] leading-4">
              20:30
            </div>
          </div>
        </div>

        {/* Navigation bar */}
        <nav className="flex h-14 items-center w-full bg-white">
          <button className="flex items-center justify-center w-14 h-14">
            <MenuIcon className="w-6 h-6 text-black" />
          </button>
          <div className="flex-1" />
          <button className="flex items-center justify-center w-14 h-14">
            <FilterIcon className="w-6 h-6 text-black" />
          </button>
        </nav>
      </div>

      {/* Online/Offline toggle */}
      <ToggleGroup
        type="single"
        defaultValue="online"
        className="absolute top-8 left-1/2 transform -translate-x-1/2 p-1 rounded-2xl bg-white shadow-sm border border-gray-200"
      >
        <ToggleGroupItem value="offline" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100">
          <span>
            Offline
          </span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="online"
          className="px-4 py-2 rounded-xl bg-[#c1f11d] text-black shadow-sm"
        >
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-black" />
            <span className="text-sm font-medium">
            Online
            </span>
          </div>
        </ToggleGroupItem>
      </ToggleGroup>
    </header>
  );
};
