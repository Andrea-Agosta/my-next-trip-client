import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import SearchForm from "../Search-form";
import {isValidDateValue} from "@testing-library/user-event/dist/utils";
import userEvent from "@testing-library/user-event";

const mockProps = jest.fn();
const date = new Date();

describe("Search-form",() => {
    test('loads capture text', async () => {
        render(<SearchForm props={mockProps} />);
        const text = screen.getByRole('heading', {
            name: /let the dream begin!/i
        });
        expect(text).toBeInTheDocument();
    });

    // ToDo
    // test('loads radio button', async () => {
    //     render(<SearchForm />);
    //     const radioButton = screen.getByRole('heading', {
    //         name: /let the dream begin!/i
    //     });
    //     expect(radioButton).toBeInTheDocument();
    // });

    test('fly_from group', async () => {
        render(<SearchForm props={mockProps}/>);
        const label = screen.getByText(/From/i);
        const input = screen.getByPlaceholderText(/From/i);
        fireEvent.change(input, { target: { value: "Paris"} })
        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input.value).toBe("Paris");
    });

    test('fly_to group', async () => {
        render(<SearchForm props={mockProps}/>);
        const label = screen.getByText(/To/i);
        const input = screen.getByPlaceholderText(/To/i);
        fireEvent.change(input, { target: { value: "Rome"} })
        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input.value).toBe("Rome");
    });

    test('date_from group', async () => {
        render(<SearchForm props={mockProps}/>);
        const label = screen.getByText(/Depart/i);

        //todo find a way to target datepicker

        expect(label).toBeInTheDocument();
    });

});