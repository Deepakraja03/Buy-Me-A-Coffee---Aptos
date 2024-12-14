import { useEffect, useState } from "react";
import { fetchViewFunction } from "../utils/getFunction";
import Tooltip from "../components/ToolTip";


interface Donars {
  donater_addr: string,
  message: string,
  name: string,
  value: string
}

function Donations() {
  const [responses, setResponses] = useState<Donars[] | null>(null);
  const [loading, setLoading] = useState(false);


  const viewFunc = async() => {
    setLoading(true);
    try {
      const response = await fetchViewFunction();
      console.log("response", response);
      if (response && Array.isArray(response)) {
        setResponses(response[0] as Donars[]);
      } else {
        console.error("Response is null or not an array.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coffee details", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    viewFunc();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300">
        <div className="w-full py-10">
          <h1 className="text-2xl font-bold text-center text-gray-800">Buy Me a Coffee</h1>
        </div>

        <div className="w-full mt-8">
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Donations</h2>
          </div>
          {loading ? (
              <div className="flex flex-col items-center justify-center my-20">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
                </div>
                {/* <p className="mt-4 text-white font-bold text-xl">Loading...</p> */}
              </div>
            ) : (
              <div className="mt-4 bg-white rounded-lg shadow-md p-4 border-2 border-pink-500 overflow-auto mx-44">
                {responses ? (
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-purple-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">Sno</th>
                        <th className="border border-gray-300 px-4 py-2 text-left max-w-[150px] overflow-auto whitespace-nowrap">Address</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Amount (APT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {responses.map((donar, index) => (
                        <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                          <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Tooltip donarAddress={donar.donater_addr} />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">{donar.name}</td>
                          <td className="border border-gray-300 px-4 py-2">{donar.message}</td>
                          <td className="border border-gray-300 px-4 py-2">{parseFloat(donar.value) / 100000000}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-gray-500">No Data Available</p>
                )}
              </div>
            )
            }
        </div>
      </div>
    </>
  );
}

export default Donations;