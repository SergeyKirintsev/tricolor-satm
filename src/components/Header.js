import React from "react";
import InputForm from "./InputForm";
import {Spisok} from "./Spisok";
import Container from "muicss/lib/react/container";

class Header extends React.Component {
    state = {
        currentPage: 2,
    };

    changeCurrentPage = (currentPage) => {
        this.setState({currentPage});
    };

    renderCurrentPage = (page, user) => {
        if (page === 1) {
            return <InputForm changeCurrentPage={this.changeCurrentPage} />;
        }
        if (page === 2) {
            return <Spisok completed={false} user={user}/>;
        }
        if (page === 3) {
            return <Spisok completed={true}/>;
        }
        return null;
    };

    render() {
        const {currentUser} = this.props;
        return (
                <>
                <div style={{textAlign: "center"}}>
                    <button
                        style={{width: "112px"}}
                        type="button"
                        className="btn btn-primary ml-2 mt-2"
                        onClick={() => this.changeCurrentPage(1)}
                    >
                        Добавить
                    </button>
                    <button
                        style={{width: "112px"}}
                        type="button"
                        className="btn btn-secondary ml-2 mt-2"
                        onClick={() => this.changeCurrentPage(2)}
                    >
                        В работе
                    </button>
                    <button
                        style={{width: "112px"}}
                        type="button"
                        className="btn btn-success ml-2 mt-2"
                        onClick={() => this.changeCurrentPage(3)}
                    >
                        Завершены
                    </button>
                </div>
                <Container fluid={true}>
                    {this.renderCurrentPage(this.state.currentPage, currentUser)}
                </Container>
                </>
        );
    }
}

export default Header;
