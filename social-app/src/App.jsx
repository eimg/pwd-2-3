import { Container } from "@mui/material"
import Header from "./components/Header"
import AppDrawer from "./components/AppDrawer";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

export default function App() {
    return (
		<div>
			<Header />
            <AppDrawer />

			<Container maxWidth="md">
                <RouterProvider router={router} />
            </Container>
		</div>
	);
}