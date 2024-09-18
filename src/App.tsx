import React from "react";
import { useGlobalState } from "./context/GlobalStateProvider";
import LoginPage from "./components/LoginPage";
import SelectBreed from "./components/SelectBreed";
import DogsTable from "./components/DogsTable";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import Loading from "./components/Loading";
import UserMatch from "./components/UserMatch";
import ShowMatchButton from "./components/ShowMatchButton";
import Footer from "./components/Footer";

export default function App() {
  const { isAuthenticated, isLoading, showMatch } = useGlobalState();

  return (
    <div className="flex items-center justify-center overflow-auto bg-white">
      {!isAuthenticated ? (
        <LoginPage />
      ) : (
        <div className="w-full bg-slate-50 ">
          <Navbar />

          {isLoading ? (
            <Loading />
          ) : (
            <div className="w-full p-8 bg-slate-50 min-h-screen">
              <div className="flex justify-center items-center gap-8">
                <SelectBreed />
                <ShowMatchButton />
              </div>
              {showMatch ? (
                <UserMatch />
              ) : (
                <>
                  <DogsTable />
                  <Pagination />
                </>
              )}
            </div>
          )}
          <Footer />
        </div>
      )}
    </div>
  );
}
