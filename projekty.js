window.addEventListener('load', function () {
    const contentElement = document.querySelector('content');
    const newContainer = document.getElementById('new-container');

    function checkAndMoveContent() {
        if (window.innerWidth > 1000) {
            // Przenieś zawartość z <content> do nowego kontenera tylko jeśli szerokość okna jest większa lub równa 1000 pikseli
            while (contentElement.firstChild) {
                newContainer.appendChild(contentElement.firstChild);
            }
        } else {
            // Przywróć zawartość do oryginalnego miejsca w elemencie <content> jeśli szerokość okna jest mniejsza niż 1000 pikseli
            while (newContainer.firstChild) {
                contentElement.appendChild(newContainer.firstChild);
            }
        }
    }

    // Wywołaj funkcję przy załadowaniu strony i przy zmianie rozmiaru okna
    checkAndMoveContent();
    window.addEventListener('resize', checkAndMoveContent);
});



document.addEventListener('DOMContentLoaded', function () {
    const previewImage = document.querySelector('.preview-image');
    let currentImage = null;

    function changePreviewImage(imageUrl) {
        if (currentImage !== imageUrl) {
            currentImage = imageUrl;
            previewImage.src = imageUrl;
        }
    }

    function loadImage(link) {
        fetch(link)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const allImages = doc.querySelectorAll('img');
                if (allImages.length >= 2) {
                    const secondImage = allImages[1];
                    if (secondImage) {
                        const imageUrl = secondImage.getAttribute('src');
                        changePreviewImage(imageUrl);
                    }
                }
            });
    }

    const menuItems = document.querySelectorAll('.menu-projects li');
    menuItems.forEach(item => {
        const link = item.getAttribute('data-image-source');
        if (link) {
            const itemText = item.querySelector('a');
            itemText.addEventListener('mouseenter', () => {
                loadImage(link);
            });

            itemText.addEventListener('mouseleave', () => {
                // Nie zmieniaj obrazka po opuszczeniu myszki z tekstu
            });
        }
    });

    // Ładowanie losowego obrazka na początku
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    const randomItem = menuItems[randomIndex];
    const randomLink = randomItem.getAttribute('data-image-source');
    if (randomLink) {
        loadImage(randomLink);
    }

    // Obsługa kliknięcia w kontenerze .preview
    const previewContainer = document.querySelector('.preview');
    previewContainer.addEventListener('click', () => {
        previewContainer.classList.remove('active'); // Usuwamy klasę, aby ukryć kontener
    });
});