const SCALE = 200;
const L_1 = 1;
const L_2 = 0.5;
const M_1 = 1;
const M_2 = 0.5;
const g = 9.81;
function getX1(alpha1: number) {
    return Math.sin(alpha1)*L_1*SCALE;
}

function getX2(alpha1: number, alpha2: number) {
    return (Math.sin(alpha1)*L_1 + Math.sin(alpha2)*L_2)*SCALE;
}

function getY1(alpha1: number) {
    return Math.cos(alpha1)*L_1*SCALE;
}

function getY2(alpha1: number, alpha2: number) {
    return (Math.cos(alpha1)*L_1 + Math.cos(alpha2)*L_2)*SCALE;
}

function getRadians(alpha: number) {
    return alpha*Math.PI/180;
}
export {getX1, getRadians, getY1, getY2, getX2, M_1, M_2, L_2, L_1, g}
