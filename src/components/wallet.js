import React, { Fragment } from "react";
import Plot from "react-plotly.js";
import { pub, priv } from "../keys.js";
import OrderForm from "./OrderForm.js";
import { Container, Row, Col, Alert } from "react-bootstrap";
const Binance = require("node-binance-api");

class Wallet extends React.Component {
  state = {
    Balance: 0,
    Cash: null,
    BTC: 0,
    BTCcolor: "seagreen",
    ETH: 0,
    ETHcolor: "seagreen",
    DOGE: 0,
    DOGEcolor: "seagreen",
    XRP: 0,
    XRPcolor: "seagreen",
    LTC: 0,
    LTCcolor: "seagreen",
    LINK: 0,
    LINKcolor: "seagreen",
    XMR: 0,
    XMRcolor: "seagreen",
    DOT: 0,
    DOTcolor: "seagreen",
    UNI: 0,
    UNIcolor: "seagreen",
    BTCHolding: 0,
    ETHHolding: 0,
    XRPHolding: 0,
    DOGEHolding: 0,
    LTCHolding: 0,
    LINKHolding: 0,
    XMRHolding: 0,
    DOTHolding: 0,
    UNIHolding: 0,
    stockChartXValues: [],
    xCount: 0,
    stockChartYValues: [],
    orders: [],
    graphColor: "seagreen",
    broke: false,
    gl: 0,
    pgl: 0,
  };

  // API PRICES

  prices = () => {
    const binance = new Binance().options({
      APIKEY: pub,
      APISECRET: priv,
    });
    binance.prices("BTCUSDT", (error, ticker) => {
      let color = this.state.BTCcolor;
      if (color != "seagreen" && ticker.BTCUSDT > this.state.BTC) {
        color = "seagreen";
      }
      if (color != "indianred" && ticker.BTCUSDT < this.state.BTC) {
        color = "indianred";
      }
      this.setState(
        { BTC: parseFloat(ticker.BTCUSDT), BTCcolor: color },
        () => {
          binance.prices("ETHUSDT", (error, ticker) => {
            let color = this.state.ETHcolor;
            if (color != "seagreen" && ticker.ETHUSDT > this.state.ETH) {
              color = "seagreen";
            }
            if (color != "indianred" && ticker.ETHUSDT < this.state.ETH) {
              color = "indianred";
            }
            this.setState(
              { ETH: parseFloat(ticker.ETHUSDT), ETHcolor: color },
              () => {
                binance.prices("DOGEUSDT", (error, ticker) => {
                  let color = this.state.DOGEcolor;
                  if (
                    color != "seagreen" &&
                    ticker.DOGEUSDT > this.state.DOGE
                  ) {
                    color = "seagreen";
                  }
                  if (
                    color != "indianred" &&
                    ticker.DOGEUSDT < this.state.DOGE
                  ) {
                    color = "indianred";
                  }
                  this.setState(
                    { DOGE: parseFloat(ticker.DOGEUSDT), DOGEcolor: color },
                    () => {
                      binance.prices("XRPUSDT", (error, ticker) => {
                        let color = this.state.XRPcolor;
                        if (
                          color != "seagreen" &&
                          ticker.XRPUSDT > this.state.XRP
                        ) {
                          color = "seagreen";
                        }
                        if (
                          color != "indianred" &&
                          ticker.XRPUSDT < this.state.XRP
                        ) {
                          color = "indianred";
                        }
                        this.setState(
                          { XRP: parseFloat(ticker.XRPUSDT), XRPcolor: color },
                          () => {
                            binance.prices("LTCUSDT", (error, ticker) => {
                              let color = this.state.LTCcolor;
                              if (
                                color != "seagreen" &&
                                ticker.LTCUSDT > this.state.LTC
                              ) {
                                color = "seagreen";
                              }
                              if (
                                color != "indianred" &&
                                ticker.LTCUSDT < this.state.LTC
                              ) {
                                color = "indianred";
                              }
                              this.setState(
                                {
                                  LTC: parseFloat(ticker.LTCUSDT),
                                  LINKcolor: color,
                                },
                                () => {
                                  binance.prices(
                                    "LINKUSDT",
                                    (error, ticker) => {
                                      this.setState(
                                        { LINK: parseFloat(ticker.LINKUSDT) },
                                        () => {
                                          binance.prices(
                                            "XMRUSDT",
                                            (error, ticker) => {
                                              let color = this.state.XMRcolor;
                                              if (
                                                color != "seagreen" &&
                                                ticker.XMRUSDT > this.state.XMR
                                              ) {
                                                color = "seagreen";
                                              }
                                              if (
                                                color != "indianred" &&
                                                ticker.XMRUSDT < this.state.XMR
                                              ) {
                                                color = "indianred";
                                              }
                                              this.setState(
                                                {
                                                  XMR: parseFloat(
                                                    ticker.XMRUSDT
                                                  ),
                                                  XMRcolor: color,
                                                },
                                                () => {
                                                  binance.prices(
                                                    "DOTUSDT",
                                                    (error, ticker) => {
                                                      let color = this.state
                                                        .DOTcolor;
                                                      if (
                                                        color != "seagreen" &&
                                                        ticker.DOTUSDT >
                                                          this.state.DOT
                                                      ) {
                                                        color = "seagreen";
                                                      }
                                                      if (
                                                        color != "indianred" &&
                                                        ticker.DOTUSDT <
                                                          this.state.DOT
                                                      ) {
                                                        color = "indianred";
                                                      }
                                                      this.setState(
                                                        {
                                                          DOT: parseFloat(
                                                            ticker.DOTUSDT
                                                          ),
                                                          DOTcolor: color,
                                                        },
                                                        () => {
                                                          binance.prices(
                                                            "UNIUSDT",
                                                            (error, ticker) => {
                                                              let color = this
                                                                .state.UNIcolor;
                                                              if (
                                                                color !=
                                                                  "seagreen" &&
                                                                ticker.UNIUSDT >
                                                                  this.state.UNI
                                                              ) {
                                                                color =
                                                                  "seagreen";
                                                              }
                                                              if (
                                                                color !=
                                                                  "indianred" &&
                                                                ticker.UNIUSDT <
                                                                  this.state.UNI
                                                              ) {
                                                                color =
                                                                  "indianred";
                                                              }
                                                              this.setState(
                                                                {
                                                                  UNI: parseFloat(
                                                                    ticker.UNIUSDT
                                                                  ),
                                                                  UNIcolor: color,
                                                                },
                                                                () => {
                                                                  this.getWallet(
                                                                    this.props
                                                                      .wallet.id
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                  );
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            });
                          }
                        );
                      });
                    }
                  );
                });
              }
            );
          });
        }
      );
    });
  };

  // LIFECYCLE

  getWallet = (id) => {
    const pointerToThis = this;
    let newCount = this.state.xCount + 1;
    let date = Date(Date.now());
    let time = date.toString();
    fetch(`http://localhost:3000/wallets/${id}`)
      .then((res) => res.json())
      .then((res) => {
        let btcTotal = res.btc * this.state.BTC;
        let ethTotal = res.eth * this.state.ETH;
        let dogeTotal = res.doge * this.state.DOGE;
        let xrpTotal = res.xrp * this.state.XRP;
        let ltcTotal = res.ltc * this.state.LTC;
        let linkTotal = res.link * this.state.LINK;
        let xmrTotal = res.xmr * this.state.XMR;
        let dotTotal = res.dot * this.state.DOT;
        let uniTotal = res.uni * this.state.UNI;
        let currentBalance =
          res.cash +
          btcTotal +
          ethTotal +
          dogeTotal +
          xrpTotal +
          ltcTotal +
          linkTotal +
          xmrTotal +
          dotTotal +
          uniTotal;
        pointerToThis.setState(
          {
            Cash: res.cash,
            BTCHolding: res.btc,
            ETHHolding: res.eth,
            DOGEHolding: res.doge,
            XRPHolding: res.xrp,
            LTCHolding: res.ltc,
            LINKHolding: res.link,
            XMRHolding: res.xmr,
            DOTHolding: res.dot,
            UNIHolding: res.uni,
            stockChartXValues: [...this.state.stockChartXValues, time],
            stockChartYValues: [
              ...this.state.stockChartYValues,
              currentBalance,
            ],
          },
          () => {
            this.setWallet(id, currentBalance);
          }
        );
      });
  };

  getOrders = () => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((orders) => {
        let ourOrders = orders.filter(
          (o) => o.wallet_id == this.props.wallet.id
        );
        ourOrders = ourOrders
          .slice(ourOrders.length - 10, ourOrders.length)
          .reverse();
        this.setState({
          orders: ourOrders,
        });
      });
  };

  setWallet = (id, newBalance) => {
    fetch(`http://localhost:3000/wallets/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ balance: newBalance }),
    })
      .then((res) => res.json())
      .then((res) => {
        let newColor = this.state.graphColor;
        if (
          this.state.stockChartYValues[
            this.state.stockChartYValues.length - 1
          ] < this.state.stockChartYValues[0] &&
          this.state.graphColor !== "indianred"
        ) {
          newColor = "indianred";
        }
        if (
          this.state.stockChartYValues[
            this.state.stockChartYValues.length - 1
          ] > this.state.stockChartYValues[0] &&
          this.state.graphColor !== "seagreen"
        ) {
          newColor = "seagreen";
        }
        this.setState(
          {
            Balance: res.balance,
            graphColor: newColor,
          },
          () => this.handlePortfolioReturn()
        );
      });
  };

  submitOrder = (e, o) => {
    e.preventDefault();
    if (o.type == "Buy") {
      if (o.total > this.state.Cash) {
        this.setState({
          broke: true,
        });
      } else {
        this.handleOrder(o);
        this.handleComplete();
        let quantity = o.quantity;
        let symbol = o.symbol;
        let total = o.total;

        let newQuantity = quantity + this.state[`${symbol}Holding`];
        let newCash = this.state.Cash - parseFloat(total);

        fetch(`http://localhost:3000/wallets/${this.props.wallet.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            [symbol]: newQuantity,
            cash: newCash,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
    }
    if (o.type == "Sell") {
      if (o.quantity > this.state[`${o.symbol}Holding`]) {
        this.setState({
          broke: true,
        });
      } else {
        this.handleOrder(o);
        this.handleComplete();
        let quantity = o.quantity;
        let symbol = o.symbol;
        let total = o.total;

        let newQuantity = this.state[`${symbol}Holding`] - quantity;
        let newCash = this.state.Cash + parseFloat(total);

        fetch(`http://localhost:3000/wallets/${this.props.wallet.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            [symbol]: newQuantity,
            cash: newCash,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      }
    }
  };

  // HANDLERS

  handleOrder = (o) => {
    let data = {
      ticker: o.symbol,
      quantity: o.quantity,
      total: o.total,
      type: o.type,
      wallet_id: this.props.wallet.id,
    };
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((order) => {
        console.log(order);
        let newOrders = this.state.orders;
        if (newOrders.length == 10) {
          newOrders.unshift(order);
          newOrders.pop();
        } else {
          newOrders.unshift(order);
        }
        this.setState({
          orders: newOrders,
        });
      });
  };

  handleComplete = () => {
    this.setState({
      broke: false,
    });
  };

  handlePortfolioReturn = () => {
    if (this.state.stockChartYValues.length > 1) {
      if (this.state.Balance >= this.state.stockChartYValues[0]) {
        let pos = (
          this.state.Balance - this.state.stockChartYValues[0]
        ).toFixed(2);
        let posPercent = (
          (pos / this.state.stockChartYValues[0]) *
          100
        ).toFixed(5);
        this.setState({
          gl: pos,
          pgl: posPercent,
        });
      } else {
        let neg = (
          this.state.Balance - this.state.stockChartYValues[0]
        ).toFixed(2);
        let negPercent = (
          (neg / this.state.stockChartYValues[0]) *
          100
        ).toFixed(5);
        this.setState({
          gl: neg,
          pgl: negPercent,
        });
      }
    }
  };

  // MOUNTING

  componentDidMount() {
    this.prices();
    this.getOrders();
    this.interval = setInterval(this.prices, 5000);
    document.body.style.background = "#181818";
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // RENDER
  render() {
    return (
      <Fragment>
        <br />
        <div className="outer">
          <Row>
            <Col xs={2}>
              <Row>
                <h4 id="wallet">Wallet</h4>
                <h9 className="data-top">/ Balance</h9>
              </Row>
              <Row>
                <div className="holding">
                  <Row>
                    <Col>
                      <div className="holding-flag">
                        <h6 className="holding-top">Symbol</h6>
                      </div>
                    </Col>
                    <Col></Col>
                  </Row>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">BTC</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.BTCHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">ETH</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.ETHHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">LTC</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.LTCHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">XMR</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.XMRHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">DOGE</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.DOGEHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">LINK</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.LINKHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">XRP</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.XRPHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">DOT</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.DOTHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="symbol-div">
                    <Row>
                      <Col xs={5}>
                        <p className="symbol-bold">UNI</p>
                      </Col>
                      <Col>
                        <p className="symbol">
                          {this.state.UNIHolding.toFixed(1)}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col xs={2}>
                  <h5 id="balance">
                    ${parseFloat(this.state.Balance).toFixed(2)}
                  </h5>
                </Col>
                <Col>
                  <h7 style={{ color: this.state.graphColor }}>
                    {this.state.graphColor == "seagreen" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill={this.state.graphColor}
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill={this.state.graphColor}
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                      </svg>
                    )}
                    ${this.state.gl}({this.state.pgl}%)
                  </h7>
                </Col>
              </Row>
              <Row>
                <div className="chart">
                  {this.state.stockChartXValues.length > 0 ? (
                    <Plot
                      data={[
                        {
                          x: this.state.stockChartXValues,
                          y: this.state.stockChartYValues,
                          type: "scatter",
                          mode: "lines+markers",
                          marker: { color: this.state.graphColor, size: 2 },
                        },
                      ]}
                      layout={{
                        width: 736,
                        height: 450,
                        paper_bgcolor: "rgba(0,0,0,0)",
                        plot_bgcolor: "rgba(0,0,0,0)",
                        xaxis: {
                          showgrid: false,
                          visible: false,
                        },
                        yaxis: {
                          showgrid: false,
                          showline: true,
                        },
                      }}
                    />
                  ) : null}
                </div>
              </Row>
              <br />
              <Row>
                <div class="order">
                  <div class="order-pad">
                    <OrderForm
                      prices={{
                        "BTC": this.state.BTC,
                        "ETH": this.state.ETH,
                        "DOGE": this.state.DOGE,
                        "XRP": this.state.XRP,
                        "LTC": this.state.LTC,
                        "LINK": this.state.LINK,
                        "XMR": this.state.XMR,
                        "DOT": this.state.DOT,
                        "UNI": this.state.UNI,
                      }}
                      Cash={this.state.Cash}
                      Holdings={{
                        "BTC": this.state.BTCHolding,
                        "ETH": this.state.ETHHolding,
                        "DOGE": this.state.DOGEHolding,
                        "XRP": this.state.XRPHolding,
                        "LTC": this.state.LTCHolding,
                        "LINK": this.state.LINKHolding,
                        "XMR": this.state.XMRHolding,
                        "DOT": this.state.DOTHolding,
                        "UNI": this.state.UNIHolding,
                      }}
                      submitOrder={this.submitOrder}
                    />
                  </div>
                </div>
              </Row>
            </Col>
            <Col style={{ padding: "40px" }}>
              <div>
                <h8 className="right-title">Exchange</h8>
                <div className="market">
                  <Row>
                    <Col>
                      <p className="ticker">BTC/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.BTCcolor }}
                        className="price"
                      >
                        {this.state.BTC}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="ticker">ETH/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.ETHcolor }}
                        className="price"
                      >
                        {this.state.ETH}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="ticker">LTC/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.LTCcolor }}
                        className="price"
                      >
                        {this.state.LTC}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="ticker">XMR/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.LTCcolor }}
                        className="price"
                      >
                        {this.state.LTC}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="ticker">DOGE/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.DOGEcolor }}
                        className="price"
                      >
                        {this.state.DOGE.toFixed(5)}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="ticker">LINK/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.LINKcolor }}
                        className="price"
                      >
                        {this.state.LINK}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="ticker">XRP/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.XRPcolor }}
                        className="price"
                      >
                        {this.state.XRP}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="ticker">DOT/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.DOTcolor }}
                        className="price"
                      >
                        {this.state.DOT}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="ticker">UNI/USD</p>
                    </Col>
                    <Col>
                      <p
                        style={{ color: this.state.UNIcolor }}
                        className="price"
                      >
                        {this.state.UNI}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div id="past-orders">
                <h8 className="right-title">Trade History</h8>
                <div className="history">
                  {this.state.orders.map((order) => {
                    if (order.orderType == "Buy") {
                      return (
                        <Row>
                          <Col xs={4}>
                            <p className="Buy">{order.total}</p>
                          </Col>
                          <Col xs={3}>
                            <p className="Buy2">{order.ticker}</p>
                          </Col>
                          <Col>
                            <p className="Buy2">
                              {order.quantity > 1000
                                ? `${(order.quantity / 1000).toFixed(1)}k`
                                : order.quantity}
                            </p>
                          </Col>
                        </Row>
                      );
                    } else {
                      return (
                        <Row>
                          <Col xs={4}>
                            <p className="Sell">{order.total}</p>
                          </Col>
                          <Col xs={3}>
                            <p className="Sell2">{order.ticker}</p>
                          </Col>
                          <Col>
                            <p className="Sell2">
                              {order.quantity > 1000
                                ? `${(order.quantity / 1000).toFixed(1)}k`
                                : order.quantity}
                            </p>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                </div>
              </div>
            </Col>
          </Row>
          {this.state.broke ? (
            <Container>
              <Alert variant={"warning"}>
                <p>Invalid transaction. Please check your balances.</p>
              </Alert>
            </Container>
          ) : null}
        </div>
        <br />
        <br />
      </Fragment>
    );
  }
}

export default Wallet;
