document.addEventListener("DOMContentLoaded", () => {
    const moviesPerPage = 20; // Số lượng movie-box trên mỗi trang
    const movieContent = document.querySelector(".movies-content"); // Lấy phần tử .movies-content
    const movieBoxes = movieContent.querySelectorAll(".movie-box"); // Chỉ lấy các movie-box trong .movies-content
    const totalMovies = movieBoxes.length; // Tổng số movie-box
    const totalPages = Math.ceil(totalMovies / moviesPerPage); // Tổng số trang
    let currentPage = 1; // Trang hiện tại

    // Ẩn tất cả các movie-box
    function hideAllMovies() {
        movieBoxes.forEach(movie => {
            movie.style.display = "none";
        });
    }

    // Hiển thị các movie-box của trang hiện tại
    function showMoviesForPage(page) {
        hideAllMovies();
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;

        for (let i = startIndex; i < endIndex && i < totalMovies; i++) {
            movieBoxes[i].style.display = "block";
        }

        // Cập nhật thông tin trang
        updatePageInfo();
    }

    // Cập nhật thông tin trang hiện tại / tổng số trang
    function updatePageInfo() {
        const pageInfo = document.querySelector(".page-info");
        pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
    }

    // Tạo các nút phân trang
    function createPagination() {
        const prevButton = document.querySelector(".prev-btn");
        const nextButton = document.querySelector(".next-btn");

        // Nút Previous
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                showMoviesForPage(currentPage, true); // Cuộn khi nhấn nút
                updatePaginationButtons();
            }
        });
        
        // Nút Next
        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                showMoviesForPage(currentPage, true); // Cuộn khi nhấn nút
                updatePaginationButtons();
            }
        });

        // Cập nhật trạng thái nút
        function updatePaginationButtons() {
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        }

        updatePaginationButtons();
    }

    // Khởi tạo phân trang
    showMoviesForPage(currentPage);
    createPagination();
    function showMoviesForPage(page, isNavigation = false) {
        hideAllMovies();
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
    
        for (let i = startIndex; i < endIndex && i < totalMovies; i++) {
            movieBoxes[i].style.display = "block";
        }
    
        // Chỉ cuộn lên đầu khi nhấn nút Next hoặc Previous
        if (isNavigation) {
            const offset = -100; // Điều chỉnh giá trị này để cuộn lên trên thêm (âm để cuộn lên)
            const topPosition = movieContent.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({ top: topPosition, behavior: "smooth" });
        }
    
        // Cập nhật thông tin trang
        updatePageInfo();
    }
});