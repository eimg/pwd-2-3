import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";

import { useForm } from "react-hook-form";

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = data => console.log(data);

	return (
		<Box sx={{ mt: 4 }}>
			<Typography variant="h3">Register</Typography>

			<Alert
				severity="warning"
				sx={{ my: 3 }}>
				Something went wrong
			</Alert>

			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					placeholder="name"
					fullWidth
					sx={{ mt: 2 }}
					{...register("name", { required: true })}
				/>
				{errors.name && (
					<Typography sx={{ color: "red" }}>
						name is required
					</Typography>
				)}

				<OutlinedInput
					placeholder="username"
					fullWidth
					sx={{ mt: 2 }}
					{...register("username", { required: true })}
				/>
				{errors.username && (
					<Typography sx={{ color: "red" }}>
						name is required
					</Typography>
				)}

				<OutlinedInput
					placeholder="bio"
					fullWidth
					sx={{ mt: 2 }}
					{...register("bio")}
				/>
				<OutlinedInput
					type="password"
					placeholder="password"
					fullWidth
					sx={{ mt: 2 }}
					{...register("password", { required: true })}
				/>
				{errors.password && (
					<Typography sx={{ color: "red" }}>
						name is required
					</Typography>
				)}

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 2 }}>
					Register
				</Button>
			</form>
		</Box>
	);
}
