
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SeatMapProps = {
  requiredSelections: Record<string, number>;
  selectionCounts: Record<string, number>;
  selections: Selection[];
  toggleSelection: (
    item: { id: string; name: string; status: string },
    type: "T5" | "T10" | "VIP" | "REG"
  ) => void;
};

export type Selection = {
  id: string;
  type: "T5" | "T10" | "VIP" | "REG";
  name: string;
};

// Mock seating data (this will be replaced with data from the API)
const tablesFor5 = [
  { id: "T5-A", name: "Table A", status: "available" },
  { id: "T5-B", name: "Table B", status: "available" },
  { id: "T5-C", name: "Table C", status: "available" },
  { id: "T5-D", name: "Table D", status: "available" },
  { id: "T5-E", name: "Table E", status: "taken" },
  { id: "T5-F", name: "Table F", status: "available" },
  { id: "T5-G", name: "Table G", status: "available" },
  { id: "T5-H", name: "Table H", status: "taken" },
];

const tablesFor10 = [
  { id: "T10-A", name: "Table A", status: "available" },
  { id: "T10-B", name: "Table B", status: "available" },
  { id: "T10-C", name: "Table C", status: "taken" },
  { id: "T10-D", name: "Table D", status: "available" },
];

const vipSeats = Array.from({ length: 20 }, (_, i) => ({
  id: `VP-${i + 1}`,
  name: `Seat ${i + 1}`,
  status: Math.random() > 0.3 ? "available" : "taken",
}));

const regularSeats = Array.from({ length: 50 }, (_, i) => ({
  id: `REG-${i + 1}`,
  name: `Seat ${i + 1}`,
  status: Math.random() > 0.2 ? "available" : "taken",
}));

const CartoonSeatMap = ({
  requiredSelections,
  selectionCounts,
  selections,
  toggleSelection,
}: SeatMapProps) => {
  return (
    <div className="w-full overflow-auto p-4">
      <div className="min-w-[600px]">
        {/* Stage */}
        <div className="w-full h-20 bg-gradient-to-r from-primary/60 via-primary/80 to-primary/60 mb-16 rounded-t-3xl shadow-lg text-white flex items-center justify-center text-lg font-bold relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNi41NjcgMjAuNTY3bC0uOTI0LS45MjRjLS4xNzgtLjE3OC0uNDY3LS4xNzgtLjY0NSAwbC0uOTI0LjkyNGMtLjE3OC4xNzgtLjE3OC40NjcgMCAuNjQ1bC45MjQuOTI0Yy4xNzguMTc4LjQ2Ny4xNzguNjQ1IDBsLjkyNC0uOTI0Yy4xNzgtLjE3OC4xNzgtLjQ2NyAwLS42NDV6TTI0LjU2NyA4LjU2N2wtLjkyNC0uOTI0Yy0uMTc4LS4xNzgtLjQ2Ny0uMTc4LS42NDUgMGwtLjkyNC45MjRjLS4xNzguMTc4LS4xNzguNDY3IDAgLjY0NWwuOTI0LjkyNGMuMTc4LjE3OC40NjcuMTc4LjY0NSAwbC45MjQtLjkyNGMuMTc4LS4xNzguMTc4LS40NjcgMC0uNjQ1ek0zNi41NjcgMzIuNTY3bC0uOTI0LS45MjRjLS4xNzgtLjE3OC0uNDY3LS4xNzgtLjY0NSAwbC0uOTI0LjkyNGMtLjE3OC4xNzgtLjE3OC40NjcgMCAuNjQ1bC45MjQuOTI0Yy4xNzguMTc4LjQ2Ny4xNzguNjQ1IDBsLjkyNC0uOTI0Yy4xNzgtLjE3OC4xNzgtLjQ2NyAwLS42NDV6Ii8+PC9nPjwvc3ZnPg==')]"></div>
          <div className="absolute top-0 left-0 h-1 w-full bg-white/20"></div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-black/20"></div>
          <span className="relative z-10 tracking-wider">STAGE</span>
          <div className="absolute right-4 top-2 h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
          <div className="absolute left-4 top-2 h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
        </div>

        {/* Tables (front row) */}
        <div className="mb-20">
          <h3 className="text-sm font-bold mb-6 text-center bg-secondary/20 inline-block px-6 py-1 rounded-full mx-auto">Premium Tables</h3>

          {/* Tables for 10 */}
          <div className="flex justify-center gap-8 mb-10">
            {tablesFor10.map((table) => (
              <TooltipProvider key={table.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      disabled={table.status === "taken"}
                      onClick={() => toggleSelection(table, "T10")}
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-105 relative",
                        table.status === "taken" && "opacity-50 cursor-not-allowed",
                        table.status === "available" &&
                          !selections.some((s) => s.id === table.id) &&
                          "bg-orange-100 border-4 border-dashed border-orange-300 hover:border-orange-400",
                        selections.some((s) => s.id === table.id) &&
                          "bg-orange-400 border-4 border-orange-500 shadow-lg shadow-orange-300/50"
                      )}
                    >
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-orange-200 opacity-50"></div>
                      </div>
                      <div className="text-center relative z-10">
                        <div className={cn(
                          "font-bold text-sm",
                          selections.some((s) => s.id === table.id) ? "text-white" : "text-orange-800"
                        )}>
                          {table.name}
                        </div>
                        <div className={cn(
                          "text-xs mt-1",
                          selections.some((s) => s.id === table.id) ? "text-white/80" : "text-orange-700"
                        )}>
                          {table.id}
                        </div>
                        <div className={cn(
                          "text-[10px] mt-1",
                          selections.some((s) => s.id === table.id) ? "text-white/70" : "text-orange-600"
                        )}>
                          (10 seats)
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{table.status === "taken" ? "Already reserved" : "Table for 10 guests"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Tables for 5 */}
          <div className="flex justify-center flex-wrap gap-5">
            {tablesFor5.map((table) => (
              <TooltipProvider key={table.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      disabled={table.status === "taken"}
                      onClick={() => toggleSelection(table, "T5")}
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-105 relative",
                        table.status === "taken" && "opacity-50 cursor-not-allowed",
                        table.status === "available" &&
                          !selections.some((s) => s.id === table.id) &&
                          "bg-blue-100 border-4 border-dashed border-blue-300 hover:border-blue-400",
                        selections.some((s) => s.id === table.id) &&
                          "bg-blue-400 border-4 border-blue-500 shadow-lg shadow-blue-300/50"
                      )}
                    >
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-blue-200 opacity-50"></div>
                      </div>
                      <div className="text-center relative z-10">
                        <div className={cn(
                          "font-bold text-xs",
                          selections.some((s) => s.id === table.id) ? "text-white" : "text-blue-800"
                        )}>
                          {table.name}
                        </div>
                        <div className={cn(
                          "text-[10px] mt-0.5",
                          selections.some((s) => s.id === table.id) ? "text-white/80" : "text-blue-700"
                        )}>
                          {table.id}
                        </div>
                        <div className={cn(
                          "text-[8px] mt-0.5",
                          selections.some((s) => s.id === table.id) ? "text-white/70" : "text-blue-600"
                        )}>
                          (5 seats)
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{table.status === "taken" ? "Already reserved" : "Table for 5 guests"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* VIP Seats (sides) */}
        <div className="mb-16">
          <div className="flex justify-between">
            <div className="w-1/5">
              <h3 className="text-xs font-bold mb-3 text-center bg-purple-100 rounded-full py-1 text-purple-800">VIP Left</h3>
              <div className="flex flex-col gap-2 items-center">
                {vipSeats.slice(0, 10).map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.status === "taken"}
                    onClick={() => toggleSelection(seat, "VIP")}
                    className={cn(
                      "w-12 h-9 flex items-center justify-center text-xs rounded-md transition-all relative",
                      seat.status === "taken" && "opacity-50 cursor-not-allowed",
                      seat.status === "available" &&
                        !selections.some((s) => s.id === seat.id) &&
                        "bg-purple-100 border-2 border-purple-300 hover:bg-purple-200",
                      selections.some((s) => s.id === seat.id) &&
                        "bg-purple-500 text-white shadow-md shadow-purple-300/50"
                    )}
                  >
                    {/* Chair back */}
                    <div className="absolute w-8 h-2 bg-purple-200 rounded-t-full top-0 transform -translate-y-1"></div>
                    {seat.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-3/5">
              {/* Empty space for middle section */}
            </div>

            <div className="w-1/5">
              <h3 className="text-xs font-bold mb-3 text-center bg-purple-100 rounded-full py-1 text-purple-800">VIP Right</h3>
              <div className="flex flex-col gap-2 items-center">
                {vipSeats.slice(10, 20).map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.status === "taken"}
                    onClick={() => toggleSelection(seat, "VIP")}
                    className={cn(
                      "w-12 h-9 flex items-center justify-center text-xs rounded-md transition-all relative",
                      seat.status === "taken" && "opacity-50 cursor-not-allowed",
                      seat.status === "available" &&
                        !selections.some((s) => s.id === seat.id) &&
                        "bg-purple-100 border-2 border-purple-300 hover:bg-purple-200",
                      selections.some((s) => s.id === seat.id) &&
                        "bg-purple-500 text-white shadow-md shadow-purple-300/50"
                    )}
                  >
                    {/* Chair back */}
                    <div className="absolute w-8 h-2 bg-purple-200 rounded-t-full top-0 transform -translate-y-1"></div>
                    {seat.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regular Seats (back rows) */}
        <div>
          <h3 className="text-xs font-bold mb-5 text-center bg-green-100 inline-block px-4 py-1 rounded-full mx-auto text-green-800">Regular Seating</h3>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-1 max-w-[600px] relative">
              {/* Row indicators */}
              <div className="absolute -left-6 top-1/4 transform -translate-y-1/2 text-xs text-gray-500">Row 1</div>
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">Row 2</div>
              <div className="absolute -left-6 top-3/4 transform -translate-y-1/2 text-xs text-gray-500">Row 3</div>
              
              {regularSeats.map((seat, index) => (
                <button
                  key={seat.id}
                  disabled={seat.status === "taken"}
                  onClick={() => toggleSelection(seat, "REG")}
                  className={cn(
                    "w-9 h-8 flex items-center justify-center text-xs rounded-md transition-all relative m-0.5",
                    seat.status === "taken" && "opacity-50 cursor-not-allowed",
                    seat.status === "available" &&
                      !selections.some((s) => s.id === seat.id) &&
                      "bg-green-100 border border-green-300 hover:bg-green-200",
                    selections.some((s) => s.id === seat.id) &&
                      "bg-green-500 text-white shadow-md shadow-green-300/50"
                  )}
                >
                  {/* Chair back */}
                  <div className="absolute w-7 h-1.5 bg-green-200 rounded-t-full top-0 transform -translate-y-1"></div>
                  <span className="text-[10px]">{seat.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mt-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded-full mr-1"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-1"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded-full mr-1 opacity-50"></div>
          <span>Taken</span>
        </div>
      </div>
    </div>
  );
};

export default CartoonSeatMap;
