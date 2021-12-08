import { Form, ListGroup } from "react-bootstrap";
import './LiveSearchBox.css'
import React from 'react';
import {BiSearchAlt2} from 'react-icons/bi'

const LiveSearchBox = (props) => {
    const {placeholderText, results, searchTextChanged, resultSelected} = props;
    const [searchText, setSearchText] = React.useState('');
    
    const handleClick = (index) => {
        resultSelected(index);
        setSearchText('');
    }

    const resultElements = results.map((item, index) => {
        return <ListGroup.Item className="list-group-item" onClick={() => {handleClick(index)}} key={item.id}>{item.name} \ {item.auther}</ListGroup.Item>
    });    

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        searchTextChanged(e.target.value);
    }

    return(
        <div className="c-live-search-box">
            <Form.Control className="search-book-design" type="search" placeholder={placeholderText}
                    onChange={handleInputChange}
                    value={searchText}/>
            <BiSearchAlt2 className="img-in-input search-img"/>
            <ListGroup className="search-results">
                {resultElements}
            </ListGroup>
        </div>
    );
}

export default LiveSearchBox;