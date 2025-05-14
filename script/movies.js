document.addEventListener("DOMContentLoaded", function () {
    const jsonFile = "../../movies.json"; // Path to your JSON file

    // Get the slug from the URL (e.g., ?slug=nguoi-nhen-du-hanh-vu-tru-nhen)
    const urlParams = new URLSearchParams(window.location.search);
    const movieSlug = urlParams.get("slug") || "wakanda-forever"; // Default slug

    fetch(jsonFile)
        .then((response) => response.json())
        .then((movies) => {
            // Find the movie by its slug
            const movie = movies.find((m) => m.slug === movieSlug);

            if (!movie) {
                throw new Error("Movie not found");
            }

            // Populate the movie details
            document.getElementById("title").textContent = movie.title;
            document.getElementById("description").textContent = movie.description;
            document.getElementById("release_date").textContent = movie.release_date;
            document.getElementById("nation").textContent = movie.nation;
            document.getElementById("director").textContent = movie.director;
            document.getElementById("duration").textContent = movie.duration;
            document.getElementById("cast").textContent = movie.cast;
            document.getElementById("tags").innerHTML = movie.genres
                .map((genre) => `<span class="tag">${genre}</span>`)
                .join(" ");
            document.getElementById("video").src = movie.video_url;

            // Set the movie poster
            document.getElementById("poster").src = movie.poster_url;

            // Optionally set the background image
            document.body.style.backgroundImage = `url(${movie.background_url})`;
        })
        .catch((error) => {
            console.error("Error loading movie data:", error);
            document.getElementById("movie-container").innerHTML = "<p>Movie not found.</p>";
        });
});