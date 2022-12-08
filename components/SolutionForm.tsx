import { Form, Button, Input, Tooltip } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useGlobalState from "../hooks/useGlobalState";
import { useQuery } from "react-query";

const TextArea = styled(Input.TextArea)`
  font-family: "Courier New", Courier, monospace;
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
  const router = useRouter();
  const dayNum = +router.pathname.split("day")[1];
  const [form] = Form.useForm();

  const { data, refetch } = useQuery(
    `getInput${dayNum}`,
    () =>
      fetch(`/api/getInput/${dayNum}`, {
        method: "POST",
        body: JSON.stringify({ cookie: state.cookie }),
      }).then((res) => {
        return res.text();
      }),
    { refetchOnWindowFocus: false, enabled: false }
  );

  const getAocInputFromSite = async () => {
    refetch();
  };

  useEffect(() => {
    if (data) form.setFieldValue("input", data);
  }, [data]);

  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFormSubmit}
        autoComplete="off"
        layout="vertical"
        initialValues={{ input: input }}
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
            <Button
              disabled={state.cookie.length === 0}
              onClick={() => getAocInputFromSite()}
            >
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
