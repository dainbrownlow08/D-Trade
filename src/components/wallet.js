import React from "react";
import Plot from "react-plotly.js";
import { pub, priv } from "../keys.js";
const Binance = require("node-binance-api");

class Wallet extends React.Component {
  state = {
    Balance: 0,
    BTC: 0,
    ETH: 0,
    DOGE: 0,
  };

  state = {
    Balance: 0,
    BTC: 0,
    ETH: 0,
    DOGE: 0,
    stockChartXValues: [],
    stockChartYValues: [],
    graphColor: "green",
  };

  prices = () => {
    const binance = new Binance().options({
      APIKEY: pub,
      APISECRET: priv,
    });
    binance.prices("BTCUSDT", (error, ticker) => {
      this.setState({ BTC: parseFloat(ticker.BTCUSDT) });
    });
    binance.prices("ETHUSDT", (error, ticker) => {
      this.setState({ ETH: parseFloat(ticker.ETHUSDT) });
    });
    binance.prices("DOGEUSDT", (error, ticker) => {
      this.setState({ DOGE: parseFloat(ticker.DOGEUSDT) }, () =>
        this.getWallet(this.props.wallet.id)
      );
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
        this.setWallet(id, currentBalance);
        pointerToThis.setState({
          stockChartXValues: [...this.state.stockChartXValues, res.updated_at],
          stockChartYValues: [...this.state.stockChartYValues, res.balance],
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

  componentDidMount() {
    this.prices();
    this.interval = setInterval(this.prices, 5000);
  }

  componentDidMount() {
    this.prices();
    this.interval = setInterval(this.prices, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <p>TEST</p>
        <h2>Balance: {this.state.Balance}</h2>
        <h2>BTC: {this.state.BTC}</h2>
        <h2>ETH: {this.state.ETH}</h2>
        <h2>DOGE: {this.state.DOGE}</h2>

        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: this.state.graphColor },
            },
          ]}
          layout={{
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
      </div>
    );
  }
}

export default Wallet;
