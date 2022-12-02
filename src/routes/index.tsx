import React, { Suspense } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  MemoryRouter,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import { RoutesEnum } from "./routes.enum";

import SpinningLoader from "../components/common/SpinningLoader";

import { lazyImportWithRetry } from "../utils/lazyRetry";


interface MatchProps {
  id: string;
}

interface SocialRoutesProps extends RouteComponentProps<MatchProps> {}

const Routes = () => {
  return (
    <Suspense fallback={<SpinningLoader />}>
      <Router>
        <Switch>
 
          <Route path={"/sign-in"} exact component={Login} />
          
          <Redirect to={"/"} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
