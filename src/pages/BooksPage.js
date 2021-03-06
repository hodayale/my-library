import { Col, ListGroup, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import React from 'react';
import BookCard from "../components/BookCard";

class BooksPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            active: 'owned',
            currentBooks: this.props.booksOwned
        }
    }

    componentDidMount(){
        this.handleChangeActive(this.props.booksOwned, 'owned');
    }

    handleChangeActive = (bookArr, activeStr) => {
        if(this.props.activeUser) {
            this.setState({
                active: activeStr,
                currentBooks: bookArr
            });
        }
    }

    render(){
        if(!this.props.activeUser) {
            return <Redirect push to='/'/>;
        }  
        
        const allBooks = this.state.currentBooks.filter(b => this.props.activeUser.id === b.userId);
        const bookCards = allBooks.map((b) => {
                    const book = this.props.books.filter(book => book.id == b.bookId);
                    if (book.length > 0) {
                        //get if book Owned
                        const bookOwned = this.props.booksOwned.filter(item => (item.userId === this.props.activeUser.id && item.bookId === book[0].id)).length > 0;
                        //get if book read
                        const bookRead = this.props.booksRead.filter(item => (item.userId === this.props.activeUser.id && item.bookId === book[0].id)).length > 0;
                        //get if book want to own
                        const bookWantToOwn = this.props.booksWantToOwn.filter(item => (item.userId === this.props.activeUser.id && item.bookId === book[0].id)).length > 0;
                        //get if book want to read
                        const bookWantToRead = this.props.booksWantToRead.filter(item => (item.userId === this.props.activeUser.id && item.bookId === book[0].id)).length > 0;
                        //get if book loaned
                        const bookLoaned = this.props.booksLoaned.filter(item => (item.userId === this.props.activeUser.id && item.bookId === book[0].id)).length > 0;
                        return <BookCard key={book[0].id} activeUser={this.props.activeUser} bookId={book[0].id} 
                                bookName={book[0].bookName} bookAuther={book[0].auther} bookPicture={book[0].bookCover}
                                bookOwned={bookOwned} bookRead={bookRead} bookWantToRead={bookWantToRead} bookWantToOwn={bookWantToOwn}
                                bookLoaned={bookLoaned}
                                addBookOwned={this.props.addBookOwned} removeBookOwned={this.props.removeBookOwned}
                                addBookRead={this.props.addBookRead} removeBookRead={this.props.removeBookRead}
                                addBookWantToRead={this.props.addBookWantToRead} removeBookWantToRead={this.props.removeBookWantToRead}
                                addBookWantToOwn={this.props.addBookWantToOwn} removeBookWantToOwn={this.props.removeBookWantToOwn}
                                removeBookLoaned={this.props.removeBookLoaned} updateBookLoaned={this.props.updateBookLoaned}/>
                    }
                    return "";
            });

        return(
            <Row>
                <Col xl={2} lg={3}  md={4} sm={6}>
                    <ListGroup className="list-grout-design">
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
                <Col xl={10} lg={9} md={8} sm={6}>
                    <Row className="justify-content-even">
                        {bookCards}
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default BooksPage;