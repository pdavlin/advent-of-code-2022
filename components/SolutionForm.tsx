import { Form, Button, Input, Tooltip } from "antd";
import { useState } from "react";
import styled from "styled-components";
import useGlobalState from "../hooks/useGlobalState";

const TextArea = styled(Input.TextArea)`
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;

  & > *:first-child {
    margin-right: 1rem;
  }
`;

const SolutionForm = ({ n = 1, onFormSubmit, defaultInput }) => {
  const [input, setInput] = useState(defaultInput);
  const [state, dispatch] = useGlobalState();

  const getAocInputFromSite = async () => {
    
  };
  return (
    <>
      <Form
        name="basic"
        onFinish={onFormSubmit}
        autoComplete="off"
        layout="vertical"
        initialValues={{ input: defaultInput }}
      >
        <Form.Item
          label={`Input ${n}`}
          name="input"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <TextArea rows={5} />
        </Form.Item>
        <ButtonContainer>
          <Tooltip
            title={
              state.cookie.length > 0
                ? "Get input data from Advent of Code"
                : 'Click "Setup" to set Advent of Code Cookie'
            }
          >
            <Button type="dashed" disabled={state.cookie.length === 0} onClick={() => getAocInputFromSite()}>
              Get Input Data
            </Button>
          </Tooltip>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Part {n}
            </Button>
          </Form.Item>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default SolutionForm;
