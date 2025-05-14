
    // Dữ liệu demo lấy từ JSON bạn cung cấp
    const data = {
      movie: {
        name: "Chiến Binh Báo Đen: Wakanda Bất Diệt",
        description: "Nữ hoàng Ramonda, Shuri, M’Baku, Okoye và Dora Milaje chiến đấu để bảo vệ quốc gia...",
        poster_url: "https://phim.nguonc.com/public/images/Film/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
        episodes: [
          {
            items: [
              {
                embed: "https://embed.streamc.xyz/embed.php?hash=be0b1c4d15c33c511f043072a4ac9e4c"
              }
            ]
          }
        ]
      }
    };

    // Hiển thị dữ liệu ra trang
    const movie = data.movie;
    document.getElementById("movie-title").innerText = movie.name;
    document.getElementById("movie-description").innerText = movie.description;
    document.getElementById("movie-poster").src = movie.poster_url;
    document.getElementById("movie-embed").src = movie.episodes[0].items[0].embed;