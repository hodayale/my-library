import { Col, ListGroup, Row, Tab } from "react-bootstrap";

const BooksPage = (props) => {
    const {activeUser} = props;
    return(
       <Tab.Container defaultActiveKey="#link1">
            <Row>
                <Col sm={2}>
                    <ListGroup>
                        <ListGroup.Item action href="#link1" variant="danger">ספרים שברשותי</ListGroup.Item>
                        <ListGroup.Item action href="#link2" variant="danger">ספרים שקראתי</ListGroup.Item>
                        <ListGroup.Item action href="#link2" variant="danger">ספרים שברצוני לקרוא</ListGroup.Item>
                        <ListGroup.Item action href="#link2" variant="danger">ספרים שברצוני לרכוש</ListGroup.Item>
                        <ListGroup.Item action href="#link2" variant="danger">ספרים שהשאלתי</ListGroup.Item>
                        {/* <ListGroup.Item action onClick={alertClicked}>
                        This one is a button
                        </ListGroup.Item> */}
                    </ListGroup>
                 </Col>
                <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#link1">
                        {/* <Sonnet /> */}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2">
                        {/* <Sonnet /> */}
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default BooksPage;