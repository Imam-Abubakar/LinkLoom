import { Toaster } from "react-hot-toast";
import AuthProvider from "../context/AuthContext";
import type { AppProps } from "next/app";
import "../flow/config";
import { MantineProvider } from "@mantine/core";
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, useUser } from "@supabase/auth-helpers-react";
import "../styles/globals.css";

import { useEffect, useState } from "react";
import Container from "../layouts/AppContainer";
import AuthModal from "../components/navbar/AuthModal";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <AuthProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
            colors: {
              // dark:[gray[100],gray[200],gray[300],gray[400],gray[500],gray[600],gray[700],gray[800],gray[900]],
              flow: [
                "#CBFED4",
                "#98FDB4",
                "#64FA9D",
                "#3DF596",
                "#00bbef",
                "#00CD8C",
                "#005272",
                "#008A7A",
                "#007270",
              ],
            },
            primaryColor: "flow",
            primaryShade: 6,
          }}
        >
          <AuthModal/>
          <Toaster position="bottom-left" />
            <Component {...pageProps} />
        </MantineProvider>
      </AuthProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
