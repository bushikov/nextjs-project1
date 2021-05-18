import { Provider } from "next-auth/client";
import "bulma/css/bulma.min.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
