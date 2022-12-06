import { Form, Button, Input } from "antd";
import styled from "styled-components";

const TextArea = styled(Input.TextArea)`
  margin: 0;
`;

const SolutionForm = ({ n = 1, onFormSubmit, defaultInput }) => {
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Part {n}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SolutionForm;
