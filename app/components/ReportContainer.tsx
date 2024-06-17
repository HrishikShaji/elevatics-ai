import React, { ReactNode } from "react";
import styled from "styled-components";

interface ReportContainerProps {
	children: ReactNode;
}

const StyledContainer = styled.div`
  h1 {
    font-size: 32px;
    color: black;
    font-weight: 500;
    padding: 0px 0px 20px 0px;
  }

  h2 {
    font-size: 24px;
    color: black;
    padding: 15px 0px 15px 0px;
  }

  h3 {
    color: black;
    font-size: 24px;
    font-weight: 500;
    padding: 15px 0px 15px 0px;
  }

  h4 {
    color: black;
    font-size: 20px;
    padding: 10px 0px 10px 0px;
  }
  p {
    color: black;
    padding: 10px 0px 10px 0px;
  }
  strong {
    font-weight: 500;
  }

  li {
    color: black;
    display: flex;
    gap: 10px;
    padding: 0px 0px 0px 15px;
  }

li:first-child{
min-width:500px;
margin-right:10px;
}

  li strong {
    min-width: 500px;
    margin-right: 10px;
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
  h2:befor {
    content: "";
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #22c55e;
    display: inline-block;
  }
`;

export default function ReportContainer({ children }: ReportContainerProps) {
	return <StyledContainer>{children}</StyledContainer>;
}
