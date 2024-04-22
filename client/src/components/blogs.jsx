/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { generateId } from "../utils/helper";
import { Table } from "react-bootstrap";

const Blogs = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const blogId = generateId();

  return (
    <div>
      {user.loggedIn && (
        <div>
          <h1>blog</h1>
          <Link to={`/blogs/${blogId}/edit`} state={{ blogId: blogId }}>
            <p>Create New Blog</p>
          </Link>
          <h2>Blog list</h2>
          <Table striped>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                  <td>
                    {blog.author.name ? blog.author.name : blog.author.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {/* shoud redirect to the login page */}
      {!user.loggedIn && <div>Should log in first</div>}
    </div>
  );
};

export default Blogs;
