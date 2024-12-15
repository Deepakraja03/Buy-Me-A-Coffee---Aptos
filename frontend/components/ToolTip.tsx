import { useCallback } from "react";
import { toast } from "./ui/use-toast";
import { FiCopy } from "react-icons/fi"; 

interface TooltipProps {
    donarAddress: string;
  }
  
const Tooltip: React.FC<TooltipProps> = ({ donarAddress }) => {
  const copyAddress = useCallback(async (walletAddress : string) => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address.",
      });
    }
  }, [toast]);

    return (
      <div className="relative inline-block group">
        <div className="flex items-center cursor-pointer" onClick={() => copyAddress(donarAddress)}>
          <div className="truncate max-w-[150px] overflow-hidden px-4 py-2">
            {donarAddress} 
          </div>
          <div>
            <FiCopy className="text-gray-500 hover:text-purple-600 transition duration-300" />
          </div>
        </div>
        <div className="absolute bottom-full left-64 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-sm rounded py-2 px-4 opacity-0 group-hover:opacity-80 transition-opacity z-50">
          {donarAddress}
        </div>
      </div>
    );
  };
  
export default Tooltip;  