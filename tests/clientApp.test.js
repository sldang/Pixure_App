import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import App from "../client/src/App.jsx";

// Mock axios
vi.mock("axios");

describe("App Component", () => {
  // Test if App renders without crashing
  it("should render without crashing", () => {
    render(<App />);
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  // Test if buttons render with correct names
  it("should render all buttons with correct names", () => {
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

  // Test if API call updates state correctly
  it("should update output state when API call is successful", async () => {
    const mockData = [{ id: 1, name: "Test Data" }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<App />);
    fireEvent.click(screen.getByText(/Post/i));

    const tableRow = await screen.findByText(/Test Data/i);
    expect(tableRow).toBeInTheDocument();
  });

  // Test error handling when API call fails
  it("should update error state when API call fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

    render(<App />);
    fireEvent.click(screen.getByText(/Post/i));

    const errorMessage = await screen.findByText(/Failed to fetch data/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
