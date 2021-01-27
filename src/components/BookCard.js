import { Button, Card, Form } from "react-bootstrap";
import React from 'react';
import { Redirect } from "react-router-dom";
import Checkboxes from "./Checkboxes";
//import { useEffect } from 'react';

class BookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            // bookOwned: this.props.bookOwned,
            // bookRead: this.props.bookRead,
            // bookWantToRead: this.props.bookWantToRead,
            // bookWantToOwn: this.props.bookWantToOwn,
            // bookLoaned: this.props.bookLoaned
        }
    }

    navigateToBook = () => {
        this.setState({redirect: true});
    };

    render() {
        if(this.state.redirect) {
            return (<Redirect push to={`/books/${this.props.bookId}`}/>)
        }
    
        const checkboxs =  <Checkboxes bookOwned={this.props.bookOwned} bookRead={this.props.bookRead} bookWantToRead={this.props.bookWantToRead} 
                                        bookWantToOwn={this.props.bookWantToOwn} bookLoaned={this.props.bookLoaned} 
                                        bookLoanerName={this.props.bookLoanerName} showLoaned={false}/> ;

        return(
            <Card className="card-design bg-light" style={{ width: '13rem', marginBottom: '20px', display: this.props.bookName.includes(this.props.filter) ? "" : "none"}}>  
                <Card.Body>
                    <Card.Img className="hover-design" variant="top" src={this.props.bookPicture} onClick={this.navigateToBook}/>
                    <Card.Title className="text-center hover-design" onClick={this.navigateToBook}>{this.props.bookName}</Card.Title>
                    <Card.Text className="text-center">{this.props.bookAuther}</Card.Text>
                    {this.props.activeUser ? checkboxs : ''}
                    {/* <Button className="button-rounded-corners bg-danger" type="button" block onClick={this.navigateToBook} variant="danger">לפרטים נוספים</Button> */}
                </Card.Body>
            </Card>
        );
    }
}

export default BookCard;