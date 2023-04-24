import React from "react";
import styled from "styled-components";
import Page from "../component/Page";

const MainDiv = styled.div``;

const ContentDiv = styled.div``;

const ScrollPage = () => {
  return (
    <MainDiv>
      <ContentDiv>
        <Page />
      </ContentDiv>
    </MainDiv>
  );
};

export default ScrollPage;
