import { Layout, Menu, MenuProps } from "antd";
import SetupButton from "../components/SetupButton";
import { HomeOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";
import { daysCompleted } from "../utils/consts";

type MenuItem = Required<MenuProps>["items"][number];

const { Content, Sider } = Layout;

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

const setMenuItems = () => {
  const newItems = [];
  for (let i = 1; i <= +daysCompleted; i++) {
    newItems.push(getItem(`Day ${i}`, `${i}`, <QuestionCircleFilled />));
  }
  return [getItem("Home", "0", <HomeOutlined />), ...newItems];
};

export default function AppSider() {
  const router = useRouter();

  const getDefaultSelected = () => {
    if (router.pathname.includes("/solutions/")) {
      return [router.pathname.split("day")[1]];
    } else {
      return ["0"];
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "0") {
      router.push("/");
    } else {
      router.push(`/solutions/day${e.key}`);
    }
  };
  return (
    <>
      <Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={getDefaultSelected()}
          mode="inline"
          items={setMenuItems()}
          onClick={onClick}
        />
        <SetupButton />
      </Sider>
    </>
  );
}
