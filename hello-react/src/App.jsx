import { useState, useRef, useContext } from "react";
import Item from "./Item";

import {
	AppBar,
	Badge,
	Container,
	Divider,
	IconButton,
	List,
	OutlinedInput,
	Toolbar,
	Typography,
} from "@mui/material";

import { 
    Add as AddIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { AppContext } from "./AppProvider";

export default function App() {
	const inputRef = useRef();

    const { mode, setMode } = useContext(AppContext);

	const [data, setData] = useState([
		{ id: 3, name: "Tomato", done: false },
		{ id: 2, name: "Banana", done: true },
		{ id: 1, name: "Apple", done: false },
	]);

	const add = () => {
		const name = inputRef.current.value;
		if (name === "") return false;

		const id = data[0].id + 1;

		setData([{ id, name, done: false }, ...data]);
	};

	const remove = id => {
		setData(data.filter(item => item.id !== id));
	};

    const toggle = id => {
        setData(data.map(item => {
            if(item.id === id) item.done = !item.done;
            return item;
        }));
    }

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography sx={{ flexGrow: 1 }}>
						<Badge
							badgeContent={
								data.filter(item => !item.done).length
							}
							color="error">
							Todo
						</Badge>
					</Typography>

					{mode == "dark" ? (
						<IconButton
							onClick={() => setMode("light")}
							color="inherit">
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton
							onClick={() => setMode("dark")}
							color="inherit">
							<DarkModeIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>

			<Container
				maxWidth="sm"
				sx={{ mt: 4 }}>
				<form
					onSubmit={e => {
						e.preventDefault();
						add();
						e.currentTarget.reset();
					}}>
					<OutlinedInput
						fullWidth
						inputRef={inputRef}
						endAdornment={
							<IconButton type="submit">
								<AddIcon />
							</IconButton>
						}
					/>
				</form>

				<List>
					{data
						.filter(item => !item.done)
						.map(item => (
							<Item
								key={item.id}
								item={item}
								remove={remove}
								toggle={toggle}
							/>
						))}
				</List>

				<Divider />

				<List>
					{data
						.filter(item => item.done)
						.map(item => (
							<Item
								key={item.id}
								item={item}
								remove={remove}
								toggle={toggle}
							/>
						))}
				</List>
			</Container>
		</div>
	);
}
