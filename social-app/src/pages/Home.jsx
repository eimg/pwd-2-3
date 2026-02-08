import { Box } from "@mui/material";
import Post from "../components/Post";

export default function Home() {
    return <Box sx={{ mt: 4 }}>
        <Post />
        <Post />
        <Post />
    </Box>
}
