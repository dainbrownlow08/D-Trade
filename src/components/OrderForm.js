import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class OrderForm extends React.Component {
  state = {
    quantity: 0,
    symbol: "BTC",
    type: "Buy",
  };

  onQuantityChange = (e) => {
    if (e.target.value) {
      this.setState({
        quantity: e.target.value,
      });
    } else {
      this.setState({
        quantity: 0,
      });
    }
  };

  onSymbolChange = (e) => {
    this.setState({
      symbol: e.target.value,
    });
  };

  checkSwitch = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  createO = () => {
    return {
      symbol: this.state.symbol,
      quantity: parseFloat(this.state.quantity),
      total: parseFloat(
        this.props.prices[this.state.symbol] * parseFloat(this.state.quantity)
      ).toFixed(2),
      type: this.state.type,
    };
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={(e) => {
            this.props.submitOrder(e, this.createO());
          }}
        >
          <Form.Group>
            <Form.Label>Quantity: </Form.Label>
            <Form.Control
              onChange={(e) => this.onQuantityChange(e)}
              type="float"
              placeholder="0"
            />
            <Form.Text className="text-muted">
              Please enter the quantity.
            </Form.Text>
            {this.state.type == "Buy" ? (
              <Form.Text className="text-muted">
                Cash Available: $ {parseFloat(this.props.Cash).toFixed(2)}
              </Form.Text>
            ) : (
              <Form.Text className="text-muted">
                Holding Quantity: {this.props.Holdings[this.state.symbol]}
              </Form.Text>
            )}
            <Form.Text className="text-muted">
              Total: $
              {parseFloat(
                this.props.prices[this.state.symbol] * this.state.quantity
              ).toFixed(2)}
            </Form.Text>
          </Form.Group>
          <Form.Label
            className="my-1 mr-2"
            htmlFor="inlineFormCustomSelectPref"
          >
            Symbol
          </Form.Label>
          <Form.Control
            onChange={(e) => this.onSymbolChange(e)}
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            custom
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="DOGE">DOGE</option>
            <option value="XRP">XRP</option>
            <option value="LTC">LTC</option>
            <option value="LINK">LINK</option>
            <option value="XMR">XMR</option>
            <option value="DOT">DOT</option>
            <option value="UNI">UNI</option>
          </Form.Control>
          <Form.Group>
            <fieldset>
              <Form.Check
                checked={this.state.type === "Buy"}
                onChange={(e) => this.checkSwitch(e)}
                type="radio"
                label="Buy"
                value="Buy"
              />
              <Form.Check
                checked={this.state.type === "Sell"}
                onChange={(e) => this.checkSwitch(e)}
                type="radio"
                label="Sell"
                value="Sell"
              />
            </fieldset>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default OrderForm;
