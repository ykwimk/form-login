import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const OrderList = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  font-weight: bold;
  font-size: 21px;
  text-align: center;
`;

class OrderContent extends React.Component {
  state = {
    id: 0,
    itemName: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`http://106.10.53.116:8099/order/${id}`, {
        header: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => this.setState({ ...res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { id, itemName } = this.state;
    return (
      <Wrapper>
        <OrderList>
          {id} | {itemName}
        </OrderList>
      </Wrapper>
    );
  }
}

export default OrderContent;
