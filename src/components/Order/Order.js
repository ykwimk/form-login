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
`;

const OrderItem = styled.button`
  display: block;
  background: none;
  border: 0;
  font-size: 21px;
  text-align: center;
  margin: 0 auto 12px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Pager = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 25px auto 0;
  text-align: center;
`;

const PagerNumber = styled.button`
  display: inline-block;
  text-align: center;
  width: 32px;
  line-height: 32px;
  border: 1px solid #000;
  margin-right: 12px;
  background: #fff;
  font-weight: bold;
  &.active {
    background: #000;
    color: #fff;
  }
  &:last-child {
    margin-right: 0;
  }
`;

class Order extends React.Component {
  state = {
    content: [],
    currentPage: 0,
    totalPages: 0,
    pager: [],
  };

  componentDidMount() {
    const { currentPage } = this.state;
    this.loadData(currentPage, 'init');
  }

  loadData = (currentPage, status) => {
    axios
      .get(`http://106.10.53.116:8099/order?page=${currentPage}`, {
        header: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        if (status === 'init') {
          const totalPages = res.data.totalPages;
          let pager = [];
          for (let i = 0; i <= totalPages - 1; i++) {
            pager.push(i);
          }
          this.setState({ pager });
        }
        this.setState({ ...res.data });
      })
      .catch((err) => console.log(err));
  };

  onClickItem = (id) => {
    this.props.history.push(`/mypage/order/${id}`);
  };

  onClickPager = (num) => {
    this.loadData(num, '');
  };

  render() {
    const { content, currentPage, pager } = this.state;
    return (
      <Wrapper>
        <OrderList>
          {content.map((item) => (
            <Item key={item.id} item={item} onClickItem={this.onClickItem} />
          ))}
        </OrderList>
        <Pager>
          {pager.map((args) => (
            <PagerNumber
              className={currentPage === args ? 'active' : ''}
              key={args}
              onClick={() => this.onClickPager(args)}
            >
              {args + 1}
            </PagerNumber>
          ))}
        </Pager>
      </Wrapper>
    );
  }
}

const Item = ({ item, onClickItem }) => {
  return (
    <OrderItem onClick={() => onClickItem(item.id)}>
      {item.id} | {item.itemName}
    </OrderItem>
  );
};

export default Order;
