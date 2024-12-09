const titleInput = document.getElementById('title');
const heightSlider = document.getElementById('height-range');
const widthSlider = document.getElementById('width-range');
const blackRadio = document.getElementById('black-radio');
const whiteRadio = document.getElementById('white-radio');
const tshirtContainer = document.getElementById('tshirt-container');
const tshirtImage = tshirtContainer.querySelector('img');
const logos = document.querySelectorAll('.image-item img');
const nameSpan = document.createElement('span');

// Set default logo to druid.png
const defaultLogoSrc = './src/img/druid.png';

// Create the container for the title and the small image
const textContainer = document.createElement("div");
textContainer.style.position = "absolute"; 
textContainer.style.width = "100%";  
textContainer.style.height = "auto"; 

tshirtContainer.appendChild(textContainer);

// Create and add the dynamic text on the T-shirt
const dynamicTitle = document.createElement("span");
dynamicTitle.id = "dynamicTitle";
dynamicTitle.textContent = "Custom";
dynamicTitle.style.fontWeight = "bold";
dynamicTitle.style.color = "white";
textContainer.appendChild(dynamicTitle);

// Create the small image 
const smallImage = document.createElement("img");
smallImage.style.width = "60px"; 
smallImage.style.position = "absolute";
smallImage.style.transform = "scaleX(-1)";
textContainer.appendChild(smallImage);

// Function to calculate the initial position in pixels based on the container's size
function calculateInitialPosition() {
    const containerRect = tshirtContainer.getBoundingClientRect();
    const initialTopPercent = 25; // 25% of the container's height
    const initialLeftPercent = 35; // 35% of the container's width

    const initialTop = (containerRect.height * initialTopPercent) / 100;
    const initialLeft = (containerRect.width * initialLeftPercent) / 100;

    return { initialTop, initialLeft };
}

// Wait until the window is fully loaded before setting the initial position.
window.addEventListener("load", () => {
    let { initialTop, initialLeft } = calculateInitialPosition();
    textContainer.style.top = `${initialTop}px`;
    textContainer.style.left = `${initialLeft}px`;

    // Adjust the position of the small image
    smallImage.style.top = `${dynamicTitle.offsetTop + dynamicTitle.offsetHeight * 0.3}px`; 
    smallImage.style.left = `${dynamicTitle.offsetWidth + 10}px`; 

    // Set default logo
    const logoSrc = defaultLogoSrc;
    const newLogo = document.createElement("img");
    newLogo.src = logoSrc;
    newLogo.classList.add("logo");
    newLogo.style.position = "absolute";
    newLogo.style.width = "140px";

    // Center the logo
    function centerLogo() {
        const containerRect = tshirtContainer.getBoundingClientRect();
        newLogo.style.top = `${(containerRect.height - 140) / 2}px`;
        newLogo.style.left = `${(containerRect.width - 140) / 2}px`;
    }

    centerLogo();
    window.addEventListener("resize", centerLogo);

    tshirtContainer.appendChild(newLogo);

    // Set the logo name (without the .png)
    const logoName = logoSrc.split("/").pop().replace(".png", "").replace("%20", " ").toUpperCase();

    // Create a new span with the image's name
    nameSpan.id = "nameSpan";
    nameSpan.textContent = logoName || "Logo";
    nameSpan.style.position = "absolute";
    nameSpan.style.bottom = "10%";
    nameSpan.style.fontWeight = "bold";
    nameSpan.style.textAlign = "center";
    nameSpan.style.width = "100%"; 

    tshirtContainer.appendChild(nameSpan);

    // Update the small image to the right of the title after the logo is added
    smallImage.src = logoSrc;
    smallImage.style.top = `${dynamicTitle.offsetTop + dynamicTitle.offsetHeight * 0.3}px`; 
    smallImage.style.left = `${dynamicTitle.offsetWidth + 10}px`; 
});

// Limit the number of characters in the title
titleInput.addEventListener("input", () => {
    if (titleInput.value.length > 10) {
        titleInput.value = titleInput.value.slice(0, 10);
    }
    dynamicTitle.textContent = titleInput.value || "Custom your T-shirt";
});

// Move the text using the height and width sliders
heightSlider.addEventListener("input", () => {
    const { initialTop, initialLeft } = calculateInitialPosition(); // Recalculate the position
    const heightValue = heightSlider.value;
    textContainer.style.top = `${initialTop + (heightValue * 5)}px`; 
});

widthSlider.addEventListener("input", () => {
    const { initialTop, initialLeft } = calculateInitialPosition(); // Recalculate the position
    const widthValue = widthSlider.value;
    textContainer.style.left = `${initialLeft + (widthValue * 5)}px`; 

    // Also update the position of the small image when the text is moved
    smallImage.style.left = `${dynamicTitle.offsetWidth + 10}px`; 
});

// Change the T-shirt between black and white
blackRadio.addEventListener("change", () => {
    if (blackRadio.checked) {
        tshirtImage.src = "./src/img/black-ts.png";
        dynamicTitle.style.color = "white";
        nameSpan.style.color = "white";
    }
});

whiteRadio.addEventListener("change", () => {
    if (whiteRadio.checked) {
        tshirtImage.src = "./src/img/white-ts.png";
        dynamicTitle.style.color = "black";
        nameSpan.style.color = "black";
    }
});

// Make the logos draggable and drop them onto the T-shirt
logos.forEach(logo => {
    logo.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.src);
    });
});

tshirtContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
});

tshirtContainer.addEventListener("drop", (e) => {
    e.preventDefault();
    const logoSrc = e.dataTransfer.getData("text/plain");

    // Remove any existing logo in the container before adding a new one
    const existingLogo = tshirtContainer.querySelector("img.logo");
    if (existingLogo) {
        existingLogo.remove();
    }

    // Remove any text associated with the previous logo
    const existingNameSpan = tshirtContainer.querySelector("#nameSpan"); 
    if (existingNameSpan) {
        existingNameSpan.remove();
    }

    // Create and add the new logo
    const newLogo = document.createElement("img");
    newLogo.src = logoSrc;
    newLogo.classList.add("logo"); 
    newLogo.style.position = "absolute";
    newLogo.style.width = "140px";

    // Function to center the logo
    function centerLogo() {
        const containerRect = tshirtContainer.getBoundingClientRect();
        newLogo.style.top = `${(containerRect.height - 140) / 2}px`;
        newLogo.style.left = `${(containerRect.width - 140) / 2}px`;
    }

    centerLogo();
    window.addEventListener("resize", centerLogo);

    tshirtContainer.appendChild(newLogo);

    // Get the logo's name without the .png extension
    const logoName = logoSrc.split("/").pop().replace(".png", "").replace("%20", " ").toUpperCase();

    // Create a new span with the image's name
    nameSpan.id = "nameSpan";
    nameSpan.textContent = logoName;
    nameSpan.style.position = "absolute";
    nameSpan.style.bottom = "10%";
    nameSpan.style.fontWeight = "bold";
    nameSpan.style.textAlign = "center";
    nameSpan.style.width = "100%"; 

    tshirtContainer.appendChild(nameSpan);

    // Update the small image to the right of the title after the logo is added
    smallImage.src = logoSrc;
    smallImage.style.top = `${dynamicTitle.offsetTop + dynamicTitle.offsetHeight * 0.3}px`; 
    smallImage.style.left = `${dynamicTitle.offsetWidth + 10}px`; 
});

// Reload the initial positions if the window size changes
window.addEventListener("resize", () => {
    const { initialTop, initialLeft } = calculateInitialPosition();
    textContainer.style.top = `${initialTop}px`;
    textContainer.style.left = `${initialLeft}px`;

    // Readjust the position of the small image
    smallImage.style.top = `${dynamicTitle.offsetTop + dynamicTitle.offsetHeight * 0.3}px`; 
    smallImage.style.left = `${dynamicTitle.offsetWidth + 10}px`; 
    smallImage.style.width = "60px"; 
    smallImage.style.height = "60px";  
    smallImage.style.display = "block"; 
});
