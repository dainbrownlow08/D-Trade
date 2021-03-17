import React, { Fragment } from "react";
import NewDoge from "../img/NewDoge.png";
import Ethereum from "../img/Ethereum.png";
import Bitcoin from "../img/Bitcoin.png";
import XRP from "../img/XRP.png";
import LTC from "../img/LTC.png";
import LINK from "../img/LINK.png";
import XMR from "../img/XMR.png";
import DOT from "../img/DOT.png";
import UNI from "../img/UNI.png";
import { Container, Row, Col } from "react-bootstrap";

class Orders extends React.Component {
  state = {
    orders: [],
  };

  getOrders = () => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((orders) => {
        let ourOrders = orders.filter(
          (o) => o.wallet_id == this.props.wallet.id
        );
        this.setState({
          orders: ourOrders,
        });
      });
  };

  componentDidMount() {
    this.getOrders();
    document.body.style.background = "#181818";
  }

  render() {
    return (
      <Fragment>
        <Container>
          <div>
            <div className="o-d-top">
              <Row>
                <Col xs={1}></Col>
                <Col>
                  <p className="order-p">Symbol</p>
                </Col>
                <Col>
                  <p className="order-p">Order Type</p>
                </Col>
                <Col>
                  <p className="order-p">Quantity</p>
                </Col>
                <Col>
                  <p className="order-p">Total</p>
                </Col>
                <Col className="timestamp">
                  <p className="order-p">Timestamp</p>
                </Col>
              </Row>
            </div>
            {this.state.orders.map((order) => {
              let timestamp = order.created_at.split("T")[1];
              switch (order.ticker) {
                case "BTC": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={Bitcoin} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                case "ETH": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={Ethereum} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                case "LTC": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={LTC} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                case "XMR": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={XMR} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                case "DOGE": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={NewDoge} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                case "LINK": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={LINK} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                case "XRP": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={XRP} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                case "DOT": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={DOT} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
                case "UNI": {
                  return (
                    <div className="o-d">
                      <Row>
                        <Col xs={1}>
                          <img src={UNI} className="order-img" />
                        </Col>
                        <Col>
                          <p className="order-p">{order.ticker}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.orderType}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.quantity}</p>
                        </Col>
                        <Col>
                          <p className="order-p">{order.total}</p>
                        </Col>
                        <Col className="timestamp">
                          <p className="order-p">{timestamp}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                }
              }
            })}
          </div>
        </Container>
        <br />
        <br />
      </Fragment>
    );
  }
}

export default Orders;
