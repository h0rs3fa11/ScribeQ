import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError } from "../reducers/notificationReducer";
import searchService from "../services/search";
import { setSearchTerm, setSearchResult } from "../reducers/searchReducer";

const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchTerm = useSelector((state) => state.search.term)
    const searchResult = useSelector((state) => state.search.results)

    const onSearch = async (event) => {
        event.preventDefault()
        try {
            const res = await searchService.search(searchTerm);
            // console.log(res);
            dispatch(setSearchResult(res))
            console.log(searchResult)
            navigate('/searchResults')
        } catch(err) {
            dispatch(setError("search failed"))
            console.error(err.message)
        }
    }

    const handleInputChange = (event) => {
        // setSearchTerm(event.target.value)
        dispatch(setSearchTerm(event.target.value))
        console.log("search term", searchTerm)
    }
    return (
        <Form inline="true" className="mx-3" onSubmit={ onSearch }>
            <Row>
                <Col xs="auto">
                    <Form.Control 
                    type="text" 
                    placeholder="Search" 
                    className="mr-sm-2"
                    value={searchTerm}
                    onChange={handleInputChange} />
                </Col>
                <Col xs="auto">
                    <Button type="submit">Search</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Search;
