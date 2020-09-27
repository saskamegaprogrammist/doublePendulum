import {getX1, getX2, getY1, getY2} from "@pendulum/parameters";
import {rungeKutta, canvasContext} from "../main";

const COLOR = '#D45C90';
const COLOR_DOT = '#4F30D4';

function drawPendulum() {

    const X_1 = getX1(rungeKutta.alpha1);
    const X_2 = getX2(rungeKutta.alpha1, rungeKutta.alpha2);

    const Y_1 = getY1(rungeKutta.alpha1);
    const Y_2 = getY2(rungeKutta.alpha1, rungeKutta.alpha2);

    canvasContext.save();
    canvasContext.clearRect(0, 0, 8000, 8000);
    canvasContext.translate(400, 400);

    canvasContext.save();

    canvasContext.strokeStyle = COLOR;
    canvasContext.fillStyle = COLOR_DOT;
    canvasContext.lineWidth = 3;

    canvasContext.beginPath();
    canvasContext.arc(0, 0, 8, 0, Math.PI * 2, true);
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.moveTo(0,0);
    canvasContext.lineTo(X_1, Y_1);
    canvasContext.stroke();

    canvasContext.beginPath();
    canvasContext.arc(X_1, Y_1, 8, 0, Math.PI * 2, true);
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.moveTo(X_1, Y_1);
    canvasContext.lineTo(X_2, Y_2);
    canvasContext.stroke();

    canvasContext.beginPath();
    canvasContext.arc(X_2, Y_2, 4, 0, Math.PI * 2, true);
    canvasContext.fill();

    canvasContext.restore();
    canvasContext.restore();
}

function drawPendulumCycle() {
    rungeKutta.next();
    drawPendulum();
}

function drawLoop() {
    drawPendulumCycle();
    window.requestAnimationFrame(drawLoop);
}

export {drawLoop, drawPendulum}