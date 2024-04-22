import { render, screen } from "@testing-library/react";
import BlogForm from "./blogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("input title...");
  const urlInput = screen.getByPlaceholderText("input ...");

  const sendButton = screen.getByText("create");

  await user.type(titleInput, "this is a title");
  await user.type(urlInput, "http://www.google.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);

  expect(createBlog.mock.calls[0][0].title).toBe("this is a title");
  expect(createBlog.mock.calls[0][0].content).toBe("http://www.google.com");
});
