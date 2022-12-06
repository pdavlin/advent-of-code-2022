import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import SolutionForm from "./SolutionForm";

const Container = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  padding: 0 1rem 1rem 0;
  width: 100%;
`;

const SolutionContainer = ({
  handleSubmission1,
  handleSubmission2,
  defaultInput1 = "",
  defaultInput2 = "",
}) => {
  const [output1, setOutput1] = useState(null);
  const [output2, setOutput2] = useState(null);
  const router = useRouter();
  return (
    <>
      <h1>Day {router.pathname.split("day")[1]}</h1>
      <Container>
        <FormContainer>
          <SolutionForm
            defaultInput={defaultInput1}
            onFormSubmit={({ input }) => setOutput1(handleSubmission1(input))}
          ></SolutionForm>
          {output1 !== null && (
            <>
              <h2>Part 1 Solution</h2>
              <pre>{output1}</pre>
            </>
          )}
        </FormContainer>
        {handleSubmission2 !== null && (
          <FormContainer>
            <SolutionForm
              n={2}
              defaultInput={defaultInput2}
              onFormSubmit={({ input }) => setOutput2(handleSubmission2(input))}
            ></SolutionForm>
            {output2 !== null && (
              <>
                <h2>Part 2 Solution</h2>
                <pre>{output2}</pre>
              </>
            )}
          </FormContainer>
        )}
      </Container>
    </>
  );
};

export default SolutionContainer;
