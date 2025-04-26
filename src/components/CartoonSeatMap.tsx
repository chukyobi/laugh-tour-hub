
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

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

// Mock seating data with improved visual indicators
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
  const { toast } = useToast();
  
  // Helper to guide users with visual cues
  const [highlightType, setHighlightType] = useState<"T5" | "T10" | "VIP" | "REG" | null>(null);
  
  // Auto highlight category that needs selections
  useEffect(() => {
    // Find first type that needs more selections
    for (const [type, required] of Object.entries(requiredSelections)) {
      const selected = selectionCounts[type] || 0;
      if (selected < required && required > 0) {
        setHighlightType(type as "T5" | "T10" | "VIP" | "REG");
        return;
      }
    }
    setHighlightType(null);
  }, [requiredSelections, selectionCounts]);
  
  const handleSelectItem = (item: { id: string; name: string; status: string }, type: "T5" | "T10" | "VIP" | "REG") => {
    if (item.status === "taken") {
      toast({
        title: "Seat Unavailable",
        description: "This seat has already been taken.",
        variant: "destructive",
      });
      return;
    }
    
    toggleSelection(item, type);
  };
  
  const isHighlighted = (type: string) => {
    return highlightType === type;
  };
  
  const getProgressForType = (type: string) => {
    const required = requiredSelections[type] || 0;
    const selected = selectionCounts[type] || 0;
    return required > 0 ? Math.min(100, (selected / required) * 100) : 0;
  };

  return (
    <div className="w-full overflow-auto p-4 bg-gradient-to-b from-indigo-50 to-white rounded-lg border border-indigo-100">
      <div className="min-w-[600px]">
        {/* Progress indicators */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {Object.entries(requiredSelections).map(([type, required]) => {
            if (required <= 0) return null;
            const selected = selectionCounts[type] || 0;
            const progress = getProgressForType(type);
            
            return (
              <div key={type} 
                className={cn(
                  "px-3 py-2 rounded-lg transition-all",
                  isHighlighted(type) ? "bg-indigo-100 shadow-md" : "bg-gray-50"
                )}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{type} Selection</span>
                  <span>{selected}/{required}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      type === "T5" ? "bg-blue-500" :
                      type === "T10" ? "bg-orange-500" :
                      type === "VIP" ? "bg-purple-500" : "bg-green-500"
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-24 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 mb-16 rounded-t-3xl shadow-lg text-white flex items-center justify-center text-xl font-bold relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNi41NjcgMjAuNTY3bC0uOTI0LS45MjRjLS4xNzgtLjE3OC0uNDY3LS4xNzgtLjY0NSAwbC0uOTI0LjkyNGMtLjE3OC4xNzgtLjE3OC40NjcgMCAuNjQ1bC45MjQuOTI0Yy4xNzguMTc4LjQ2Ny4xNzguNjQ1IDBsLjkyNC0uOTI0Yy4xNzgtLjE3OC4xNzgtLjQ2NyAwLS42NDV6TTI0LjU2NyA4LjU2N2wtLjkyNC0uOTI0Yy0uMTc4LS4xNzgtLjQ2Ny0uMTc4LS42NDUgMGwtLjkyNC45MjRjLS4xNzguMTc4LS4xNzguNDY3IDAgLjY0NWwuOTI0LjkyNGMuMTc4LjE3OC40NjcuMTc4LjY0NSAwbC45MjQtLjkyNGMuMTc4LS4xNzguMTc4LS40NjcgMC0uNjQ1ek0zNi41NjcgMzIuNTY3bC0uOTI0LS45MjRjLS4xNzgtLjE3OC0uNDY3LS4xNzgtLjY0NSAwbC0uOTI0LjkyNGMtLjE3OC4xNzgtLjE3OC40NjcgMCAuNjQ1bC45MjQuOTI0Yy4xNzguMTc4LjQ2Ny4xNzguNjQ1IDBsLjkyNC0uOTI0Yy4xNzgtLjE3OC4xNzgtLjQ2NyAwLS42NDV6Ii8+PC9nPjwvc3ZnPg==')]"></div>
          <div className="absolute top-0 left-0 h-2 w-full bg-white/20"></div>
          <div className="absolute bottom-0 left-0 h-2 w-full bg-black/20"></div>
          
          {/* Stage spotlights */}
          <div className="absolute top-4 left-1/4 h-6 w-6 rounded-full bg-yellow-300 blur-md animate-pulse"></div>
          <div className="absolute top-4 right-1/4 h-6 w-6 rounded-full bg-blue-300 blur-md animate-pulse"></div>
          
          <span className="relative z-10 tracking-wider uppercase text-shadow">CENTER STAGE</span>
          <div className="absolute right-4 top-2 h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
          <div className="absolute left-4 top-2 h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
        </motion.div>

        {/* Tables (front row) */}
        <div className="mb-20">
          <h3 className="text-sm font-bold mb-6 text-center bg-gradient-to-r from-amber-200 to-orange-300 text-amber-900 inline-block px-6 py-1 rounded-full mx-auto shadow-sm">Premium Tables</h3>

          {/* Tables for 10 */}
          <div className="flex justify-center gap-8 mb-10">
            {tablesFor10.map((table) => (
              <TooltipProvider key={table.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileHover={table.status !== "taken" ? { scale: 1.05 } : {}}
                      whileTap={table.status !== "taken" ? { scale: 0.95 } : {}}
                      disabled={table.status === "taken"}
                      onClick={() => handleSelectItem(table, "T10")}
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-all transform relative",
                        table.status === "taken" && "opacity-50 cursor-not-allowed",
                        table.status === "available" &&
                          !selections.some((s) => s.id === table.id) &&
                          isHighlighted("T10") && "ring-4 ring-orange-300 ring-opacity-50 animate-pulse",
                        table.status === "available" &&
                          !selections.some((s) => s.id === table.id) &&
                          "bg-gradient-to-br from-orange-100 to-amber-200 border-4 border-dashed border-orange-300 hover:border-orange-400",
                        selections.some((s) => s.id === table.id) &&
                          "bg-gradient-to-br from-orange-400 to-amber-500 border-4 border-orange-500 shadow-lg shadow-orange-300/50"
                      )}
                    >
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-white opacity-25"></div>
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
                      
                      {/* Table selection indicator */}
                      {selections.some((s) => s.id === table.id) && (
                        <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </motion.button>
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
                    <motion.button
                      whileHover={table.status !== "taken" ? { scale: 1.05 } : {}}
                      whileTap={table.status !== "taken" ? { scale: 0.95 } : {}}
                      disabled={table.status === "taken"}
                      onClick={() => handleSelectItem(table, "T5")}
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-all transform relative",
                        table.status === "taken" && "opacity-50 cursor-not-allowed",
                        table.status === "available" &&
                          !selections.some((s) => s.id === table.id) &&
                          isHighlighted("T5") && "ring-4 ring-blue-300 ring-opacity-50 animate-pulse",
                        table.status === "available" &&
                          !selections.some((s) => s.id === table.id) &&
                          "bg-gradient-to-br from-blue-100 to-sky-200 border-4 border-dashed border-blue-300 hover:border-blue-400",
                        selections.some((s) => s.id === table.id) &&
                          "bg-gradient-to-br from-blue-400 to-sky-500 border-4 border-blue-500 shadow-lg shadow-blue-300/50"
                      )}
                    >
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-white opacity-25"></div>
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
                      
                      {/* Table selection indicator */}
                      {selections.some((s) => s.id === table.id) && (
                        <div className="absolute -top-2 -right-2 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </motion.button>
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
              <h3 className="text-xs font-bold mb-3 text-center bg-gradient-to-r from-purple-100 to-violet-200 text-purple-800 rounded-full py-1">VIP Left</h3>
              <div className="flex flex-col gap-2 items-center">
                {vipSeats.slice(0, 10).map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileHover={seat.status !== "taken" ? { scale: 1.05 } : {}}
                    whileTap={seat.status !== "taken" ? { scale: 0.95 } : {}}
                    disabled={seat.status === "taken"}
                    onClick={() => handleSelectItem(seat, "VIP")}
                    className={cn(
                      "w-12 h-9 flex items-center justify-center text-xs rounded-md transition-all relative",
                      seat.status === "taken" && "opacity-50 cursor-not-allowed",
                      seat.status === "available" &&
                        !selections.some((s) => s.id === seat.id) &&
                        isHighlighted("VIP") && "ring-2 ring-purple-300 ring-opacity-50 animate-pulse",
                      seat.status === "available" &&
                        !selections.some((s) => s.id === seat.id) &&
                        "bg-gradient-to-b from-purple-100 to-purple-200 border-2 border-purple-300 hover:bg-purple-200",
                      selections.some((s) => s.id === seat.id) &&
                        "bg-gradient-to-b from-purple-500 to-purple-600 text-white shadow-md shadow-purple-300/50"
                    )}
                  >
                    {/* Chair back */}
                    <div className="absolute w-8 h-2 bg-purple-200 rounded-t-full top-0 transform -translate-y-1"></div>
                    {seat.id}
                    
                    {/* Seat selection indicator */}
                    {selections.some((s) => s.id === seat.id) && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center border border-white">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="w-3/5">
              {/* Middle area - visual design */}
              <div className="h-full flex justify-center items-center">
                <div className="w-3/4 h-12 border-2 border-dashed border-indigo-200 rounded-lg rotate-1 opacity-30"></div>
              </div>
            </div>

            <div className="w-1/5">
              <h3 className="text-xs font-bold mb-3 text-center bg-gradient-to-r from-purple-100 to-violet-200 text-purple-800 rounded-full py-1">VIP Right</h3>
              <div className="flex flex-col gap-2 items-center">
                {vipSeats.slice(10, 20).map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileHover={seat.status !== "taken" ? { scale: 1.05 } : {}}
                    whileTap={seat.status !== "taken" ? { scale: 0.95 } : {}}
                    disabled={seat.status === "taken"}
                    onClick={() => handleSelectItem(seat, "VIP")}
                    className={cn(
                      "w-12 h-9 flex items-center justify-center text-xs rounded-md transition-all relative",
                      seat.status === "taken" && "opacity-50 cursor-not-allowed",
                      seat.status === "available" &&
                        !selections.some((s) => s.id === seat.id) &&
                        isHighlighted("VIP") && "ring-2 ring-purple-300 ring-opacity-50 animate-pulse",
                      seat.status === "available" &&
                        !selections.some((s) => s.id === seat.id) &&
                        "bg-gradient-to-b from-purple-100 to-purple-200 border-2 border-purple-300 hover:bg-purple-200",
                      selections.some((s) => s.id === seat.id) &&
                        "bg-gradient-to-b from-purple-500 to-purple-600 text-white shadow-md shadow-purple-300/50"
                    )}
                  >
                    {/* Chair back */}
                    <div className="absolute w-8 h-2 bg-purple-200 rounded-t-full top-0 transform -translate-y-1"></div>
                    {seat.id}
                    
                    {/* Seat selection indicator */}
                    {selections.some((s) => s.id === seat.id) && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center border border-white">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regular Seats (back rows) */}
        <div>
          <h3 className="text-xs font-bold mb-5 text-center bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 inline-block px-4 py-1 rounded-full mx-auto">Regular Seating</h3>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-1 max-w-[600px] relative">
              {/* Row indicators */}
              <div className="absolute -left-6 top-1/4 transform -translate-y-1/2 text-xs font-medium text-gray-500 bg-gray-100 px-1 rounded">Row 1</div>
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-500 bg-gray-100 px-1 rounded">Row 2</div>
              <div className="absolute -left-6 top-3/4 transform -translate-y-1/2 text-xs font-medium text-gray-500 bg-gray-100 px-1 rounded">Row 3</div>
              
              {regularSeats.map((seat, index) => (
                <motion.button
                  key={seat.id}
                  whileHover={seat.status !== "taken" ? { scale: 1.05 } : {}}
                  whileTap={seat.status !== "taken" ? { scale: 0.95 } : {}}
                  disabled={seat.status === "taken"}
                  onClick={() => handleSelectItem(seat, "REG")}
                  className={cn(
                    "w-9 h-8 flex items-center justify-center text-xs rounded-md transition-all relative m-0.5",
                    seat.status === "taken" && "opacity-50 cursor-not-allowed",
                    seat.status === "available" &&
                      !selections.some((s) => s.id === seat.id) &&
                      isHighlighted("REG") && "ring-2 ring-green-300 ring-opacity-50 animate-pulse",
                    seat.status === "available" &&
                      !selections.some((s) => s.id === seat.id) &&
                      "bg-gradient-to-b from-green-100 to-green-200 border border-green-300 hover:bg-green-200",
                    selections.some((s) => s.id === seat.id) &&
                      "bg-gradient-to-b from-green-500 to-green-600 text-white shadow-md shadow-green-300/50"
                  )}
                >
                  {/* Chair back */}
                  <div className="absolute w-7 h-1.5 bg-green-200 rounded-t-full top-0 transform -translate-y-1"></div>
                  <span className="text-[10px]">{seat.id}</span>
                  
                  {/* Seat selection indicator */}
                  {selections.some((s) => s.id === seat.id) && (
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center border border-white">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-6 text-xs text-gray-600 mt-8 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-b from-blue-100 to-blue-200 border border-blue-300 rounded-full mr-1"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-1"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded-full mr-1 opacity-50"></div>
          <span>Taken</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-dashed border-amber-400 rounded-full mr-1 animate-pulse"></div>
          <span>Recommended</span>
        </div>
      </div>
    </div>
  );
};

export default CartoonSeatMap;
