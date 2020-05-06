import React from "react";
import { Card } from "../card";

class Spisok extends React.Component {
  state = {
    cards: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    Card.fetch(1).then((cards) => {
      this.setState({ cards });
    });
  }

  toggleHandler = (id) => {
    // console.log(id);
    const shouldRemove = window.confirm("Завершаем?");
    if (shouldRemove) {
      const { user } = this.props;
      Card.update(id, user).then(() => this.fetchData());
    }
  };

  render() {
    const { cards } = this.state;

    const filetredArr = cards.filter(
      (card) => card.completed === this.props.completed
    );
    // console.log("filetredArr", filetredArr);

    const listCards = filetredArr.map((card) => (
      <li key={card.id} className="list-group-item">
        {new Date(card.date).toLocaleDateString()} <mark>{card.phone}</mark>{" "}
        <br />
        <u>{card.comment}</u> <strong>{card.city}</strong> {card.street}
        {"  "}
        {this.props.completed && <mark>Завершил: {card.author}</mark>}
        {!this.props.completed && (
          <button
            type="button"
            className="btn btn-outline-warning btn-sm"
            onClick={() => this.toggleHandler(card.id)}
          >
            Завершить
          </button>
        )}
      </li>
    ));

    return (
      <div>
        <h2>{!this.props.completed ? <p>В работе</p> : <p>Завершено</p>}</h2>
        <ul className="list-group list-group-flush">{listCards}</ul>
      </div>
    );
  }
}

export { Spisok };
