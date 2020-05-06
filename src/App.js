import React from "react";
import Container from "muicss/lib/react/container";
import InputForm from "./components/InputForm";
import Firebbb from "./components/fireb/Firebbb";
// import { Card } from "./card";
import { Spisok } from "./components/Spisok";

class App extends React.Component {
  state = {
    currentPage: 0,
    currentUser: null,
  };

  changeCurrentPage = (currentPage, currentUser) => {
    this.setState({ currentPage, currentUser });
  };

  renderCurrentPage = (page) => {
    if (page === 1) {
      return <InputForm />;
    }
    if (page === 2) {
      return <Spisok completed={false} user={this.state.currentUser} />;
    }
    if (page === 3) {
      return <Spisok completed={true} />;
    }
    return null;
  };

  render() {
    return (
      <div>
        <Firebbb
          changeCurrentPage={this.changeCurrentPage}
          // fetchCards={this.fetchCards}
        />
        <Container>{this.renderCurrentPage(this.state.currentPage)}</Container>
      </div>
    );
  }
}

export default App;
