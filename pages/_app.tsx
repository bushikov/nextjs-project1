import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "bulma/css/bulma.min.css";
import { TabIndexContext, TabIndexProvider } from "../contexts/tab_index";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <TabIndexProvider>
          <Component {...pageProps} />
        </TabIndexProvider>
      </Provider>
    </QueryClientProvider>
  );
}
