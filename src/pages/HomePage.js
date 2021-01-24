import { Container, Jumbotron, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";

const HomePage = (props) => {
    const {activeUser, books, filter} = props;
    const booksCards = books.map((book) => {
        return <BookCard key={book.id} activeUser={activeUser} filter={filter} bookId={book.id} bookName={book.bookName} bookAuther={book.auther} bookPicture={book.bookCover}/>
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