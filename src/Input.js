import React, { Component } from 'react';
import { connect } from 'react-redux';
import { guessWord } from './actions';

export class UnconnectedInput extends Component {

  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }

  submitGuessedWord(evt) {
    // dont submit form
    evt.preventDefault();
    const guessedWord = this.inputBox.current.value;
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
    }
    this.inputBox.current.value = '';
  }

  render() {
    const contents = this.props.success ?
      null
    :
    (
      <form className="form-inline">
        <input
          ref={this.inputBox}
          data-test="input-box"
          className="mb-2 mx-sm-3"
          id="word-guess"
          type="text"
          placeholder="enter guess" />
        <button
          data-test="submit-button"
          onClick={this.submitGuessedWord}
          type="submit"
          className="btn btn-primary mb-2"
          type="submit">
          Submit
        </button>
      </form>
    )
    return (
      <div data-test="component-input">
        { contents }
      </div>
    )
  }
};

const mapStateToProps = ({ success }) => {
  return { success };
}

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);