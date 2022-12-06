import type { AppProps } from "next/app";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import {HomeOutlined, QuestionCircleFilled} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import { daysCompleted } from "../utils/consts";
import { ItemType } from "antd/es/menu/hooks/useItems";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// const items: MenuItem[] = [getItem("Home", "0"), getItem("Day 1", "1")];
const items: MenuItem[] = [getItem("Home", "0" , <HomeOutlined />)];
for (let i = 1; i <= daysCompleted; i++) {
  items.push(getItem(`Day ${i}`, `${i}`, <QuestionCircleFilled />));
}

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

const PageTitle = styled.h1`
  color: white;
  float: left;
  height: pxToRem(64);
  margin: 1rem;
  width: pxToRem(200);
`;

export default function App({ Component, pageProps }: AppProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "0") {
      router.push("/");
    } else {
      router.push(`/solutions/day${e.key}`);
    }
  };

  const getDefaultSelected = () => {
    if (router.pathname.includes("/solutions/")) {
      return [router.pathname.split("day")[1]];
    } else {
      return ["0"];
    }
  };

  return (
    <>
      <GlobalStyle />
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <Menu
            theme="dark"
            defaultSelectedKeys={getDefaultSelected()}
            mode="inline"
            items={items}
            onClick={onClick}
          />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "1rem" }}>
            <Component {...pageProps} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
