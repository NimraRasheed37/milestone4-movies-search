import Image from "next/image";

async function getMovies(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  
  const res = await fetch(url, { cache: "no-store" }); // Avoid caching for fresh results
  const data = await res.json();
  
  return data.results || [];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export default async function Home({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q || "Avengers"; // Default search query
  const movies: Movie[] = await getMovies(query);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-teal-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Movie Search</h1>
      
      <form className="text-center mb-6">
        <input
          type="text"
          name="q"
          defaultValue={query}
          className="p-2 border rounded-md"
          placeholder="Search for a movie..."
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="p-4 bg-white rounded-lg shadow-md">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-64 object-cover rounded-md"
              />
            )}
            <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
            <p className="text-gray-600">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
