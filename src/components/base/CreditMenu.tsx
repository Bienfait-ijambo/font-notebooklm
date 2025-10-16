import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const CreditMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Example values (could come from props or API)
  const totalSpend = 1.25;
  const spendLimit = 25.0;
  const credits = 0.0;

  const percentage = Math.round((totalSpend / spendLimit) * 100);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="px-3 py-1 rounded-md border border-gray-300 bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Total Spend: <span className="font-semibold">${totalSpend}</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
          {/* Total Spend */}
          <div className="p-4 border-b">
            <p className="text-sm font-medium text-gray-600">Total Spend</p>

            <div className="flex items-center justify-between mt-2">
              {/* Circle */}
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathColor: "#22c55e", // green
                    textColor: "#374151", // gray-700
                    trailColor: "#e5e7eb", // gray-200
                    textSize: "30px",
                  })}
                />
              </div>

              {/* Spend text */}
              <div className="ml-4">
                <p className="text-xl font-semibold text-gray-800">
                  ${totalSpend.toFixed(2)}
                </p>
              
              </div>
            </div>

          </div>

          {/* Prepaid Credits */}
          <div className="p-4">
            <p className="text-sm font-medium text-gray-600">Prepaid Credits</p>
            <p className="text-2xl font-semibold text-green-600">
              ${credits.toFixed(2)}
            </p>
            <button className="mt-2 text-sm text-purple-600 hover:underline">
              Buy Credits
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


