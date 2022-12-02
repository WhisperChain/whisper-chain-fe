import React, { Suspense } from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import { RoutesEnum } from "./routes.enum";

import SpinningLoader from "../components/SpinningLoader";
import Home from "../pages/Home";
import Chain from "../pages/Chain";
import Generate from "../pages/Generate";


const Routing = () => {
  return (
    <Suspense fallback={<SpinningLoader />}>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesEnum.HOME}  element={<Home/>} />
          <Route path={RoutesEnum.CHAIN}  element={<Chain/>} />
          <Route path={RoutesEnum.GENERATE}  element={<Generate/>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routing;
