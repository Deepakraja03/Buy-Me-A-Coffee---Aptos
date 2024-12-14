import { WalletSelector } from "@/components/WalletSelector";

const IsNotConnected = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-300 flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <div className="text-6xl">🔗</div>

        <h1 className="text-3xl font-bold text-gray-800">
          Connect Your Wallet
        </h1>
        <p className="text-lg text-gray-600">
          To access all features, please connect your wallet.
        </p>

        <WalletSelector />
      </div>
    </div>
  );
};

export default IsNotConnected;