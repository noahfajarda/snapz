import { render, screen } from "@testing-library/react";
import FileInput from "../components/CreatePost/FileInput";

// test.only & test.skip to filter tests
// can use 'it' instead of 'test'

// pass in test prop
const testData = {
  title: "",
  body: "",
  asset: "",
  type: "Image",
  assetUrl: "",
};

describe("Greet", () => {
  it("File Input renders correctly", () => {
    render(<FileInput state={testData} />);

    const textElement = screen.getByText(/Upload Image/i);
    expect(textElement).toBeInTheDocument();
  });

  // grouping tests
  describe("Nested Greet", () => {
    it("File Input renders correctly", () => {
      render(<FileInput state={testData} />);

      const textElement = screen.getByText(/Upload Image/i);
      expect(textElement).toBeInTheDocument();
    });
  });
});

// grouping tests
describe("Nested Greet", () => {
  it("File Input renders correctly", () => {
    render(<FileInput state={testData} />);

    const textElement = screen.getByText(/Upload Image/i);
    expect(textElement).toBeInTheDocument();
  });
});
