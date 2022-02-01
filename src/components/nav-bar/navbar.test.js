import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {REACT_APP_API_GEOLOCATION_URL} from "../../config";
import Navbar from "./navbar";
import {Router} from "react-bootstrap-icons";


global.window.matchMedia = jest.fn().mockReturnValue({
    matches: true,
    addListener: () => {},
    removeListener: () => {},
});

// // MOCK RESP GEOLOCATION API
// const server = setupServer(
//     rest.get(REACT_APP_API_GEOLOCATION_URL, (req, res, ctx) => {
//         return res(ctx.json({
//             code: "UK",
//             value: "United Kingdom"
//         }))
//     }),
// )
//
// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// jest.mock('../modal/Modal');

describe("Navbar",() => {
    test('loads logo', async () => {
        render(<Navbar />);
        const linkLogo = screen.getByRole('img', {
            name: /logo/i
        });
        expect(linkLogo).toBeInTheDocument();
    });

    test('loads My Next Trip text', async () => {
        render(<Navbar />);
        const brandName = screen.getByRole('button', {
            name: /my next trip/i
        });
        expect(brandName).toBeInTheDocument();
    });


    // TODO try to resolve the problem with the next tests
    // test('loads Button login in mobile view', async () => {
    //     window.matchMedia('(max-width: 500px)');
    //     render(<Navbar />);
    //     const loginButton = screen.getByTestId('mobile');
    //     await expect(loginButton).toBeInTheDocument();
    // });

    // test('loads Modal', async () => {
    //     render(<Navbar />);
    //
    // });

    // test('loads Button login in normal view', async () => {
    //     render(<Navbar />);
    //     const loginButton = screen.queryByTestId("normal");
    //     await expect(loginButton).toBeInTheDocument();
    // });

})
