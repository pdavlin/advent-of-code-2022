import type { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";

import { Layout, Menu } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import { GlobalStateProvider } from "../hooks/useGlobalState";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AppSider from "../components/AppSider";

const { Content, Sider } = Layout;

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    margin: 0;
    padding: 0;
  }
`;

interface ThemeInterface {
  colors: {
    primary: string;
  };
}

const theme: ThemeInterface = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStateProvider {...pageProps}>
          <GlobalStyle />
          <Layout style={{ minHeight: "100vh" }}>
            <AppSider />
            <Layout className="site-layout">
              <Content style={{ margin: "1rem" }}>
                <Component {...pageProps} />
              </Content>
            </Layout>
          </Layout>
        </GlobalStateProvider>
      </QueryClientProvider>
    </>
  );
}
