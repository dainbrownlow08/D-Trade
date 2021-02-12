import React from 'react'
import './App.css';
import {pub,priv} from './keys.js'
const Binance = require('node-binance-api');

class App extends React.Component {

  state = {
    Account: 2,
    Balance: 0,
    BTC: 0,
    ETH: 0,
    DOGE: 0
  }

  prices = () => {
    const binance = new Binance().options({
      APIKEY: pub,
      APISECRET: priv
    });
    binance.prices('BTCUSDT', (error, ticker) => {
      this.setState({BTC: parseFloat(ticker.BTCUSDT)})
    });
    binance.prices('ETHUSDT', (error, ticker) => {
      this.setState({ETH: parseFloat(ticker.ETHUSDT)})
    });
    binance.prices('DOGEUSDT', (error, ticker) => {
      this.setState({DOGE: parseFloat(ticker.DOGEUSDT)}, () => this.getWallet(3))
    });
  }

  getWallet = (id) => {
    fetch(`http://localhost:3000/wallets/${id}`)
      .then(res => res.json())
      .then(res => {
        let btcTotal = res.btc * this.state.BTC
        let ethTotal = res.eth * this.state.ETH
        let dogeTotal = res.doge * this.state.DOGE
        let currentBalance = res.cash + btcTotal + ethTotal + dogeTotal
        this.setWallet(id,currentBalance)
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
      console.log(res)
    })
  }

  componentDidMount() {
    this.prices()
    // this.getWallet(3)
    setInterval(this.prices,5000)
    // setInterval(() => this.getWallet(3),5000)
  }



  render() {
    return (
      <div className="App">
      <p>TEST</p>
      <h2>Balance: {this.state.Balance}</h2>
      <h2>BTC: {this.state.BTC}</h2>
      <h2>ETH: {this.state.ETH}</h2>
      <h2>DOGE: {this.state.DOGE}</h2>
    </div>
    )
  }


}

export default App;





