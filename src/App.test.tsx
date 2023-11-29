import React from 'react';
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import axios from "axios";
import App from './App';

jest.mock("axios");

describe("App", () => {
  test("should fetch questions and submit answers", async () => {
    const questions = [
      {
        id: "1",
        text: "Question 1",
        options: ["Option 1", "Option 2"],
      },
    ];

    const submitResponse = {
      score: 1,
    };

    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { questions } });
    const axiosPostSpy = jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: submitResponse });

    const { getByText, getByLabelText } = render(<App />);

    await waitFor(() => expect(axiosGetSpy).toHaveBeenCalled());

    expect(getByText("Question 1")).toBeInTheDocument();
    fireEvent.click(getByLabelText("Option 1"));

    act(() => {
      fireEvent.click(getByText("Submit"));
    });

    await waitFor(() => expect(axiosPostSpy).toHaveBeenCalled());

    expect(getByText("Your score: 1")).toBeInTheDocument();
  });
});