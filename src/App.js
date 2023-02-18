import React from "react";
import "./App.css";
import MainRouter from "./MainRouter";
import { RouterProvider } from "react-router-dom";
import { MessageContextProvider } from "./context/MessageContext";
import { FetchDataContextProvider } from "./context/FetchDataContext";

function App() {
  return (
    <MessageContextProvider>
      <FetchDataContextProvider>
        <RouterProvider router={MainRouter} />
      </FetchDataContextProvider>
    </MessageContextProvider>
  );
}

export default App;
