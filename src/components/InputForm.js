import React from "react";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Textarea from "muicss/lib/react/textarea";
// import SelectWork from "./SelectWork";
import Radio from "muicss/lib/react/radio";
// import Button from "muicss/lib/react/button";
import { Card } from "../card";
import InputMask from 'react-input-mask';

class InputForm extends React.Component {
  state = {
    selectedOption: "Установка",
    textarea: "Установка",
  };

  handleSubmit(event) {
    event.preventDefault();
    // console.log("handleSubmit...");

    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const street = document.getElementById("street").value;
    const comment = document.getElementById("comment").value;
    const submitBtn = document.getElementById("submit");
    const form = document.getElementById("form");

    const card = {
      date: new Date().toJSON(),
      phone,
      city,
      street,
      comment,
      author: "",
      completed: false,
    };

    submitBtn.disabled = true;
    // Запрос на сервер
    Card.create(card).then(() => {
      form.reset();
      submitBtn.disabled = false;
    });
  }

  onChange(ev) {
    this.setState({ selectedOption: ev.target.value });
    this.setState({ textarea: ev.target.value });

    const comment = document.getElementById("comment");
    comment.focus();
    // console.log("textarea", textarea);
  }

  onChangeTextarea(ev) {
    this.setState({ textarea: ev.target.value });
  }

  render() {
    return (
      <Form id="form">
        <legend>Вызвать мастера</legend>

        <label>Ваш телефон&nbsp;</label>
        <InputMask
            mask="+7 (999) 999-99-99"
            className="phone"
            id="phone"
        />
        {/*<Input*/}
        {/*  id="phone"*/}
        {/*  label="Ваш телефон"*/}
        {/*  floatingLabel={true}*/}
        {/*  required={true}*/}
        {/*/>*/}
        <Input
          id="city"
          label="Поселок/город"
          floatingLabel={true}
          required={true}
        />
        <Input
          id="street"
          label="Улица, дом, кв"
          floatingLabel={true}
          required={true}
        />

        {/* <SelectWork /> */}
        <div>
          <Radio
            name="inputA"
            label="Установка"
            value="Установка"
            checked={this.state.selectedOption === "Установка"}
            onChange={this.onChange.bind(this)}
          />
          <Radio
            name="inputA"
            label="Настройка"
            value="Настройка"
            checked={this.state.selectedOption === "Настройка"}
            onChange={this.onChange.bind(this)}
          />
          <Radio
            name="inputA"
            label="Другое"
            value="Другое"
            checked={this.state.selectedOption === "Другое"}
            onChange={this.onChange.bind(this)}
          />
        </div>

        <Textarea
          id="comment"
          label="Примечание"
          // floatingLabel={true}
          // value={this.state.selectedOption}
          value={this.state.textarea}
          onChange={this.onChangeTextarea.bind(this)}
        />

        <button
          type="submit"
          className="mui-btn mui-btn--raised mui-btn--primary"
          id="submit"
          onClick={this.handleSubmit}
        >
          Отправить заявку
        </button>
      </Form>
    );
  }
}

export default InputForm;
