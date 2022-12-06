import styled from "styled-components";
import { useState } from "react";
import SolutionForm from "../../components/SolutionForm";

const SolutionContainer = styled.div`
  display: flex;
  padding: 1rem;
`;

const ProblemContainer = styled.div`
  padding: 1rem;
  width: 100%;
`;

export default function Home() {
  const [output1, setOutput1] = useState("");
  const [output2, setOutput2] = useState("");

  const handleSubmission1 = ({ input }) => {
    setOutput1(
      input
        .trimEnd()
        .split("\n\n")
        .map(
          (paragraph) =>
            paragraph
              .split("\n")
              .map((line) => +line)
              .reduce((a, b) => a + b) // sum
        )
        .reduce((a, b) => Math.max(a, b))
    );
  };

  const handleSubmission2 = ({ input }) => {
    setOutput2(
      input
        .trimEnd()
        .split("\n\n")
        .map(
          (paragraph) =>
            paragraph
              .split("\n")
              .map((line) => +line)
              .reduce((a, b) => a + b) // sum
        )
        .sort((a, b) => b - a) // sort descending
        .slice(0, 3) // take top 3
        .reduce((a, b) => a + b) // sum
    );
  };

  return (
    <SolutionContainer>
      <ProblemContainer>
        <SolutionForm onFormSubmit={handleSubmission1}></SolutionForm>
        <pre>{output1}</pre>
      </ProblemContainer>
      <ProblemContainer>
        <SolutionForm n={2} onFormSubmit={handleSubmission2}></SolutionForm>
        <pre>{output2}</pre>
      </ProblemContainer>
    </SolutionContainer>
  );
}
