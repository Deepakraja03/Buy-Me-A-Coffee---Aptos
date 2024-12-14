interface TooltipProps {
    donarAddress: string;
  }
  
const Tooltip: React.FC<TooltipProps> = ({ donarAddress }) => {
    return (
      <div className="relative inline-block group">
        {/* Truncated donor address */}
        <div className="truncate max-w-[150px] overflow-hidden px-4 py-2">
          {donarAddress}
        </div>
        {/* Tooltip with full address */}
        <div className="absolute bottom-full left-64 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-sm rounded py-2 px-4 opacity-0 group-hover:opacity-80 transition-opacity z-50">
          {donarAddress}
        </div>
      </div>
    );
  };
  
export default Tooltip;  