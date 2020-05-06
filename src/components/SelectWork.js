import React from "react";
import Radio from "muicss/lib/react/radio";

class SelectWork extends React.Component {
  state = {
    selectedOption: "option2",
  };

  onChange(ev) {
    this.setState({ selectedOption: ev.target.value });
  }

  render() {
    return (
      <div>
        <Radio
          name="inputA"
          label="Option one"
          value="option1"
          checked={this.state.selectedOption === "option1"}
          onChange={this.onChange.bind(this)}
        />
        <Radio
          name="inputA"
          label="Option two"
          value="option2"
          checked={this.state.selectedOption === "option2"}
          onChange={this.onChange.bind(this)}
        />
        <Radio
          name="inputA"
          label="Option three"
          value="option3"
          checked={this.state.selectedOption === "option3"}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}

export default SelectWork;
