import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./pages/layout/Root";
import Dashboard from "./pages/Dashboard";
import VoterList from "./pages/VoterList";
import CandidateRegis from "./pages/CandidateRegis";
import VoterRegis from "./pages/VoterRegis";
import Error from "./components/Error";

const MainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Dashboard />} />
      <Route path="/voterList" element={<VoterList />} />
      <Route path="/candidateRegis" element={<CandidateRegis />} />
      <Route path="/voterRegis" element={<VoterRegis />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export default MainRouter;
