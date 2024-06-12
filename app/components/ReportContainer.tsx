import React, { ReactNode } from "react";
import styled from "styled-components";

interface ReportContainerProps {
  children: ReactNode;
}

const StyledContainer = styled.div`
  h1 {
    font-size: 28px;
    color: black;
    width: 100%;
    font-weight: 500;
    padding: 10px 0px 10px 0px;
  }

  h2 {
    display: flex;
    align-items: center;
    font-size: 24px;
    gap: 10px;

    color: black;
    width: 100%;
    //border-bottom: 1px solid black;
  }

  h2:befor {
    content: "";
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #22c55e;
    display: inline-block;
  }

  h3 {
    color: black;
    font-size: 20px;
    //border-width: 0px 0px 1px 0px;
  }

  h4 {
    color: black;

    font-size: 16px;
  }

  table {
    border-collapse: collapse;
  }

  td,
  th {
    text-align: left;
    padding: 10px;
  }

  hr {
    display: none;
    color: white;
    background-color: white;
  }

  th:first-of-type {
    border-top-left-radius: 10px;
  }
  th:last-of-type {
    border-top-right-radius: 10px;
  }
  tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 10px;
  }
  tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 10px;
  }

  tr {
    border-bottom: 1px solid #d4d4d4;
  }

  thead tr {
    //background-color: #2563eb;
  }

  tbody tr:nth-child(odd) {
    //  background-color: #f5f5f4;
  }

  tbody tr:nth-child(even) {
    //background-color: #e7e5e4;
    //color: black;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  li {
    color: black;
    display: flex;
    gap: 10px;
    margin: 0px 0px 0px 20px;
  }
  li:befor {
    content: "";
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: 4px solid white;
    border-radius: 50%;
    background: #d4d4d4;
    display: inline-block;
    padding: 0px 10px 0px 10px;
  }
  p {
    color: black;
  }
  strong {
    font-weight: 500;
  }
`;

export default function ReportContainer({ children }: ReportContainerProps) {
  return (
    <StyledContainer className="flex flex-col">{children}</StyledContainer>
  );
}
