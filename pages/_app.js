// eslint-disable-next-line
import 'symbol-observable';

import "../styles/globals.css";

// store imports
import { Provider } from "react-redux";
import { reduxWrapper } from "../store/store";

function MyApp({ Component, pageProps, ...rest }) {
  const { store } = reduxWrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;
