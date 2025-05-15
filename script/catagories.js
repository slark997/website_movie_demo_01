document.addEventListener('DOMContentLoaded', function () {
    const categories = [
        { name: "Hành Động", slug: "action" },
        { name: "Phiêu Lưu", slug: "Aventure" },
        { name: "Hài Kịch", slug: "comedy" },
        { name: "Học Đường", slug: "school" },
        { name: "Bí Ẩn", slug: "mistery" },
        { name: "Tài Liệu", slug: "documentary" },
        { name: "Võ Thuật", slug: "martialart" },
        { name: "Kinh Dị", slug: "horror" },
        { name: "Khoa Học", slug: "sciene" },
        { name: "Giật Gân", slug: "thriller" },
        { name: "Âm Nhạc", slug: "musical" },
        { name: "Anime", slug: "Anime" },
        { name: "Viễn Tưởng", slug: "fantasy" },
        { name: "Hoạt Hình", slug: "cartoon" },
        { name: "Lãng Mạn", slug: "romance" }
    ];

    // Find the submenu content container
    const subMenuContent = document.querySelector('.sub_menu_content');

    if (subMenuContent) {
        // Dynamically create and append category links
        categories.forEach(category => {
            const categoryLink = document.createElement('a');
            categoryLink.href = `../Catagories/${category.slug}.html`;
            categoryLink.textContent = category.name;
            subMenuContent.appendChild(categoryLink);
        });
    } else {
        console.error("Submenu content container not found!");
    }
});