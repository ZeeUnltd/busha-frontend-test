import React, { Suspense, createContext, useState, useContext } from "react";
import { IWallet } from "../wallet/types/IWallet.interface";
import Loader from "./Loader";
import ErrorSpace from "../wallet/ErrorSpace";
// Define the context interface
type DashboardContextType ={
  isSidebarOpen: boolean;
  setSidebarOpen: (status: boolean) => void;
  activeMenu: string;
  setActiveMenu: (newTitle: string) => void;
  oldAccounts: IWallet[];
  setOldAccounts: (data: any) => void;
}

// Create the context
const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

// Create the context provider
export const DashboardProvider: React.FC = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [oldAccounts, setOldAccounts] = useState([]);
  const [activeMenu, setActiveMenu] = useState(
    window.location?.pathname.replace("/", "") ?? "Wallet"
  );

  return (
    <DashboardContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen: () => setSidebarOpen(!isSidebarOpen),
        activeMenu,
        setActiveMenu,
        oldAccounts,
        setOldAccounts,
      }}
    >
      <ErrorSpace fallBack={"Network Error, Try Again"}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </ErrorSpace>
    </DashboardContext.Provider>
  );
};

// Create a custom hook to use the context
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
