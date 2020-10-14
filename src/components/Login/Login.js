import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  height: 32px;
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid #000;
  background: none;
  outline: 0;
  margin-bottom: 12px;
  &.incorrect {
    border: 1px solid red;
  }
`;

const Button = styled.button`
  display: block;
  width: 200px;
  margin: 0 auto;
  line-height: 42px;
  text-align: center;
  background: #000;
  color: #fff;
  font-size: 16px;
  border: 0;
  border-radius: 12px;
  outline: 0;
`;

@inject((stores) => ({
  token: stores.user.token,
  setAuth: stores.user.setAuth,
}))
@observer
class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onChangeValue = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onClickLogin = () => {
    const { email, password } = this.state;
    axios
      .post(
        'http://106.10.53.116:8099/login',
        { email, password },
        {
          header: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
      .then((res) => {
        const token = res.data.token;
        alert('로그인 성공!');
        this.props.setAuth(token);
        this.props.history.push('/');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert('비밀번호를 확인해주세요!');
        }
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Wrapper>
        <Form>
          <Input
            type="text"
            name="email"
            value={email}
            placeholder="이메일"
            onChange={(e) => this.onChangeValue(e)}
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => this.onChangeValue(e)}
          />
          <Button onClick={this.onClickLogin}>로그인</Button>
        </Form>
      </Wrapper>
    );
  }
}

export default Login;
