import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`

const MainImage = styled.img`
  display: block;
  max-width: 500px;
  width: 80%;
  margin: 0 auto 25px;
`

const Button = styled.button`
  display: block;
  width: 200px;
  margin: 0 auto;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background: #000;
  border-radius: 12px;
  color: #fff;
  outline: 0;
`

class Service extends React.Component {
  onClickOrder = () => {
    alert('로그인을 해주세요.')
    this.props.history.push('/sign-up')
  }

  render() {
    return (
      <Wrapper>
        <MainImage src={`http://lorempixel.com/400/255/cats/`} />
        <Button onClick={this.onClickOrder}>주문하기</Button>
      </Wrapper>
    )
  }
}

export default Service;