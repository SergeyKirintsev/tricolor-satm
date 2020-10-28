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

    const filteredArr = cards.filter(
      (card) => card.completed === this.props.completed
    );
    // console.log("filteredArr", filteredArr);

    const listCards = filteredArr.map((card) => (
      <li key={card.id} className="list-group-item">
        {new Date(card.date).toLocaleDateString()} <mark><a href={"tel:" + card.phone}>{card.phone}</a></mark>{" "}
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
        <h3>{!this.props.completed ? <span>В работе - </span> : <span>Завершены - </span>} {filteredArr.length}</h3>
        <ul className="list-group list-group-flush">{listCards}</ul>
      </div>
    );
  }
}

export { Spisok };
