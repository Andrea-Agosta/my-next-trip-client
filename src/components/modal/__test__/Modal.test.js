import {render, screen} from "@testing-library/react";
import React from "react";
import Modal from "../Modal";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {REACT_APP_API_GEOLOCATION_URL} from "../../../config";


// MOCK RESP GEOLOCATION API
const server = setupServer(
    rest.get(REACT_APP_API_GEOLOCATION_URL, (req, res, ctx) => {
        return res(ctx.json({
            country_code: "UK"
        }));
        // return res(ctx.json({
        //     code: "UK",
        //     value: "United Kingdom"
        // }))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Modal",() => {
    test('loads logo', async () => {
        render(<Modal />);

        // ToDo learn how to mock the api and render the button
        // screen.getByRole('button', {
        //     name:
        // })

    });


});