

import styled from "styled-components";

import { AddCircle } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Table from "./Table";

export default function Main() {
  return (
    <Container>
      <Title>List of Keywords</Title>
      <ButtonWrapper>
        <Button variant="contained" startIcon={<AddCircle />} component="a" href="#/keywords/add">
         Add New Keyword
        </Button>
      </ButtonWrapper>
      <Table />
    </Container>
  )
}

const Container = styled.div`
  padding: 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const Title = styled.h3`
  font-size: 16px;
  margin-top: 0px;
  padding: 10px;
  background-color: #dedede;
`;