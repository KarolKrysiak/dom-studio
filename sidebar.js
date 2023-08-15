let isSidebarOpen = false;

function toggleSidebar() {
    const nav = document.getElementById("overlay");
    const html = document.querySelector("html");
    const button = document.querySelector(".hamburger-button");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const viewportWidth = window.innerWidth; // Pobierz szerokość widoku

    isSidebarOpen = !isSidebarOpen;
    
        if (isSidebarOpen) {
            nav.style.display = "block";
            button.classList.add("hamburger--active");
            html.style.overflowY = "hidden";
            themeColorMeta.setAttribute('content', '#667594');

            // Zablokuj przewijanie na urządzeniach dotykowych
        document.addEventListener('touchmove', preventScroll, { passive: false });
        } 
        else {
            nav.style.display = "none";
            button.classList.remove("hamburger--active");
            html.style.overflowY = "auto";
            themeColorMeta.setAttribute('content', '#f3f2ee');

            // Odblokuj przewijanie na urządzeniach dotykowych
        document.removeEventListener('touchmove', preventScroll);
        }

    window.addEventListener("resize", function() {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth > 1000) {
            nav.style.display = "block";
        } 
        else {
            nav.style.display = "none";
            html.style.overflowY = "auto";
        }
    }); 
}

function preventScroll(event) {
    event.preventDefault();
}