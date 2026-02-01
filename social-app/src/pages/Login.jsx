import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";

import { useForm } from "react-hook-form";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = data => console.log(data);

	return (
		<Box sx={{ mt: 4 }}>
			<Typography variant="h3">Login</Typography>

			<Alert
				severity="warning"
				sx={{ my: 3 }}>
				Incorrect username or password
			</Alert>

			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					placeholder="username"
					fullWidth
					sx={{ mt: 2 }}
					{...register("username", { required: true })}
				/>
				{errors.username && (
					<Typography sx={{ color: "red" }}>
						username is required
					</Typography>
				)}

				<OutlinedInput
					type="password"
					placeholder="password"
					fullWidth
					sx={{ mt: 2 }}
					{...register("password", { required: true })}
				/>
				{errors.password && (
					<Typography sx={{ color: "red" }}>
						password is required
					</Typography>
				)}

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 2 }}>
					Login
				</Button>
			</form>
		</Box>
	);
}
