import { Layout, Menu, MenuProps } from "antd";
import SetupButton from "../components/SetupButton";
import { HomeOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";

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

export default function AppSider() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([getItem("Home", "0", <HomeOutlined />)]);
  const { data, isLoading } = useQuery(
    `getCompletedDays`,
    () =>
      fetch(`/api/getCompletedDays`, {
        method: "GET",
      }).then((res) => {
        return res.text();
      }),
  );

  useEffect(() => {
    const newItems = [];
    for (let i = 1; i <= +data; i++) {
      newItems.push(getItem(`Day ${i}`, `${i}`, <QuestionCircleFilled />));
    }
    setMenuItems([getItem("Home", "0", <HomeOutlined />), ...newItems]);
    console.log(menuItems)
  }, [data]);
  
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
        {isLoading === false && (
        <Menu
          theme="dark"
          defaultSelectedKeys={getDefaultSelected()}
          mode="inline"
          items={menuItems}
          onClick={onClick}
        />)}
        <SetupButton />
      </Sider>
    </>
  );
}
