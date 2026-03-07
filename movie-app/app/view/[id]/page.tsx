import { MovieType, PersonType } from "@/types/global";
import Link from "next/link";

async function fetchCast(id: string): Promise<PersonType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		},
	);

	const data = await res.json();
	return data.cast;
}

async function fetchMove(id: string): Promise<MovieType> {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	return await res.json();
}

const backdropUrl = "http://image.tmdb.org/t/p/w1280";
const profileUrl = "http://image.tmdb.org/t/p/w185";

export default async function MovieView({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movie = await fetchMove(id);
	const cast = await fetchCast(id);

	return (
		<div>
			<h2 className="py-4 mb-4 border-b text-xl font-bold">
				{movie.title} ({movie.release_date.split("-")[0]})
			</h2>
			<div>
				<img
					src={backdropUrl + movie.backdrop_path}
					alt={movie.title}
				/>
			</div>
			<div className="mt-3 mb-6">{movie.overview}</div>
			<h2 className="py-4 mb-4 border-b text-xl font-bold">Cast</h2>
			<div className="flex flex-wrap gap-4">
				{cast.map(person => {
					return (
						<div key={person.id} className="w-46 text-center">
							{person.profile_path ? (
								<img
									src={profileUrl + person.profile_path}
									alt={person.name}
								/>
							) : (
								<div className="h-69 bg-gray-300"></div>
							)}
							<div className="my-1 font-bold">
								<Link href={`/person/${person.id}`}>
									{person.name}
								</Link>
							</div>
							<span>{person.character}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
