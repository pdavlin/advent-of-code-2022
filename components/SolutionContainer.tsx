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

const ProblemLink = styled.div`
  margin: 1rem 0;
`;

const formatOutput = (input) => {
  if (Array.isArray(input)) {
    return `[\n  ${input.join(",\n  ")}\n]`;
  }
  return input;
};

const SolutionContainer = ({
  handleSubmission1,
  handleSubmission2,
  defaultInput1 = "",
  defaultInput2 = "",
}) => {
  const [output1, setOutput1] = useState(null);
  const [output2, setOutput2] = useState(null);
  const router = useRouter();
  const dayNum = +router.pathname.split("day")[1];

  const openProblem = () => {
    window.open(`https://adventofcode.com/2022/day/${dayNum}`, "_blank");
  };

  return (
    <>
      <h1>Day {dayNum}</h1>
      <ProblemLink><a onClick={() => openProblem()}>AOC Link</a></ProblemLink>
      <Container>
        <FormContainer>
          <SolutionForm
            defaultInput={defaultInput1}
            onFormSubmit={({ input }) => setOutput1(handleSubmission1(input))}
          ></SolutionForm>
          {output1 !== null && (
            <>
              <h2>Part 1 Solution</h2>
              <pre>{formatOutput(output1)}</pre>
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
                <pre>{formatOutput(output2)}</pre>
              </>
            )}
          </FormContainer>
        )}
      </Container>
    </>
  );
};

export default SolutionContainer;
