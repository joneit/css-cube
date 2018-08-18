var y0 = [0, 0, -90, 90, 180, 0];
var x0 = [-90, 90, 0, 0, 0, 0];
var faces, progress, x = 45, y = 45, z = 45;
var SPEED_FACTOR;
var autoRepeat, lastDx, lastDy, lastDz;

window.onload = function() {
    autoRepeat = document.querySelector('input[type=checkbox]');
    faces = Array.prototype.slice.call(document.querySelectorAll('.face'));
    progress = document.getElementById('progress');
    run(0, 0, 0);
    setTimeout(() => {
        faces.forEach((face) => face.classList.remove('translucent'));
        run(x=0, y=0, z=0);
    }, 3000);
    setTimeout(() => {
        faces.forEach((face) => face.classList.remove('backface'));
        var style = document.getElementById('controls').style;
        style.visibility = 'visible';
        style.opacity = 1;
        SPEED_FACTOR = 120;
    }, 6000);
}

function restart() {
    run(lastDx, lastDy, lastDz);
}

function setAutoRepeat(checked) {
    var methodName = checked ? 'addEventListener' : 'removeEventListener';
    progress[methodName]('transitionend', restart);
}

function run(dx, dy, dz) {
    var transition = `all ${Math.max(Math.abs(dx), Math.abs(dy)) / SPEED_FACTOR}s linear`;

    x += (lastDx = dx);
    y += (lastDy = dy);
    z += (lastDz = dz);

    faces.forEach((face, index) => {
        if (SPEED_FACTOR) {
            face.style.transition = transition;
        }

        face.style.transform = `rotateZ(${z}deg) rotateY(${y}deg) rotateX(${x}deg) rotateY(${y0[index]}deg) rotateX(${x0[index]}deg) translateZ(50px)`;
    });

    if (SPEED_FACTOR) {
        progress.style.transition = transition;
        progress.style.width = parseInt(window.getComputedStyle(progress).width) === 0 ? '100%' : 0;
    }
}

function setFaces(chars) {
    if (chars.length === 6) {
        document.querySelectorAll('.face').forEach(function(div, index) {
            div.innerText = chars[index];
        });
    }
}
