import { Button, Tooltip } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
import useGlobalState from "../hooks/useGlobalState";
import { pxToRem } from "../styles/styleUtils";

const Container = styled.div`
  bottom: 1rem;
  margin: 0 1rem;
  position: absolute;
`;

const SButton = styled(Button)`
  width: ${pxToRem(200 - 32)};
`;

export default function SetupButton() {
  const router = useRouter();
  const [state] = useGlobalState();
  return (
    <Container>
      <Tooltip title={`Cookie: ${state.cookie || "N/A"}`}>
        <SButton onClick={() => router.push("/setup")}>Setup</SButton>;
      </Tooltip>
    </Container>
  );
}
