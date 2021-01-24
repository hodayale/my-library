import { Card, Form } from "react-bootstrap";
import React from 'react';
import { Redirect } from "react-router-dom";
import { useEffect } from 'react';

class BookCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            bookOwned: false,
            bookRead: false,
            bookWantToRead: false,
            bookWantToOwn: false,
            bookLoaned: false
        }
    }
 
    
    // //const [BookPicture, setBookPicture] = React.useState(undefined);
    // const [redirect, setRedirect] = React.useState(false);
    // const [bookOwned, setbookOwned] = React.useState(false);
    // const [bookRead, setbookRead] = React.useState(false);
    // const [bookWantToRead, setbookWantToRead] = React.useState(false);
    // const [bookWantToOwn, setbookWantToOwn] = React.useState(false);
    // const [bookLoaned, setbookLoaned] = React.useState('');

    componentDidMount() {
        if(this.props.activeUser) {
            const booksOwned = this.props.activeUser.booksOwned.split(',');
            const booksRead = this.props.activeUser.booksRead.split(',');
            const booksWantToRead = this.props.activeUser.booksWantToRead.split(',');
            const booksWantToOwn = this.props.activeUser.booksWantToOwn.split(',');
    
            if(booksOwned.includes(this.props.bookId.toString())) {
                this.setState({bookOwned: true});
            }
    
            if(booksRead.includes(this.props.bookId.toString())) {
                this.setState({bookRead: true});
            }
    
            if(booksWantToRead.includes(this.props.bookId.toString())) {
                this.setState({bookWantToRead: true});
            }
    
            if(booksWantToOwn.includes(this.props.bookId.toString())) {
                this.setState({bookWantToOwn: true});
            }        
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
                {(this.props.active != 'owned') ? <Form.Check type='checkbox' id='books-owned' checked={this.state.bookOwned} onChange={() => this.setState({bookOwned: !this.state.bookOwned, 
                                                                                                                                                         bookWantToOwn: (this.state.bookOwned) ? false : this.setState.bookWantToOwn})} 
                                value={this.state.bookOwned} label='ברשותי'/> : ""}
                {(this.props.active != 'read') ? <Form.Check type='checkbox' id='books-read' checked={this.state.bookRead} onChange={() => this.setState({bookRead: !this.state.bookRead, 
                                                                                                                                                         bookWantToRead: (this.state.bookRead) ? false : this.setState.bookWantToRead })} 
                                value={this.state.bookRead} label='קראתי'/> : ""}
                {(this.props.active != 'wantToRead') ? <Form.Check type='checkbox' id='books-want-to-read' checked={this.state.bookWantToRead} 
                                onChange={() => this.setState({bookWantToRead: !this.state.bookWantToRead})} 
                                value={this.state.bookWantToRead} disabled={this.state.bookRead} label='ברצוני לקרוא'/> : ""}
                {(this.props.active != 'wantToOwn') ? <Form.Check type='checkbox' id='books-want-to-own' checked={this.state.bookWantToOwn} 
                                onChange={() => this.setState({bookWantToOwn: !this.state.bookWantToOwn})} 
                                value={this.state.bookWantToOwn} disabled={this.state.bookOwned} label='ברצוני לרכוש'/> : ""}
                {/* <Form.Check type='checkbox' id='books-loaned' checked={bookLoaned} label='ספרים שהשאלתי'/> */}
            </Form>;

    

        return(
            // <Card style={{ width: '18rem', display: bookName.toLowerCase().includes(filter.toLowerCase()) ? "" : "none"}} onDoubleClick={navigateToBook}> 
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