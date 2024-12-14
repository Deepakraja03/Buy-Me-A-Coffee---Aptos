import { useLocation, useNavigate } from "react-router-dom";
import { WalletSelector } from "./WalletSelector";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between flex-wrap px-4">
        {/* Branding */}
        <div className="flex items-center space-x-3">
          <div className="text-4xl">☕️</div>
          <h1 className="text-2xl font-bold">
            Buy Me A Coffee
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center space-x-6 text-lg font-medium">
          {[
            { path: "/", label: "Home" },
            { path: "/donations", label: "Donations" },
            { path: "/mydonations", label: "My Donations" },
          ].map((link) => (
            <li
              key={link.path}
              className={`list-none cursor-pointer px-3 py-1 rounded-lg ${
                location.pathname === link.path
                  ? "bg-white text-purple-500"
                  : "hover:bg-white hover:text-purple-500"
              }`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </li>
          ))}
        </nav>

        {/* Wallet Selector */}
        <div className="flex items-center gap-3">
          <WalletSelector />
        </div>
      </div>

      {/* Mobile Menu (optional for small screens) */}
      <div className="block sm:hidden mt-4 px-4">
        <nav className="flex flex-col space-y-2 text-center">
          {[
            { path: "/", label: "Home" },
            { path: "/donations", label: "Donations" },
            { path: "/mydonations", label: "My Donations" },
          ].map((link) => (
            <button
              key={link.path}
              className={`w-full py-2 rounded-md ${
                location.pathname === link.path
                  ? "bg-white text-purple-500"
                  : "hover:bg-white hover:text-purple-500"
              }`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}