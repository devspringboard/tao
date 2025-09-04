import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container!);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Cache time 5 minutes
            gcTime: 1000 * 60 * 60 * 24 * 7, // Garbage collection time 1 week
            retry: 1, // Retry 1 time
        },
    },
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                    <HeroUIProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </HeroUIProvider>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
