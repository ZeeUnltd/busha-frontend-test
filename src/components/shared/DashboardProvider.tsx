import React, {
  Suspense,
  createContext,
  useState,
  useContext,
} from "react";
import Loader from "./Loader";
import ErrorSpace from "../wallet/ErrorSpace";
// Define the context interface
interface DashboardContextType {
  isSidebarOpen: boolean;
  setSidebarOpen: () => void;
  activeMenu: string;
  // setTitle: (newTitle: string) => void;
}

// Create the context
const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

// Create the context provider
export const DashboardProvider: React.FC = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const activeMenu = window.location?.pathname.replace("/", "") ?? "";

  return (
    <DashboardContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen: () => setSidebarOpen(!isSidebarOpen),
        activeMenu,
      }}
    >
      <ErrorSpace fallBack={'Network Error, Try Again'}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </ErrorSpace>
    </DashboardContext.Provider>
  );
};

// Create a custom hook to use the context
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
