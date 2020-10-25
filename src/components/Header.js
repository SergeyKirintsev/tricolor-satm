import React from "react";

class Header extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div className="mx-auto mt-2">
        <button
          style={{ width: "112px" }}
          type="button"
          className="btn btn-primary ml-2 mt-2"
          onClick={() => this.props.changeCurrentPage(1, currentUser)}
        >
          Добавить
        </button>
        <button
          style={{ width: "112px" }}
          type="button"
          className="btn btn-secondary ml-2 mt-2"
          onClick={() => this.props.changeCurrentPage(2, currentUser)}
        >
          В работе
        </button>
        <button
          style={{ width: "112px" }}
          type="button"
          className="btn btn-success ml-2 mt-2"
          onClick={() => this.props.changeCurrentPage(3, currentUser)}
        >
          Завершены
        </button>
      </div>
    );
  }
}

export default Header;
