import { Card, Form } from "react-bootstrap";
import React from 'react';
import { Redirect } from "react-router-dom";
//import { useEffect } from 'react';

class BookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            bookOwned: this.props.bookOwned,
            bookRead: this.props.bookRead,
            bookWantToRead: this.props.bookWantToRead,
            bookWantToOwn: this.props.bookWantToOwn,
            bookLoaned: this.props.bookLoaned
        }
    }

    navigateToBook = () => {
        this.setState({redirect: true});
    };

    render() {
        if(this.state.redirect) {
            return (<Redirect push to={`/books/${this.props.bookId}`}/>)
        }
    
        const checkboxs =  <Form>
                <Form.Check type='checkbox' id='books-owned' checked={this.state.bookOwned} 
                                onChange={() => this.setState({bookOwned: !this.state.bookOwned, 
                                                               bookWantToOwn: (this.state.bookOwned) ? false : this.setState.bookWantToOwn})} 
                                value={this.state.bookOwned} label='ברשותי'/>
                <Form.Check type='checkbox' id='books-read' checked={this.state.bookRead} 
                                onChange={() => this.setState({bookRead: !this.state.bookRead, 
                                                              bookWantToRead: (this.state.bookRead) ? false : this.setState.bookWantToRead })} 
                                value={this.state.bookRead} label='קראתי'/>
                <Form.Check type='checkbox' id='books-want-to-read' checked={this.state.bookWantToRead} 
                                onChange={() => this.setState({bookWantToRead: !this.state.bookWantToRead})} 
                                value={this.state.bookWantToRead} disabled={this.state.bookRead} label='ברצוני לקרוא'/>
                <Form.Check type='checkbox' id='books-want-to-own' checked={this.state.bookWantToOwn} 
                                onChange={() => this.setState({bookWantToOwn: !this.state.bookWantToOwn})} 
                                value={this.state.bookWantToOwn} disabled={this.state.bookOwned} label='ברצוני לרכוש'/>
                {/* <Form.Check type='checkbox' id='books-loaned' checked={bookLoaned} label='ספרים שהשאלתי'/> */}
            </Form>;
        
        //let displayCard = this.props.bookName.includes(this.props.filter) ? "" : "none";
        //let displayCard = "";
        //if(displayCard !== "none"){
            // if(this.props.active === 'owned' && this.state.bookOwned) {
            //     displayCard= "";
            // } else if(this.props.active === 'read' && this.state.bookRead){
            //     displayCard= "";
            // } else if(this.props.active === 'wantToRead' && this.state.bookWantToRead){
            //     displayCard= "";
            // } else if(this.props.active === 'wantToOwn' && this.state.bookWantToOwn){
            //     displayCard= "";
            // } else if(this.props.active === 'loaned' && this.state.bookLoaned){
            //     displayCard= "";
            // } else {
            //     displayCard= "none";
            // }
        //}
        

        return(
            <Card className="card-design bg-light" style={{ width: '18rem', marginBottom: '20px', display: this.props.bookName.includes(this.props.filter) ? "" : "none"}} onDoubleClick={this.navigateToBook}>  
                <Card.Body>
                    <Card.Img variant="top" src={this.props.bookPicture} />
                    <Card.Title className="text-center">{this.props.bookName}</Card.Title>
                    <Card.Text className="text-center">{this.props.bookAuther}</Card.Text>
                    {this.props.activeUser ? checkboxs : ''}
                </Card.Body>
            </Card>
        );
    }
}

export default BookCard;