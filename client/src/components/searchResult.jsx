import { useSelector } from "react-redux"
import { Container, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const SearchResult = () => {
    const searchResults = useSelector((state) => state.search.results)

    return (
        <Container>
        {searchResults.map((blog) => (
          <Card key={blog.id} className="blog-list row my-3">
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>
                {/* TODO: summary */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quia vel incidunt doloremque, dolores odit laborum perferendis, vitae adipisci culpa ducimus nam, error ratione. Facere eveniet eius dolorum quasi pariatur.
              </Card.Text>
              <Button variant="primary" as={Link} to={`/blogs/${blog.id}`}>More</Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    )
}

export default SearchResult