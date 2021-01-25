import { Col, ListGroup, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import React from 'react';
import BookCard from "../components/BookCard";
//import { useEffect } from 'react';

class BooksPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            bookCardsForActiveUser: [],
            active: 'owned'
        }
    }

    componentDidMount(){
        this.handleChangeActive(this.props.booksOwned, 'owned');
    }

    handleChangeActive = (bookArr, activeStr) => {
        const allBooks = bookArr.filter(b => this.props.activeUser.id === b.userId);
        
        const bookCards = allBooks.map((b) => {
                    const book = this.props.books.filter(book => book.id == b.bookId);
                    if (book.length > 0) {
                        return <BookCard key={book.id} activeUser={this.props.activeUser} filter={this.props.filter} bookId={book[0].id} 
                                bookName={book[0].bookName} bookAuther={book[0].auther} bookPicture={book[0].bookCover}
                                active={this.state.active}/>
                    }
                    return "";
        });

        this.setState({
            bookCardsForActiveUser: bookCards,
            active: activeStr
        });
    }

    render(){
        if(!this.props.activeUser) {
            return <Redirect push to="/"/>;
        }    

        return(
            <Row>
                <Col sm={2}>
                    <ListGroup>
                        <ListGroup.Item className={this.state.active === 'owned' ? "active" : ""}
                                        action onClick={() => this.handleChangeActive(this.props.booksOwned, 'owned')}
                                        variant="danger">ספרים שברשותי</ListGroup.Item>
                        <ListGroup.Item className={this.state.active === 'read' ? "active" : ""}
                                        action onClick={() => this.handleChangeActive(this.props.booksRead, 'read')} variant="danger">ספרים שקראתי</ListGroup.Item>
                        <ListGroup.Item className={this.state.active === 'wantToRead' ? "active" : ""}
                                        action onClick={() => this.handleChangeActive(this.props.booksWantToRead, 'wantToRead')} variant="danger">ספרים שברצוני לקרוא</ListGroup.Item>
                        <ListGroup.Item className={this.state.active === 'wantToOwn' ? "active" : ""}
                                        action onClick={() => this.handleChangeActive(this.props.booksWantToOwn, 'wantToOwn')} variant="danger">ספרים שברצוני לרכוש</ListGroup.Item>
                        <ListGroup.Item className={this.state.active === 'loaned' ? "active" : ""}
                                        action onClick={() => this.handleChangeActive(this.props.booksLoaned, 'loaned')} variant="danger">ספרים שהשאלתי</ListGroup.Item>
                    </ListGroup>
                    </Col>
                <Col sm={10}>
                    <Row className="justify-content-even">
                        {this.state.bookCardsForActiveUser}
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default BooksPage;