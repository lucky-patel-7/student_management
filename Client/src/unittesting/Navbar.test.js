import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

// Mocking Modules and Functions
jest.mock("react-router-dom");
test("should first", () => {
  useNavigate.mockReturnValue({
    navigate: jest.fn(),
  });
  // Truthiness Matcher Testing
  expect(useNavigate).toBeDefined();
  expect(useNavigate).toBeTruthy();
  expect(useNavigate).not.toBeNull();
  expect(useNavigate).not.toBeUndefined();
});

// Strings Matcher Testing
test("render list Item", () => {
  expect("render").not.toMatch(/I/);
});
