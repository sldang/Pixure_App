// import { render, screen, fireEvent } from "@testing-library/react";
// import { describe, it, expect, vi } from "vitest";
// import axios from "axios"; // Import axios
// import App from "../client/src/App.jsx";
// require("dotenv").config();

// // Mock axios
// vi.mock("axios");

// describe("App Component", () => {
//   it("should render without crashing", () => {
//     render(<App />);
//     expect(screen.getByText(/Post/i)).toBeInTheDocument();
//   });

//   it("should render all buttons with correct names", () => {
//     render(<App />);
//     const buttonNames = [
//       "Post",
//       "Community",
//       "Community Post",
//       "Community Post Comment",
//       "Community Report",
//       "Flags Profile",
//       "Local Community Account",
//       "Post Comment",
//       "Post Report",
//       "Search Tags and Flags",
//       "Tags Profile",
//       "User",
//     ];
//     buttonNames.forEach((name) => {
//       expect(screen.getByText(name)).toBeInTheDocument();
//     });
//   });

//   it("should update output state when API call is successful", async () => {
//     const mockData = [{ id: 1, name: "Test Data" }];
//     axios.get.mockResolvedValueOnce({ data: mockData });

//     render(<App />);
//     fireEvent.click(screen.getByText(/Post/i));

//     const tableRow = await screen.findByText(/Test Data/i);
//     expect(tableRow).toBeInTheDocument();
//   });

//   it("should update error state when API call fails", async () => {
//     axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

//     render(<App />);
//     fireEvent.click(screen.getByText(/Post/i));

//     const errorMessage = await screen.findByText(/Failed to fetch data/i);
//     expect(errorMessage).toBeInTheDocument();
//   });
// });


import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios"; // Import axios
import App from "../client/src/App.jsx";
require("dotenv").config();

console.log("Starting tests...");

// Mock axios
vi.mock("axios");

describe("App Component", () => {
  it("should render without crashing", () => {
    console.log("Running test: should render without crashing");
    render(<App />);
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  it("should render all buttons with correct names", () => {
    console.log("Running test: should render all buttons with correct names");
    render(<App />);
    const buttonNames = [
      "Post",
      "Community",
      "Community Post",
      "Community Post Comment",
      "Community Report",
      "Flags Profile",
      "Local Community Account",
      "Post Comment",
      "Post Report",
      "Search Tags and Flags",
      "Tags Profile",
      "User",
    ];
    buttonNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("should update output state when API call is successful", async () => {
    console.log("Running test: should update output state when API call is successful");
    const mockData = [{ id: 1, name: "Test Data" }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<App />);
    fireEvent.click(screen.getByText(/Post/i));

    const tableRow = await screen.findByText(/Test Data/i);
    expect(tableRow).toBeInTheDocument();
  });

  it("should update error state when API call fails", async () => {
    console.log("Running test: should update error state when API call fails");
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

    render(<App />);
    fireEvent.click(screen.getByText(/Post/i));

    const errorMessage = await screen.findByText(/Failed to fetch data/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

console.log("Tests completed.");
