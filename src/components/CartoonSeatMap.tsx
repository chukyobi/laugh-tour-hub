
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

export type Selection = {
  id: string;
  type: "T5" | "T10" | "VIP" | "REG";
  name: string;
};

type SeatMapProps = {
  requiredSelections: Record<string, number>;
  selectionCounts: Record<string, number>;
  selections: Selection[];
  toggleSelection: (
    item: { id: string; name: string; status: string },
    type: "T5" | "T10" | "VIP" | "REG"
  ) => void;
};

// Enhanced seat & table data with visual identifiers
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
  { id: "T10-A", name: "VIP Table A", status: "available" },
  { id: "T10-B", name: "VIP Table B", status: "available" },
  { id: "T10-C", name: "VIP Table C", status: "taken" },
  { id: "T10-D", name: "VIP Table D", status: "available" },
];

// Generate VIP seats with better distribution
const vipSeats = Array.from({ length: 20 }, (_, i) => ({
  id: `VIP-${i + 1}`,
  name: `VIP Seat ${i + 1}`,
  status: i % 7 === 0 || i % 11 === 0 ? "taken" : "available",
}));

// Generate regular seats in rows
const regularSeats = Array.from({ length: 50 }, (_, i) => {
  const row = Math.floor(i / 10) + 1;
  const seat = (i % 10) + 1;
  return {
    id: `REG-${i + 1}`,
    name: `Row ${row}, Seat ${seat}`,
    status: i % 8 === 0 || i % 13 === 0 ? "taken" : "available",
  };
});

const CartoonSeatMap = ({
  requiredSelections,
  selectionCounts,
  selections,
  toggleSelection,
}: SeatMapProps) => {
  const { toast } = useToast();
  
  // Helper to guide users with visual cues
  const [highlightType, setHighlightType] = useState<"T5" | "T10" | "VIP" | "REG" | null>(null);
  const [isGuideVisible, setIsGuideVisible] = useState(true);
  
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

  // Auto dismiss guide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGuideVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  
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
  
  const isSelected = (id: string) => selections.some(s => s.id === id);
  
  const getProgressForType = (type: string) => {
    const required = requiredSelections[type] || 0;
    const selected = selectionCounts[type] || 0;
    return required > 0 ? Math.min(100, (selected / required) * 100) : 0;
  };

  // Color mapping for different ticket types
  const typeColors = {
    T5: {
      bg: "from-blue-100 to-blue-200",
      selected: "from-blue-500 to-blue-600",
      border: "border-blue-300",
      text: "text-blue-800",
      selectedText: "text-white",
      highlight: "ring-blue-400",
    },
    T10: {
      bg: "from-purple-100 to-purple-200",
      selected: "from-purple-500 to-purple-600",
      border: "border-purple-300",
      text: "text-purple-800",
      selectedText: "text-white",
      highlight: "ring-purple-400",
    },
    VIP: {
      bg: "from-amber-100 to-amber-200",
      selected: "from-amber-500 to-amber-600",
      border: "border-amber-300",
      text: "text-amber-800",
      selectedText: "text-white",
      highlight: "ring-amber-400",
    },
    REG: {
      bg: "from-emerald-100 to-emerald-200",
      selected: "from-emerald-500 to-emerald-600",
      border: "border-emerald-300",
      text: "text-emerald-800",
      selectedText: "text-white",
      highlight: "ring-emerald-400",
    },
  };

  return (
    <div className="w-full overflow-auto p-6 bg-gradient-to-b from-slate-50 to-white rounded-lg border border-slate-200 shadow-sm">
      <div className="min-w-[650px]">
        {isGuideVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-center"
          >
            <h3 className="font-medium text-indigo-700 mb-1">How to select your seats</h3>
            <p className="text-sm text-indigo-600">
              Click on available seats matching your ticket types. Color-coded for easy selection.
              <button 
                onClick={() => setIsGuideVisible(false)}
                className="ml-2 text-indigo-700 underline hover:text-indigo-800"
              >
                Dismiss
              </button>
            </p>
          </motion.div>
        )}

        {/* Progress indicators */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {Object.entries(requiredSelections).map(([type, required]) => {
            if (required <= 0) return null;
            const selected = selectionCounts[type] || 0;
            const progress = getProgressForType(type);
            const colors = typeColors[type as keyof typeof typeColors];
            
            return (
              <motion.div 
                key={type}
                initial={{ opacity: 0.6 }}
                animate={{ 
                  opacity: 1,
                  scale: highlightType === type ? 1.05 : 1,
                  boxShadow: highlightType === type ? "0 0 0 2px rgba(99, 102, 241, 0.3)" : "none"
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "px-4 py-2 rounded-lg transition-all border",
                  highlightType === type ? "bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200" : "bg-white border-slate-200"
                )}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span className={`font-medium ${highlightType === type ? "text-indigo-700" : "text-gray-700"}`}>
                    {type === "T5" ? "Tables (5 seats)" :
                     type === "T10" ? "Tables (10 seats)" :
                     type === "VIP" ? "VIP Seats" : "Regular Seats"}
                  </span>
                  <span className={highlightType === type ? "text-indigo-700" : "text-gray-700"}>
                    {selected}/{required}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r",
                      type === "T5" ? "from-blue-400 to-blue-500" :
                      type === "T10" ? "from-purple-400 to-purple-500" :
                      type === "VIP" ? "from-amber-400 to-amber-500" : "from-emerald-400 to-emerald-500"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-28 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 mb-16 rounded-xl shadow-lg text-white flex items-center justify-center text-xl font-bold relative overflow-hidden"
        >
          {/* Stage decoration elements */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNi41NjcgMjAuNTY3bC0uOTI0LS45MjRjLS4xNzgtLjE3OC0uNDY3LS4xNzgtLjY0NSAwbC0uOTI0LjkyNGMtLjE3OC4xNzgtLjE3OC40NjcgMCAuNjQ1bC45MjQuOTI0Yy4xNzguMTc4LjQ2Ny4xNzguNjQ1IDBsLjkyNC0uOTI0Yy4xNzgtLjE3OC4xNzgtLjQ2NyAwLS42NDV6TTI0LjU2NyA4LjU2N2wtLjkyNC0uOTI0Yy0uMTc4LS4xNzgtLjQ2Ny0uMTc4LS42NDUgMGwtLjkyNC45MjRjLS4xNzguMTc4LS4xNzguNDY3IDAgLjY0NWwuOTI0LjkyNGMuMTc4LjE3OC40NjcuMTc4LjY0NSAwbC45MjQtLjkyNGMuMTc4LS4xNzguMTc4LS40NjcgMC0uNjQ1ek0zNi41NjcgMzIuNTY3bC0uOTI0LS45MjRjLS4xNzgtLjE3OC0uNDY3LS4xNzgtLjY0NSAwbC0uOTI0LjkyNGMtLjE3OC4xNzgtLjE3OC40NjcgMCAuNjQ1bC45MjQuOTI0Yy4xNzguMTc4LjQ2Ny4xNzguNjQ1IDBsLjkyNC0uOTI0Yy4xNzgtLjE3OC4xNzgtLjQ2NyAwLS42NDV6Ii8+PC9nPjwvc3ZnPg==')]"></div>
          <div className="absolute top-0 left-0 h-2 w-full bg-white/20"></div>
          <div className="absolute bottom-0 left-0 h-2 w-full bg-black/20"></div>
          
          {/* Stage spotlights & lighting effects */}
          <div className="absolute top-4 left-1/4 h-8 w-8 rounded-full bg-yellow-300/70 blur-xl animate-pulse"></div>
          <div className="absolute top-4 right-1/4 h-8 w-8 rounded-full bg-blue-300/70 blur-xl animate-pulse"></div>
          <div className="absolute top-6 left-1/2 h-6 w-6 rounded-full bg-pink-300/70 blur-xl animate-pulse"></div>
          
          <span className="relative z-10 tracking-wider uppercase text-shadow font-display">
            CENTER STAGE
          </span>
          
          <div className="absolute right-4 top-2 h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
          <div className="absolute left-4 top-2 h-3 w-3 rounded-full bg-red-400 animate-pulse"></div>
          
          {/* Stage microphone silhouette */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-black/20 rounded-t-full"></div>
        </motion.div>

        {/* Tables section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-base font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white inline-block px-8 py-2 rounded-full mx-auto shadow-md">
              VIP Tables
            </h3>
          </motion.div>

          {/* Tables for 10 - Premium tables */}
          <div className="flex justify-center gap-10 mb-12">
            {tablesFor10.map((table, index) => (
              <TooltipProvider key={table.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      whileHover={table.status !== "taken" ? { scale: 1.08, rotate: 2 } : {}}
                      whileTap={table.status !== "taken" ? { scale: 0.95 } : {}}
                      disabled={table.status === "taken"}
                      onClick={() => handleSelectItem(table, "T10")}
                      className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center transition-all transform relative",
                        table.status === "taken" && "opacity-40 cursor-not-allowed",
                        table.status === "available" &&
                          !isSelected(table.id) &&
                          highlightType === "T10" && "ring-4 ring-purple-300 animate-pulse",
                        table.status === "available" &&
                          !isSelected(table.id) &&
                          "bg-gradient-to-br from-purple-100 to-purple-200 border-4 border-dashed border-purple-300 hover:border-purple-400",
                        isSelected(table.id) &&
                          "bg-gradient-to-br from-purple-500 to-purple-600 border-4 border-purple-500 shadow-lg shadow-purple-200"
                      )}
                    >
                      {/* Table reflection */}
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-white opacity-30"></div>
                      </div>
                      
                      <div className="text-center relative z-10">
                        <div className={cn(
                          "font-bold text-sm",
                          isSelected(table.id) ? "text-white" : "text-purple-800"
                        )}>
                          {table.name}
                        </div>
                        <div className={cn(
                          "text-xs mt-1",
                          isSelected(table.id) ? "text-white/90" : "text-purple-700"
                        )}>
                          {table.id}
                        </div>
                        <div className={cn(
                          "text-[10px] mt-1",
                          isSelected(table.id) ? "text-white/80" : "text-purple-600"
                        )}>
                          (10 seats)
                        </div>
                      </div>
                      
                      {/* Table selection indicator */}
                      {isSelected(table.id) && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 h-7 w-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                      
                      {/* Unavailable indicator */}
                      {table.status === "taken" && (
                        <div className="absolute inset-0 rounded-full border-4 border-gray-300 flex items-center justify-center">
                          <div className="bg-gray-200/80 backdrop-blur-sm rounded-full p-2">
                            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-purple-50 border border-purple-200">
                    <div className="p-1">
                      <p className="font-medium">{table.status === "taken" ? "Already reserved" : "VIP Table for 10 guests"}</p>
                      {table.status !== "taken" && (
                        <p className="text-xs text-purple-600 mt-1">Premium experience with bottle service</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Tables for 5 */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-base font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white inline-block px-8 py-2 rounded-full mx-auto shadow-md"
          >
            Group Tables
          </motion.h3>
          
          <div className="flex justify-center flex-wrap gap-6">
            {tablesFor5.map((table, index) => (
              <TooltipProvider key={table.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.08, duration: 0.4 }}
                      whileHover={table.status !== "taken" ? { scale: 1.08, rotate: 1 } : {}}
                      whileTap={table.status !== "taken" ? { scale: 0.95 } : {}}
                      disabled={table.status === "taken"}
                      onClick={() => handleSelectItem(table, "T5")}
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-all transform relative",
                        table.status === "taken" && "opacity-40 cursor-not-allowed",
                        table.status === "available" &&
                          !isSelected(table.id) &&
                          highlightType === "T5" && "ring-4 ring-blue-300 animate-pulse",
                        table.status === "available" &&
                          !isSelected(table.id) &&
                          "bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-dashed border-blue-300 hover:border-blue-400",
                        isSelected(table.id) &&
                          "bg-gradient-to-br from-blue-500 to-blue-600 border-4 border-blue-500 shadow-lg shadow-blue-200"
                      )}
                    >
                      {/* Table reflection */}
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-white opacity-30"></div>
                      </div>
                      
                      <div className="text-center relative z-10">
                        <div className={cn(
                          "font-bold text-sm",
                          isSelected(table.id) ? "text-white" : "text-blue-800"
                        )}>
                          {table.name}
                        </div>
                        <div className={cn(
                          "text-xs mt-0.5",
                          isSelected(table.id) ? "text-white/90" : "text-blue-700"
                        )}>
                          {table.id}
                        </div>
                        <div className={cn(
                          "text-[10px] mt-0.5",
                          isSelected(table.id) ? "text-white/80" : "text-blue-600"
                        )}>
                          (5 seats)
                        </div>
                      </div>
                      
                      {/* Table selection indicator */}
                      {isSelected(table.id) && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                      
                      {/* Unavailable indicator */}
                      {table.status === "taken" && (
                        <div className="absolute inset-0 rounded-full border-4 border-gray-300 flex items-center justify-center">
                          <div className="bg-gray-200/80 backdrop-blur-sm rounded-full p-1">
                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-blue-50 border border-blue-200">
                    <div className="p-1">
                      <p className="font-medium">{table.status === "taken" ? "Already reserved" : "Table for 5 guests"}</p>
                      {table.status !== "taken" && (
                        <p className="text-xs text-blue-600 mt-1">Great for small groups</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* VIP Seats (sides) */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-base font-bold mb-6 text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white inline-block px-8 py-2 rounded-full mx-auto shadow-md"
          >
            VIP Seats
          </motion.h3>
          
          <div className="flex justify-between">
            <div className="w-1/5">
              <motion.h4 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="text-xs font-bold mb-3 text-center bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-full py-1 shadow-sm"
              >
                Left Wing
              </motion.h4>
              <div className="flex flex-col gap-2 items-center">
                {vipSeats.slice(0, 10).map((seat, index) => (
                  <motion.button
                    key={seat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                    whileHover={seat.status !== "taken" ? { scale: 1.1, x: 5 } : {}}
                    whileTap={seat.status !== "taken" ? { scale: 0.95 } : {}}
                    disabled={seat.status === "taken"}
                    onClick={() => handleSelectItem(seat, "VIP")}
                    className={cn(
                      "w-full max-w-[120px] py-2 px-3 flex items-center justify-between text-xs rounded-lg transition-all relative",
                      seat.status === "taken" && "opacity-40 cursor-not-allowed",
                      seat.status === "available" &&
                        !isSelected(seat.id) &&
                        highlightType === "VIP" && "ring-2 ring-amber-300 animate-pulse",
                      seat.status === "available" &&
                        !isSelected(seat.id) &&
                        "bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-300 hover:bg-amber-200",
                      isSelected(seat.id) &&
                        "bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-md shadow-amber-200"
                    )}
                  >
                    {/* Chair back */}
                    <div className="absolute w-8 h-2 bg-amber-300 rounded-t-full top-0 transform -translate-y-1"></div>
                    <span>{seat.id.split('-')[1]}</span>
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={isSelected(seat.id) ? "white" : "#92400e"}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    
                    {/* Seat selection indicator */}
                    {isSelected(seat.id) && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center border border-white shadow-sm"
                      >
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="w-3/5">
              {/* Middle area - visual design */}
              <div className="h-full flex justify-center items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                  className="w-3/4 h-32 border-2 border-dashed border-indigo-200 rounded-lg rotate-1 bg-gradient-to-br from-indigo-50 to-transparent flex items-center justify-center"
                >
                  <span className="text-xs text-indigo-300 rotate-1 font-mono">Dance Floor / Open Area</span>
                </motion.div>
              </div>
            </div>

            <div className="w-1/5">
              <motion.h4
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="text-xs font-bold mb-3 text-center bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-full py-1 shadow-sm"
              >
                Right Wing
              </motion.h4>
              <div className="flex flex-col gap-2 items-center">
                {vipSeats.slice(10, 20).map((seat, index) => (
                  <motion.button
                    key={seat.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                    whileHover={seat.status !== "taken" ? { scale: 1.1, x: -5 } : {}}
                    whileTap={seat.status !== "taken" ? { scale: 0.95 } : {}}
                    disabled={seat.status === "taken"}
                    onClick={() => handleSelectItem(seat, "VIP")}
                    className={cn(
                      "w-full max-w-[120px] py-2 px-3 flex items-center justify-between text-xs rounded-lg transition-all relative",
                      seat.status === "taken" && "opacity-40 cursor-not-allowed",
                      seat.status === "available" &&
                        !isSelected(seat.id) &&
                        highlightType === "VIP" && "ring-2 ring-amber-300 animate-pulse",
                      seat.status === "available" &&
                        !isSelected(seat.id) &&
                        "bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-300 hover:bg-amber-200",
                      isSelected(seat.id) &&
                        "bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-md shadow-amber-200"
                    )}
                  >
                    {/* Chair back */}
                    <div className="absolute w-8 h-2 bg-amber-300 rounded-t-full top-0 transform -translate-y-1"></div>
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={isSelected(seat.id) ? "white" : "#92400e"}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>{seat.id.split('-')[1]}</span>
                    
                    {/* Seat selection indicator */}
                    {isSelected(seat.id) && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center border border-white shadow-sm"
                      >
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regular Seats (back rows) */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-base font-bold mb-6 text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white inline-block px-8 py-2 rounded-full mx-auto shadow-md"
          >
            Regular Seating
          </motion.h3>
          
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-1 max-w-[700px] relative">
              {/* Row indicators */}
              <div className="absolute -left-6 top-[12%] transform -translate-y-1/2 text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded shadow-sm">Row 1</div>
              <div className="absolute -left-6 top-[37%] transform -translate-y-1/2 text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded shadow-sm">Row 2</div>
              <div className="absolute -left-6 top-[62%] transform -translate-y-1/2 text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded shadow-sm">Row 3</div>
              <div className="absolute -left-6 top-[87%] transform -translate-y-1/2 text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded shadow-sm">Row 4</div>
              
              {/* Column indicators */}
              <div className="absolute top-[100%] left-[10%] transform -translate-x-1/2 mt-3 text-xs font-semibold text-gray-700">1</div>
              <div className="absolute top-[100%] left-[30%] transform -translate-x-1/2 mt-3 text-xs font-semibold text-gray-700">3</div>
              <div className="absolute top-[100%] left-[50%] transform -translate-x-1/2 mt-3 text-xs font-semibold text-gray-700">5</div>
              <div className="absolute top-[100%] left-[70%] transform -translate-x-1/2 mt-3 text-xs font-semibold text-gray-700">7</div>
              <div className="absolute top-[100%] left-[90%] transform -translate-x-1/2 mt-3 text-xs font-semibold text-gray-700">9</div>
              
              {regularSeats.map((seat, index) => (
                <motion.button
                  key={seat.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (index % 10) * 0.03, duration: 0.3 }}
                  whileHover={seat.status !== "taken" ? { scale: 1.15, y: -2 } : {}}
                  whileTap={seat.status !== "taken" ? { scale: 0.95 } : {}}
                  disabled={seat.status === "taken"}
                  onClick={() => handleSelectItem(seat, "REG")}
                  className={cn(
                    "w-10 h-9 flex items-center justify-center text-xs rounded-md transition-all relative m-1",
                    seat.status === "taken" && "opacity-40 cursor-not-allowed",
                    seat.status === "available" &&
                      !isSelected(seat.id) &&
                      highlightType === "REG" && "ring-2 ring-emerald-300 ring-opacity-80 animate-pulse",
                    seat.status === "available" &&
                      !isSelected(seat.id) &&
                      "bg-gradient-to-b from-emerald-100 to-emerald-200 border border-emerald-300 hover:bg-emerald-200",
                    isSelected(seat.id) &&
                      "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-200/50"
                  )}
                >
                  {/* Chair back */}
                  <div className="absolute w-8 h-2 bg-emerald-200 rounded-t-full top-0 transform -translate-y-1"></div>
                  <span className="text-[10px]">{seat.id.replace('REG-', '')}</span>
                  
                  {/* Seat selection indicator */}
                  {isSelected(seat.id) && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center border border-white shadow-sm"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex items-center justify-center gap-6 text-xs text-gray-600 mt-12 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm"
      >
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-b from-blue-100 to-blue-200 border border-blue-300 rounded-full mr-1"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full mr-1"></div>
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
      </motion.div>
    </div>
  );
};

export default CartoonSeatMap;
