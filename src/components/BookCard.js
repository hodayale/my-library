import { Card } from "react-bootstrap";
import React from 'react';
import { Redirect } from "react-router-dom";
import Checkboxes from "./Checkboxes";
import BookDetailsPage from "../pages/BookDetailsPage";
//import { useEffect } from 'react';

class BookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
        }
    }

    navigateToBook = () => {
        this.setState({redirect: true});
    };

    render() {
        if(this.state.redirect) {
            return (<Redirect push to={`/books/${this.props.bookId}`}/>)
            //return(<BookDetailsPage activeUser={this.props.activeUser} books={this.props.books} bookId={this.props.bookId}/>)
        }
    
        const checkboxs =  this.props.activeUser ? <Checkboxes bookId={this.props.bookId} userId={this.props.activeUser.id} bookOwned={this.props.bookOwned} bookRead={this.props.bookRead} bookWantToRead={this.props.bookWantToRead} 
                                        bookWantToOwn={this.props.bookWantToOwn} bookLoaned={this.props.bookLoaned} 
                                        bookLoanerName={this.props.bookLoanerName} showLoaned={false}
                                        addBookOwned={this.props.addBookOwned} removeBookOwned={this.props.removeBookOwned}
                                        addBookRead={this.props.addBookRead} removeBookRead={this.props.removeBookRead}
                                        addBookWantToRead={this.props.addBookWantToRead} removeBookWantToRead={this.props.removeBookWantToRead}
                                        addBookWantToOwn={this.props.addBookWantToOwn} removeBookWantToOwn={this.props.removeBookWantToOwn}
                                        removeBookLoaned={this.props.removeBookLoaned} updateBookLoaned={this.props.updateBookLoaned}/> : '';

        return(
            <Card className="card-design bg-light" style={{ width: '15rem', marginBottom: '20px', display: this.props.bookName.includes(this.props.filter) ? "" : "none"}}>  
                <Card.Body>
                    <Card.Img className="hover-design" variant="top" src={this.props.bookPicture} onClick={this.navigateToBook}/>
                    <Card.Title className="text-center hover-design" onClick={this.navigateToBook}>{this.props.bookName}</Card.Title>
                    <Card.Text className="text-center">{this.props.bookAuther}</Card.Text>
                    {checkboxs}
                </Card.Body>
            </Card>
        );
    }
}

export default BookCard;