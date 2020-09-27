import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss'

import RungeKutta from "@pendulum/runge-kutta";
import InputElement from "./input/InputElement";
import {drawLoop, drawPendulum} from "@pendulum/drawing";


const application = document.getElementById('application');

const formElement = new InputElement({}, application);
formElement.create();

const canvas = document.createElement('canvas');
canvas.id = 'canvas_pendulum';
application.appendChild(canvas);
const canvasContext = canvas.getContext('2d');
canvasContext.canvas.width  = 1200;
canvasContext.canvas.height = 800;

const rungeKutta = new RungeKutta();
window.requestAnimationFrame(drawLoop);

export {canvasContext, rungeKutta}