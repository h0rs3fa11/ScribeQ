import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Blog from "./blog";

describe("test blog render", () => {
  test("like button", () => {
    const blog = {
      title: "thisistitle",
      content: "thisiscontent",
      author: {
        username: "user1",
        name: "user1",
      },
      likes: 0,
    };

    const user = {
      username: "init1",
    };

    const { container } = render(<Blog blog={blog} user={user} />);
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("thisistitle");
    expect(div).toHaveTextContent("thisiscontent");

    // should not have remove button(only one button exists)
    const button = screen.getByRole("button");
    // expect(div).not.toHaveClass('remove-button')
    expect(button).toHaveClass("like-button");
  });

  test("remove button", () => {
    const blog = {
      title: "thisistitle",
      content: "thisiscontent",
      author: {
        username: "init1",
        name: "init1",
      },
      likes: 0,
    };

    const user = {
      username: "init1",
    };

    render(<Blog blog={blog} user={user} />);
    // should not have remove button(only one button exists)
    const button = screen.getAllByRole("button");
    expect(button[1]).toHaveClass("remove-button");
    expect(button[0]).toHaveClass("like-button");
  });

  test("click like", async () => {
    const blog = {
      title: "thisistitle",
      content: "thisiscontent",
      author: {
        username: "init1",
        name: "init1",
      },
      likes: 0,
    };

    const userContent = {
      username: "init1",
    };

    const mockHandler = vi.fn();

    const container = render(
      <Blog blog={blog} user={userContent} addLike={mockHandler} />,
    ).container;
    const user = userEvent.setup();

    const likeButton = container.querySelector(".like-button");
    console.log(likeButton);
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
