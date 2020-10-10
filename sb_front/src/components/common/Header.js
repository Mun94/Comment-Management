import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive.js';
import routes from '../../routes/routes.js';
import palette from './palette.js';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const Wrapper = styled(Responsive)`
  height: 4.5rem;
  display: flex;
  align-items: center;
  a {
    padding-left: 1rem;
    text-decoration: none;
    color: ${palette.white};
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
`;

const Spacer = styled.div`
  height: 4.5rem;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to={routes.home}>SANDBOX</Link>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
