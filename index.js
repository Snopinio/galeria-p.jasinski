function showOverlay() {
    let imageCollection = document.querySelectorAll("div#thumbnailContainer img");
    document.querySelector("div#imageOverlay img").src = imageCollection[0].src;
    document.querySelector("div#imageOverlay").style.display = "flex";
}
function hideOverlay() {
    document.querySelector("div#imageOverlay").style.display = "none";
}
function randomRange(min, max) {
    let range = max - min;
    let random = range * Math.random();
    random = Math.round(random) + min;
    return random;
}
function randomPicsumUrl() {
    let urlPrefix = "https://picsum.photos/";
    let randomWidth = randomRange(1800,2000);
    let randomHeight = randomRange(1000,1200);
    let finalUrl = urlPrefix + randomWidth + "/" + randomHeight;
    return finalUrl;
}
function getRandomImages() {
    let imageCollection = document.querySelectorAll("div#thumbnailContainer img");
    for(let i = 0; i < imageCollection.length; i++) {
        imageCollection[i].src = randomPicsumUrl();
        imageCollection[i].addEventListener("click", showPicture);
    }
    document.querySelector("div#bigImage > img").src = imageCollection[0].src;
}
function showPicture(event) {
    let url = event.srcElement.src;
    document.querySelector("div#bigImage > img").src = url;
}
function nextPicture() {
    let currentUrl = document.querySelector("div#bigImage > img").src;
    let imageCollection = document.querySelectorAll("div#thumbnailContainer img");
    urlArray = []; 
    for (let i = 0; i < imageCollection.length; i++) {
        urlArray.push(imageCollection[i].src);
    }
    let currentIndex = urlArray.indexOf(currentUrl);
    let nextPictureUrl = "";
    if (currentIndex == urlArray.length - 1) {
        nextPictureUrl = urlArray[0];
    } else {
        nextPictureUrl = urlArray[currentIndex + 1];
    }
    document.querySelector("div#bigImage > img").src = nextPictureUrl;
}
function previousPicture() {
    let currentUrl = document.querySelector("div#bigImage > img").src;
    let imageCollection = document.querySelectorAll("div#thumbnailContainer img");
    urlArray = [];
    for (let i = 0; i < imageCollection.length; i++) {
        urlArray.push(imageCollection[i].src);
    }
    let currentIndex = urlArray.indexOf(currentUrl);
    let previousPictureUrl = "";
    if (currentIndex === 0) {
        previousPictureUrl = urlArray[urlArray.length - 1];
    } else {
        previousPictureUrl = urlArray[currentIndex - 1];
    }
    document.querySelector("div#bigImage > img").src = previousPictureUrl;
}
let slideshowInterval;

function startSlideshow() {
    slideshowInterval = setInterval(nextPicture, 2000);
}
function stopSlideshow() {
    clearInterval(slideshowInterval);
}
window.addEventListener("load", getRandomImages);
document.querySelector("div#bigImage img").addEventListener("click", showOverlay);
document.querySelector("div#imageOverlay").addEventListener("click", hideOverlay);
document.querySelector("div#rightArrow").addEventListener("click", nextPicture)
document.querySelector("div#leftArrow").addEventListener("click", previousPicture);

window.addEventListener("load", startSlideshow);

document.querySelector("div#rightArrow").addEventListener("mouseenter", stopSlideshow);
document.querySelector("div#leftArrow").addEventListener("mouseenter", stopSlideshow);

document.querySelector("div#rightArrow").addEventListener("mouseleave", startSlideshow);
document.querySelector("div#leftArrow").addEventListener("mouseleave", startSlideshow);