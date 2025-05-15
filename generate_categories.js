const fs = require('fs');
const path = require('path');

// Path to the movies.json file (API data)
const moviesFilePath = path.join(__dirname, 'movies.json');

// Directories to save the generated HTML files
const categoriesDir = path.join(__dirname, 'Catagories');
const moviesStorageDir = path.join(__dirname, 'Movies_storage');

// Read and parse the movies.json file
let moviesData;
try {
    moviesData = JSON.parse(fs.readFileSync(moviesFilePath, 'utf8'));
    console.log("Parsed movies.json successfully.");
} catch (error) {
    console.error("Error parsing movies.json:", error.message);
    process.exit(1);
}

// Ensure the moviesData is an array
if (!Array.isArray(moviesData)) {
    console.error("Error: movies.json must be an array of movie objects.");
    process.exit(1);
}

// Group movies by categories
const categories = {};

// Iterate over the array of movies
moviesData.forEach((entry, index) => {
    const movie = entry.movie;

    // Skip if the movie object is missing
    if (!movie || !movie.category) {
        console.warn(`Skipping entry at index ${index} due to missing movie or category: ${JSON.stringify(entry)}`);
        return;
    }

    // Process each category for the current movie
    movie.category.forEach(cat => {
        if (!categories[cat.slug]) {
            categories[cat.slug] = {
                name: cat.name,
                slug: cat.slug,
                movies: []
            };
        }

        // Add the movie to the category
        categories[cat.slug].movies.push({
            title: movie.name,
            poster: movie.poster_url,
            link: `../Movies_storage/${movie.slug}/${movie.slug}_main.html`
        });

        // Create the movie's main page
        const movieDir = path.join(moviesStorageDir, movie.slug);
        if (!fs.existsSync(movieDir)) {
            fs.mkdirSync(movieDir, { recursive: true });
        }

        const movieMainFilePath = path.join(movieDir, `${movie.slug}_main.html`);
        const movieMainContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${movie.name}</title>
    <link rel="stylesheet" href="../../css/style.css">
</head>
<body>
    <header>
        <nav>
            <div class="container">
                <div class="menu_top">
                    <div class="logo-search">
                        <a href="../../index.html"><img src="../../Pictures/Logo/Logo.png" alt="logo"></a>
                        <form action="../../search.php" method="POST">
                            <input type="text" name="search" placeholder="Search...">
                            <button type="submit" name="submit-search"><i class="fas fa-search"></i></button>
                        </form>
                    </div>
                    <div class="login">
                        <a href="../../login_and_register/login_register.html">Login <i class="fas fa-sign-in-alt"></i></a>
                    </div>
                    <button class="menu-toggle" onclick="toggleMenu()">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </nav>
    </header>
    <main>
    
        <h1>${movie.name}</h1>
        <img src="${movie.poster_url}" alt="${movie.name}">
        <p>${movie.content}</p>
        <p><strong>Time:</strong> ${movie.time}</p>
        <p><strong>Quality:</strong> ${movie.quality}</p>
        <p><strong>Language:</strong> ${movie.lang}</p>
        <p><strong>Director:</strong> ${movie.director.join(', ')}</p>
        <p><strong>Actors:</strong> ${movie.actor.join(', ')}</p>
        <h2>Watch Now</h2>
        ${movie.episodes?.map(episode => `
            <div>
                <h3>${episode.server_name}</h3>
                ${episode.server_data.map(data => `
                    <a href="${data.link_embed}" target="_blank">${data.name}</a>
                `).join('')}
            </div>
        `).join('') || '<p>No episodes available.</p>'}
    </main>
    <footer>
        <div class="footer-dark">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Web design</a></li>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Hosting</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-md-6 item text">
                        <h3>Company Name</h3>
                        <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
        `;
        fs.writeFileSync(movieMainFilePath, movieMainContent, 'utf8');
        console.log(`Generated movie main file: ${movieMainFilePath}`);
    });
});

// Create directories if they don't exist
if (!fs.existsSync(categoriesDir)) {
    fs.mkdirSync(categoriesDir, { recursive: true });
}

// Generate HTML files for each category
Object.values(categories).forEach(category => {
    const categoryFilePath = path.join(categoriesDir, `${category.slug}.html`);

    // Generate the HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${category.name}</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <nav>
            <div class="container">
                <div class="menu_top">
                    <div class="logo-search">
                        <a href="../index.html"><img src="../Pictures/Logo/Logo.png" alt="logo"></a>
                        <form action="../search.php" method="POST">
                            <input type="text" name="search" placeholder="Search...">
                            <button type="submit" name="submit-search"><i class="fas fa-search"></i></button>
                        </form>
                    </div>
                    <div class="login">
                        <a href="../login_and_register/login_register.html">Login <i class="fas fa-sign-in-alt"></i></a>
                    </div>
                    <button class="menu-toggle" onclick="toggleMenu()">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <div class="menu_middle">
                    <ul>
                        <a href="../index.html"><i class="fas fa-home"></i> Home</a>
                        <a href="../movies.html">Movies</a>
                        <a href="../tvshows.html">TV Shows</a>
                        <div class="sub_menu">
                            <a href="#" onclick="toggleSubMenu(event)">Thể Loại <i class="fas fa-chevron-down"></i></a>
                            <div class="sub_menu_content">
                                ${Object.values(categories).map(cat => `
                                    <a href="../Catagories/${cat.slug}.html">${cat.name}</a>
                                `).join('')}
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <h1>${category.name}</h1>
        <div class="movies">
            ${category.movies.map(movie => `
                <div class="movie">
                    <img src="${movie.poster}" alt="${movie.title}">
                    <h2>${movie.title}</h2>
                    <a href="${movie.link}">Watch Now</a>
                </div>
            `).join('')}
        </div>
    </main>
    <footer>
        <div class="footer-dark">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Web design</a></li>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Hosting</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-md-6 item text">
                        <h3>Company Name</h3>
                        <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
    `;
    // Write the HTML file
    fs.writeFileSync(categoryFilePath, htmlContent, 'utf8');
    console.log(`Generated category file: ${categoryFilePath}`);
});