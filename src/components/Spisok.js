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
    Card.fetch().then((cards) => {
      this.setState({ cards });
    });
  }

  toggleHandler = (id, street) => {
    const shouldRemove = window.confirm(`${street}... Завершаем?`);
    if (shouldRemove) {
      const { user } = this.props;
      Card.update(id, user).then(() => this.fetchData());
    }
  };

  addComment = (id, comment) => {
    let addedComment = prompt('Добавьте комментарий').trim();
    if (addedComment !== null && addedComment.length > 0) {
      const newComment = comment + ' // ' + addedComment;
      const { user } = this.props;
      Card.update(id, user, newComment).then(() => this.fetchData());
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
                className="btn btn-outline-info btn-sm"
                onClick={() => this.addComment(card.id, card.comment)}
            >
              Коммент
            </button>
        )}
        {!this.props.completed && (
          <button
            type="button"
            className="btn btn-outline-warning btn-sm"
            onClick={() => this.toggleHandler(card.id, card.street)}
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
