import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loading = () => {
  return (
    <StyledWrapper>
      <CircularProgress color="inherit" size={100} />
    </StyledWrapper>
  );
};

export default Loading;
