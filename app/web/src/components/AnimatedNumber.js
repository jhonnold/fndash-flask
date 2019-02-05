import React from 'react';
import raf from 'raf';

class AnimatedNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNumber: 0,
    };

    this.confirmSixtyFPS = this.confirmSixtyFPS.bind(this);
    this.prepTween = this.prepTween.bind(this);
    this.endTween = this.endTween.bind(this);
    this.tweenValue = this.tweenValue.bind(this);
  }

  componentDidMount() {
    this.prepTween();
  }

  componentDidUpdate(prevProps) {
    const { currentNumber } = this.state;
    const { number } = this.props;
    if (currentNumber === number) {
      return;
    }
    if (prevProps.number === number) {
      return;
    }
    if (this.tweenHandler) {
      this.endTween();
    }

    this.prepTween();
  }

  confirmSixtyFPS(timestamp) {
    const { lastTimestamp } = this.state;
    return !lastTimestamp || timestamp - lastTimestamp > 16;
  }

  prepTween() {
    this.tweenHandler = raf((timestamp) => {
      this.tweenValue(timestamp, true);
    });
  }

  endTween() {
    raf.cancel(this.tweenHandler);
  }

  tweenValue(timestamp, start = false) {
    if (!this.confirmSixtyFPS(timestamp)) {
      this.tweenHandler = raf(this.tweenValue);
      return;
    }

    const { number, duration } = this.props;
    const { currentNumber, startTime, fromNumber } = this.state;
    const validatedStartTime = start ? timestamp : startTime;
    const validatedFromNumber = start ? currentNumber : fromNumber;

    let newNumber;
    if (timestamp - validatedStartTime >= duration) {
      newNumber = number;
    } else {
      newNumber = validatedFromNumber
        + (number - validatedFromNumber) * ((timestamp - validatedStartTime) / duration);
    }

    if (newNumber === number) {
      this.endTween();
      this.setState({
        currentNumber: number,
      });
      return;
    }

    this.setState({
      currentNumber: newNumber,
      startTime: validatedStartTime || timestamp,
      fromNumber: validatedFromNumber,
      lastTimestamp: timestamp,
    });
    this.tweenHandler = raf(this.tweenValue);
  }

  render() {
    const { noDecimal, format, component } = this.props;
    const { currentNumber } = this.state;
    const displayValue = noDecimal ? Math.round(currentNumber) : currentNumber;

    const C = component;
    const formattedValue = format ? format(displayValue) : displayValue;

    if (C) {
      return <C>{formattedValue}</C>;
    }

    return <h2>{formattedValue.toString()}</h2>;
  }
}

AnimatedNumber.defaultProps = {
  number: 0,
  duration: 250,
  noDecimal: false,
  format: undefined,
  component: undefined,
};

export default AnimatedNumber;
