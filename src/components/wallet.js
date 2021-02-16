import { redraw } from "plotly.js";
import React from "react";
import Plot from "react-plotly.js";
import NewDoge from '../containers/NewDoge.png'
import Ethereum from '../containers/Ethereum.png'
import Bitcoin from '../containers/Bitcoin.png'
import style from '../containers/style.css'
// import { pub, priv } from "../keys.js";
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
      APIKEY: 'WG4DzDb0c8lynHfMv6BGr2wFoeXMUJHCvsfr5R8Fd440uScg1Y3Wono4EjlN3i9a',
      APISECRET: 'X0kbMbhPp6LzaTdAqGgFuAFOewHjKdNycMfCu3LgnsO4mhT6wwjYHExnC7vnIkua',
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
    document.body.style.background = '#121212'
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <div>
          <div id="flex-container">
        <div id="flex-item"style={{backgroundColor: '#1F1B24',  width: 300, justifyContent:'center', alignItems:'center', marginLeft: 'auto', float: 'left'}}>
        <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', color: 'white'}}><img src={Bitcoin} style={{height: 50, width:50}}/>BTC: {this.state.BTC}</h2>
        </div>
        <div id="flex-item" style={{backgroundColor: '#1F1B24',  justifyContent:'center', alignItems:'center', float: 'right', width: 350}}>
        <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', color: 'white'}}> <img src={NewDoge} style={{height: 50, width: 50}}/>DOGE: {this.state.DOGE}</h2>
        </div>
        <div id="flex-item" style={{ backgroundColor: '#1F1B24',  justifyContent:'center', alignItems:'center', marginLeft: 'auto', marginRight: 'auto', width: 300}}>
        <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', color: 'white'}}><img src={Ethereum} style={{height: 50, width: 50}}/>ETH: {this.state.ETH}</h2>
        </div>
        <div style={{backgroundColor: '#1F1B24',  justifyContent:'center', alignItems:'center', marginLeft: 'auto', marginRight: 'auto'}}>
       </div>
       <div style={{ backgroundColor: '#1F1B24',  width: 300, justifyContent:'center', alignItems:'center', marginLeft: 'auto', float: 'left'}}>
       <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', color: 'white', float: 'left'}}>Balance: {this.state.Balance}</h2>
      </div>
        <div style={{margin: 'auto', backgroundColor: '#1F1B24',  justifyContent:'center', alignItems:'center', width:1000}}>
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
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
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
        </div>
        <footer style={{display: 'flex',  justifyContent:'center', alignItems:'center', color: 'white'}}>D-Trade by Dain Brownlow and Dustin Rothschild</footer>
      </div>
    );
  }
}

export default Wallet;
