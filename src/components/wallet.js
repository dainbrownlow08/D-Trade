import React from 'react'
import Plot from 'react-plotly.js';
// import {pub,priv} from '../keys.js'
const Binance = require('node-binance-api');

class Wallet extends React.Component {

    state = {
      Balance: 0,
      BTC: 0,
      ETH: 0,
      DOGE: 0,
      stockChartXValues: [],
      stockChartYValues: [],
    }
  
    prices = () => {
      const binance = new Binance().options({
        APIKEY: 'WG4DzDb0c8lynHfMv6BGr2wFoeXMUJHCvsfr5R8Fd440uScg1Y3Wono4EjlN3i9a',
        APISECRET: 'X0kbMbhPp6LzaTdAqGgFuAFOewHjKdNycMfCu3LgnsO4mhT6wwjYHExnC7vnIkua'
      });
      binance.prices('BTCUSDT', (error, ticker) => {
        this.setState({BTC: parseFloat(ticker.BTCUSDT)})
      });
      binance.prices('ETHUSDT', (error, ticker) => {
        this.setState({ETH: parseFloat(ticker.ETHUSDT)})
      });
      binance.prices('DOGEUSDT', (error, ticker) => {
        this.setState({DOGE: parseFloat(ticker.DOGEUSDT)}, () => this.getWallet(this.props.wallet.id))
      });
    }
  
    getWallet = (id) => {
      const pointerToThis = this;

      fetch(`http://localhost:3000/wallets/${id}`)
        .then(res => res.json())
        .then(res => {
          let btcTotal = res.btc * this.state.BTC
          let ethTotal = res.eth * this.state.ETH
          let dogeTotal = res.doge * this.state.DOGE
          let currentBalance = res.cash + btcTotal + ethTotal + dogeTotal
          this.setWallet(id,currentBalance)

          pointerToThis.setState({
            stockChartXValues: [...this.state.stockChartXValues, res.updated_at],
            stockChartYValues: [...this.state.stockChartYValues, res.balance]
          })
        })
    }
  
    setWallet = (id,newBalance) => {
      fetch(`http://localhost:3000/wallets/${id}`,{
        method:'PATCH',
        headers:{'content-type':'application/json'},
        body: JSON.stringify({balance: newBalance})
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          Balance: res.balance
        })
        // console.log(res)
      })
    }
  
    componentDidMount() {
      this.prices()
      this.interval = setInterval(this.prices,5000)
    }

    componentWillUnmount() {
      clearInterval(this.interval)
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
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
        layout={ {width: 720, height: 440, title: 'Your Balance'} }
      />
       
      </div>
      )
    }
  
  
  }
  
  export default Wallet;