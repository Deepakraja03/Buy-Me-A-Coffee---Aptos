import { Header } from "./components/Header";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Donations from "./pages/Donations";
import MyDonations from "./pages/MyDonations";
import Footer from "./components/Footer";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import IsNotConnected from "./pages/IsNotConnected";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  const { connected } = useWallet();

  useEffect(() => {
    if(connected === true) {
      toast.success("Wallet Connected Successfully !!!");
    } else if(connected === false) {
      toast.success("Wallet Disconnected Successfully !!!");
    } else {
      toast.error("Error Connecting Wallet");
    }
  }, [connected]);

  return (
    <>
      <Router>
        <Toaster position="bottom-right" />
        <Header />
        <Routes>
          <Route path="/" element={ connected ? <Home /> : <IsNotConnected />} />
          <Route path="/donations" element={ connected ? <Donations /> : <IsNotConnected />} />
          <Route path="/mydonations" element={ connected ? <MyDonations /> : <IsNotConnected /> } />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
