import "./styles.css";
import images from "./images.js";
import chevronLeft from "./icons/chevron-left.svg";
import chevronRight from "./icons/chevron-right.svg";

const content = document.querySelector("#content");
const carouselContainer = document.createElement("div");
const carouselTitle = document.createElement("h1");
const imageButtons = document.createElement("div");
const carouselNavigation = document.createElement("div");
const imageCaption = document.createElement("p");
const carouselBack = document.createElement("button");
const backIcon = document.createElement("img");
const forwardIcon = document.createElement("img");
const carouselForward = document.createElement("button");
const carouselContent = document.createElement("div");
const carouselImage = document.createElement("div");
const pictureFrame = document.createElement("div");
const imageContainer = document.createElement("div");
const maxSize = 640;
const imageValues = [];
let maxHeight = 0;
let currentImage = 0;
let lastTimeout;

carouselContainer.classList.add("container");
carouselTitle.classList.add("carousel-title");
carouselNavigation.classList.add("carousel-navigation");
imageButtons.classList.add("image-buttons");
carouselImage.classList.add("displayed-image");
imageContainer.classList.add("image-container");
imageCaption.classList.add("image-caption");
carouselForward.classList.add("direction-button");
carouselBack.classList.add("direction-button");
carouselContent.classList.add("carousel-content");
pictureFrame.classList.add("picture-frame");

backIcon.src = chevronLeft;
backIcon.alt = "Previous Image";

forwardIcon.src = chevronRight;
forwardIcon.alt = "Next Image";

carouselTitle.textContent = "Image Carousel";

imageContainer.style.left = 0;
let index = 0;

for (const image of images) {
  const img = document.createElement("img");
  const navButton = document.createElement("button");
  const currentIndex = index;
  navButton.classList.add("nav-button");
  img.src = image.imageSrc;
  img.alt = image.altText;
  // img.style.maxWidth = `${maxSize}px`;
  // img.style.maxHeight = `${maxSize}px`;
  img.style.height = `${maxSize}px`;
  img.classList.add(`image${index}`);
  navButton.addEventListener("click", () => goToImage(currentIndex));

  index++;
  img.onload = onImageLoadOrError;
  img.onerror = onImageLoadOrError;
  imageContainer.appendChild(img);
  imageButtons.appendChild(navButton);
}

function setImageLoadedValues() {
  let left = 0;

  for (const imageValue of imageValues) {
    imageValue.left = `${left}px`;
    left -= imageValue.width;

    if (imageValue.height > maxHeight) {
      maxHeight = imageValue.height;
    }
  }

  setImageStyles();
}

function goToNextImage() {
  if (imageValues.length === 0) {
    return;
  }
  toggleCurrentNavButton();

  if (currentImage === imageValues.length - 1) {
    currentImage = 0;
  } else {
    currentImage = currentImage + 1;
  }
  setImageStyles();
}

carouselForward.addEventListener("click", () => goToNextImage());

function goToPreviousImage() {
  if (imageValues.length === 0) {
    return;
  }
  toggleCurrentNavButton();

  if (currentImage === 0) {
    currentImage = imageValues.length - 1;
  } else {
    currentImage = currentImage - 1;
  }
  setImageStyles();
}

function goToImage(index) {
  if (index >= imageValues.length || index === currentImage) {
    return;
  }
  toggleCurrentNavButton();
  currentImage = index;
  setImageStyles();
}

function setImageStyles() {
  toggleCurrentNavButton();
  imageContainer.style.left = imageValues[currentImage].left;
  imageContainer.style.top = `calc(-1 * ${maxHeight - imageValues[currentImage].height}px)`;
  carouselImage.style.width = `${imageValues[currentImage].width}px`;
  carouselImage.style.height = `${imageValues[currentImage].height}px`;
  imageCaption.innerHTML = images[currentImage].attributionHTML;
  clearTimeout(lastTimeout);
  lastTimeout = setTimeout(goToNextImage, 5000);
}

function onImageLoadOrError() {
  const width = this.width;
  const height = this.height;
  const index = Number(this.className.substring(5));
  imageValues.push({ width, height, index });
  if (imageValues.length === images.length) {
    imageValues.sort((a, b) => a.index - b.index);
    setImageLoadedValues();
  }
}

function toggleCurrentNavButton() {
  const currentNavButton = imageButtons.querySelector(
    `.nav-button:nth-of-type(${currentImage + 1})`,
  );
  currentNavButton.classList.toggle("current");
}

carouselBack.addEventListener("click", () => goToPreviousImage());

carouselBack.appendChild(backIcon);
carouselForward.appendChild(forwardIcon);
carouselImage.appendChild(imageContainer);
carouselImage.appendChild(pictureFrame);
carouselContent.appendChild(carouselImage);
carouselContent.appendChild(imageCaption);
carouselNavigation.appendChild(carouselBack);
carouselNavigation.appendChild(imageButtons);
carouselNavigation.appendChild(carouselForward);
carouselContainer.appendChild(carouselTitle);
carouselContainer.appendChild(carouselContent);
carouselContainer.appendChild(carouselNavigation);
content.appendChild(carouselContainer);
