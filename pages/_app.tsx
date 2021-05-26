import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "bulma/css/bulma.min.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}
