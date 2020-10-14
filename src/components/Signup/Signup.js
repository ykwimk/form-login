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
  setAuth: stores.user.setAuth,
}))
@observer
class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: '',
    mobile: '',
    isValidateEmail: true,
    isValidatePassword: true,
  };

  validateEmail = (str) => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(str);
  };

  validatePassword = (str) => {
    if (str.length < 8 || str.length > 15) {
      return false;
    } else {
      return true;
    }
  };

  onChangeValue = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      if (value.length < 8 || value.length > 15) {
        this.setState({ isValidatePassword: false });
      } else {
        this.setState({ isValidatePassword: true });
      }
    }

    this.setState({ [name]: value });
  };

  onBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (!this.validateEmail(value)) {
        this.setState({ isValidateEmail: false });
      }
    }
  };

  onClickSignUp = () => {
    const { email, password, passwordConfirm, mobile } = this.state;

    if (!this.validateEmail(email)) {
      alert('이메일을 확인해주세요!');
      this.setState({ isValidateEmail: false });
      this.emailInput.focus();
      return;
    }

    if (!this.validatePassword(password)) {
      alert('비밀번호를 확인해주세요!');
      this.setState({ isValidatePassword: false });
      this.passwordInput.focus();
      return;
    }

    if (passwordConfirm !== password) {
      alert('비밀번호가 불일치합니다!');
      this.passwordConfirmInput.focus();
      return;
    }

    axios
      .post(
        'http://106.10.53.116:8099/sign-up',
        {
          email,
          password,
          mobile,
        },
        {
          header: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
      .then((res) => {
        const token = res.data.token;
        alert('회원가입 성공!');
        this.props.setAuth(token);
        this.props.history.push('/');
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      email,
      password,
      passwordConfirm,
      mobile,
      isValidateEmail,
      isValidatePassword,
    } = this.state;
    return (
      <Wrapper>
        <Form>
          <Input
            className={!isValidateEmail ? 'incorrect' : ''}
            type="text"
            name="email"
            value={email}
            placeholder="이메일"
            ref={(input) => {
              this.emailInput = input;
            }}
            onChange={(e) => this.onChangeValue(e)}
            onBlur={(e) => this.onBlur(e)}
          />
          <Input
            className={!isValidatePassword ? 'incorrect' : ''}
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호"
            ref={(input) => {
              this.passwordInput = input;
            }}
            onChange={(e) => this.onChangeValue(e)}
            onBlur={(e) => this.onBlur(e)}
          />
          <Input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            placeholder="비밀번호 확인"
            ref={(input) => {
              this.passwordConfirmInput = input;
            }}
            onChange={(e) => this.onChangeValue(e)}
          />
          <Input
            type="number"
            name="mobile"
            value={mobile}
            placeholder="연락처"
            onChange={(e) => this.onChangeValue(e)}
          />
          <Button onClick={this.onClickSignUp}>가입하기</Button>
        </Form>
      </Wrapper>
    );
  }
}

export default Signup;
