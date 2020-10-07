import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrap = styled.header`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 42px;
`

const Navigation = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${props => props.theme.mobile} {
    display: none;
  }
`

const NavigationButton = styled.li`
  width: 80px;
  line-height: 28px;
  text-align: center;
  @media ${props => props.theme.mobile} {
    width: 100%;
  }
  a {
    display: block;
  }
`

const HamburgerButton = styled.button`
  display: inline-block;
  width: 30px;
  .line1,
  .line2,
  .line3 {
    display: block;
    width: 90%;
    height: 3px;
    background: #000;
    margin: 0 auto 5px;
  }
  border: 0;
  background: none;
  outline: 0;
  @media ${props => props.theme.desktop} {
    display: none;
  }
`

const HamburgerMenu = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  box-sizing: border-box;
  top: ${(props) => props.isOpen ? `0%` : `-100%`};
  left: 0;
  right: 0;
  background: #fff;
  transition: all 0.4s;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 15px;
  display: inline-block;
  background: none;
  border: 0;
  outline: 0;
`


class Header extends React.Component {
  state = {
    isOpen: false
  }

  onClickToggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen, })
  }

  render() {
    return (
      <HeaderWrap>
        <Logo>🖥</Logo>
        <Navigation>
          <NavigationButton>
            <Link to="/">서비스</Link>
          </NavigationButton>
          <NavigationButton>
            <Link to="/sign-up">회원가입</Link>
          </NavigationButton>
          <NavigationButton>
            <Link>로그인</Link>
          </NavigationButton>
        </Navigation>
        <HamburgerButton onClick={this.onClickToggleMenu}>
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </HamburgerButton>
        <HamburgerMenu isOpen={this.state.isOpen}>
          <CloseButton onClick={this.onClickToggleMenu}>닫기</CloseButton>
          <NavigationButton>
            <Link to="/">서비스</Link>
          </NavigationButton>
          <NavigationButton>
            <Link to="/sign-up">회원가입</Link>
          </NavigationButton>
          <NavigationButton>
            <Link>로그인</Link>
          </NavigationButton>
        </HamburgerMenu>
      </HeaderWrap>
    )
  }
}

export default Header;