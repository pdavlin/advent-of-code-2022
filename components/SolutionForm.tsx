import { Form, Button, Input } from "antd";
import styled from "styled-components";

const TextArea = styled(Input.TextArea)`
  margin: 1rem 0 1rem 1rem;
`;

const SolutionForm = ({ n = 1, onFormSubmit }) => {
  return (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFormSubmit}
        autoComplete="off"
        layout="vertical"
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SolutionForm;
