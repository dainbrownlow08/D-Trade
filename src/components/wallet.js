import React from "react";
import Plot from "react-plotly.js";
import OrderForm from "./OrderForm.js";
import Alert from "react-bootstrap/Alert";
import { pub, priv } from "../keys.js";
const Binance = require("node-binance-api");

class Wallet extends React.Component {
  state = {
    Balance: null,
    Cash: null,
    BTC: 0,
    ETH: 0,
    DOGE: 0,
    BTCHolding: 0,
    ETHHolding: 0,
    DOGEHolding: 0,
    stockChartXValues: [],
    stockChartYValues: [],
    graphColor: "green",
    display: false,
    broke: false,
  };

  prices = () => {
    const binance = new Binance().options({
      APIKEY: pub,
      APISECRET: priv,
    });
    binance.prices("BTCUSDT", (error, ticker) => {
      this.setState({ BTC: parseFloat(ticker.BTCUSDT) }, () => {
        binance.prices("ETHUSDT", (error, ticker) => {
          this.setState({ ETH: parseFloat(ticker.ETHUSDT) }, () => {
            binance.prices("DOGEUSDT", (error, ticker) => {
              this.setState({ DOGE: parseFloat(ticker.DOGEUSDT) }, () =>
                this.getWallet(this.props.wallet.id)
              );
            });
          });
        });
      });
    });
  };

  getWallet = (id) => {
    const pointerToThis = this;

    fetch(`http://localhost:3000/wallets/${id}`)
      .then((res) => res.json())
      .then((res) => {
        let btcTotal = res.btc * this.state.BTC;
        let ethTotal = res.eth * this.state.ETH;
        let dogeTotal = res.doge * this.state.DOGE;
        let currentBalance = res.cash + btcTotal + ethTotal + dogeTotal;
        pointerToThis.setState(
          {
            Cash: res.cash,
            BTCHolding: res.btc,
            ETHHolding: res.eth,
            DOGEHolding: res.doge,
            stockChartXValues: [
              ...this.state.stockChartXValues,
              res.updated_at,
            ],
            stockChartYValues: [...this.state.stockChartYValues, res.balance],
          },
          () => {
            this.setWallet(id, currentBalance);
          }
        );
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
          this.state.graphColor !== "red"
        ) {
          newColor = "red";
        }
        if (
          this.state.stockChartYValues[
            this.state.stockChartYValues.length - 1
          ] > this.state.stockChartYValues[0] &&
          this.state.graphColor !== "green"
        ) {
          newColor = "green";
        }
        this.setState({
          Balance: res.balance,
          graphColor: newColor,
        });
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

  componentDidMount() {
    this.prices();
    this.interval = setInterval(this.prices, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleForm = () => {
    let newDisplay = !this.state.display;
    this.setState({
      display: newDisplay,
      broke: false,
    });
  };

  handleComplete = () => {
    this.setState({
      broke: false,
      display: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.display ? (
          <OrderForm
            prices={{
              "BTC": this.state.BTC,
              "ETH": this.state.ETH,
              "DOGE": this.state.DOGE,
            }}
            Cash={this.state.Cash}
            Holdings={{
              "BTC": this.state.BTCHolding,
              "ETH": this.state.ETHHolding,
              "DOGE": this.state.DOGEHolding,
            }}
            submitOrder={this.submitOrder}
          />
        ) : null}
        {this.state.broke ? (
          <Alert variant={"warning"}>
            <p>Invalid transaction. Please check your balances.</p>
          </Alert>
        ) : null}
        <button onClick={this.toggleForm}>Create Order</button>
        <h2>Balance: {parseFloat(this.state.Balance).toFixed(2)}</h2>
        <h2>BTC: {parseFloat(this.state.BTC).toFixed(2)}</h2>
        <h2>ETH: {parseFloat(this.state.ETH).toFixed(2)}</h2>
        <h2>DOGE: {parseFloat(this.state.DOGE).toFixed(2)}</h2>
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
              shapes: [
                // {
                //   type: "line",
                //   x0: this.stockChartXValues[0],
                //   y0: this.stockChartYValues[0],
                //   x1: this.stockChartXValues[this.stockChartXValues.length - 1],
                //   y1: this.stockChartYValues[0],
                // },
              ],
              width: 981,
              height: 600,
              title: "Your Balance",
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
    );
  }
}

export default Wallet;
