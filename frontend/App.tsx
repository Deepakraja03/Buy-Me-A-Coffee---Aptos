import { Header } from "./components/Header";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Donations from "./pages/Donations";
import MyDonations from "./pages/MyDonations";
import Footer from "./components/Footer";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import IsNotConnected from "./pages/IsNotConnected";

function App() {
  const { connected } = useWallet();

  return (
    <>
      <Router>
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
