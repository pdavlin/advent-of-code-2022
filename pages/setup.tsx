import { Input, Form, Button } from "antd";
import { useEffect } from "react";
import styled from "styled-components";
import useGlobalState from "../hooks/useGlobalState";

const TextArea = styled(Input.TextArea)`
  margin: 0;
`;

const Setup = () => {
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    console.log(state);
  })

  const onFormSubmit = ({cookie}) => {
    console.log("hi");
    dispatch(() => {
      return {
        ...state,
        cookie
      };
    })
  };

  return (
    <>
      <Form
        name="basic"
        onFinish={onFormSubmit}
        autoComplete="off"
        layout="vertical"
        initialValues={{ cookie: state.cookie}}
      >
        <Form.Item
          label={`Advent of Code Cookie `}
          name="cookie"
        >
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Setup;
