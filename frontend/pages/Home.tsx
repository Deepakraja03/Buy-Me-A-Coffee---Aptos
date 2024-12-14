import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { createEntry as createEntryFunction } from "@/entry-functions/integrateContract";
import { aptosClient } from "../utils/aptosClient";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const { account, signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();

  const buycoffee = async () => {
    if (!account) {
      toast.error("All fields are required. Please complete the form.");
      return;
    }
    if (!name || !message || !value) {
      console.error("All fields are required.");
      return;
    }
    const val = Number(value) * 100000000;
    try {
      const transactionData = createEntryFunction({
        name,
        message,
        value: val
      });
      toast.loading("Processing your transaction...");
      const response = await signAndSubmitTransaction(transactionData);
      console.log("Transaction result", String(response.hash));
      await aptosClient().waitForTransaction({transactionHash: String(response.hash)});
      queryClient.invalidateQueries();
      setName("");
      setMessage("");
      setValue("");
      toast.dismiss();
      toast.success("Coffee bought successfully! 🚀");
      return response;
    } catch (error) {
      console.error("Error buying Coffee", error);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 flex justify-center">
        <div className="my-10 w-full max-w-md h-max bg-white rounded-lg shadow-lg p-6 border-2 border-purple-500">
          <h1 className="text-2xl font-bold text-center text-gray-800">Buy Me a Coffee</h1>
          <div className="mt-4">
            <input
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-4"
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-4"
              type="text"
              placeholder="Enter the value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className={`w-full mt-6 px-4 py-2 text-white font-semibold rounded-lg transition-all 
                          ${!name || !message || !value ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
              onClick={buycoffee}
              disabled={!name || !message || !value}
            >
              Buy Coffee
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;