import { Container, Jumbotron, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";

const HomePage = (props) => {
    const {books, filter} = props;
   const booksCards = books.map((book) => {
       if(book.id % 3 === 0){
           return(
                <BookCard block key={book.id} filter={filter} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}/>
           )
       } 
        return <BookCard key={book.id} filter={filter} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}/>
    })
    
    return(
        <Container>
            <Jumbotron className="text-center">
                <h1 className="logo-design">ברוכים הבאים לספריה הביתית שלכם</h1>
                <p>כאן תוכלו לנהל את הספרים שיש לכם בבית</p>
            </Jumbotron>

            <Row className="justify-content-even">
                {booksCards}
            </Row>
        </Container>
    );
}

export default HomePage;