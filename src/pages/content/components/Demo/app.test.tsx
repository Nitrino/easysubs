import { render, screen } from "@testing-library/react";
import App from "@pages/content/components/Demo/app";

describe("appTest", () => {
  test("render text", () => {
    // given
    const text = "content viewW";

    // when
    render(<App />);

    // then
    screen.getByText(text);
  });
});
