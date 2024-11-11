import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/shared/DashboardLayout";
import Wallet from './pages/wallet'
function App() {
  return (
    <BrowserRouter  future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Wallet />} />
        </Route>

        {/* <Route path="/auth" element={<Auth />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
