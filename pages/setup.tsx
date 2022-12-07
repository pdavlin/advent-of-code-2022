import { useActor, useSelector } from "@xstate/react";
import { Input, Form, Button } from "antd";
import { useContext } from "react";
import styled from "styled-components";
import { MyContext } from "../hooks/contexts";
import { myModel, selectIsCookieLoaded } from "../hooks/myMachine";

const TextArea = styled(Input.TextArea)`
  margin: 0;
`;

const Setup = () => {
  const globalState = useContext(MyContext);
  const {myService} = globalState;
  const cookieLoaded = useSelector(myService, selectIsCookieLoaded);

  const onFormSubmit =() => {
    console.log('hi');
    myService.send(myModel.events.onCookieLoaded())
  }
  
  return (
    <>
      <Form
        name="basic"
        onFinish={onFormSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={`Advent of Code Cookie `}
          name="cookie"
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

export default Setup;
