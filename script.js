 let radius = 240;
let autoRotate = true;
let rotateSpeed = -80; // seconds per full rotation
let imgWidth = 120;
let imgHeight = 170;

let tX = 0;
let tY = 10;
let desX = 0;
let desY = 0;
let drag = false;
let oldX, oldY;

let spinTimer = null;

window.onload = function () {
    const container = document.getElementById("drag-container");
    const spinContainer = document.getElementById("spin-container");
    const images = spinContainer.getElementsByTagName("img");

    // Set image size
    spinContainer.style.width = imgWidth + "px";
    spinContainer.style.height = imgHeight + "px";

    // Position images in a circle
    Array.from(images).forEach((img, i) => {
        img.style.transform = `rotateY(${i * (360 / images.length)}deg) translateZ(${radius}px)`;
        img.style.transition = "transform 1s";
        img.style.transitionDelay = (images.length - i) / 3 + 's';

        // Click to open image
        img.onclick = () => {
            window.open(img.src, "_blank");
        };
    });

    // Set auto spin animation
    if (autoRotate) {
        spinContainer.style.animation = `spin ${Math.abs(rotateSpeed)}s linear infinite`;
    }

    // Drag events
    document.onpointerdown = function (e) {
        clearAnimation();
        drag = true;
        oldX = e.clientX;
        oldY = e.clientY;
    };

    document.onpointermove = function (e) {
        if (!drag) return;
        desX = e.clientX - oldX;
        desY = e.clientY - oldY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform();
        oldX = e.clientX;
        oldY = e.clientY;
    };

    document.onpointerup = function () {
        drag = false;
        if (autoRotate) {
            spinContainer.style.animation = `spin ${Math.abs(rotateSpeed)}s linear infinite`;
        }
    };

    function applyTransform() {
        spinContainer.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
    }

    function clearAnimation() {
        spinContainer.style.animation = 'none';
    }
};
