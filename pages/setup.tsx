import { Input, Form, Button } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useGlobalState from "../hooks/useGlobalState";

const TextArea = styled(Input.TextArea)`
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  & > *:first-child {
    margin-right: 1rem;
  }
`;

const Setup = () => {
  const [state, dispatch] = useGlobalState();
  const [saved, setSaved] = useState(false);

  const onFormSubmit = ({ cookie }) => {
    dispatch(() => {
      return {
        ...state,
        cookie,
      };
    });
    setSaved(true);
  };

  return (
    <>
      <Form
        name="basic"
        onFinish={onFormSubmit}
        autoComplete="off"
        layout="vertical"
        initialValues={{ cookie: state.cookie }}
      >
        <Form.Item label={`Advent of Code Cookie `} name="cookie">
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item>
          <ButtonContainer>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <span>{saved ? "Saved ✅" : ""}</span>
          </ButtonContainer>
        </Form.Item>
      </Form>
    </>
  );
};

export default Setup;
