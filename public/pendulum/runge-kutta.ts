import {g, getRadians, L_1, L_2, M_1, M_2} from "@pendulum/parameters";

class RungeKutta {
    z = [0, 0, 0, 0];
    p1 = 0;
    p2 = 0;
    alpha1 = getRadians(0);
    alpha2 = getRadians(0);
    
    timeStep = 2/60;

    set(alpha1Start: number, alpha2Start: number, p1Start: number, p2Start: number) {
        this.p1 = p1Start;
        this.p2 = p2Start;
        this.alpha1 = getRadians(alpha1Start);
        this.alpha2 = getRadians(alpha2Start);
    }

    next() {
        this.z = [this.alpha1, this.alpha2, this.p1, this.p2];


        const y1 = [this.timeStep*this.diffAlpha1(this.z[0], this.z[1], this.z[2], this.z[3]), this.timeStep*this.diffAlpha2(this.z[0], this.z[1], this.z[2], this.z[3]),
                this.timeStep*this.diffP1(this.z[0], this.z[1], this.z[2], this.z[3]), this.timeStep*this.diffP2(this.z[0], this.z[1], this.z[2], this.z[3])];
        const y2 = [this.timeStep*this.diffAlpha1(this.z[0] + (1/2)*y1[0], this.z[1] + (1/2)*y1[1], this.z[2] + (1/2)*y1[2], this.z[3] + (1/2)*y1[3]),
                this.timeStep*this.diffAlpha2(this.z[0] + (1/2)*y1[0], this.z[1] + (1/2)*y1[1], this.z[2] + (1/2)*y1[2], this.z[3] + (1/2)*y1[3]),
                this.timeStep*this.diffP1(this.z[0] + (1/2)*y1[0], this.z[1] + (1/2)*y1[1], this.z[2] + (1/2)*y1[2], this.z[3] + (1/2)*y1[3]),
                this.timeStep*this.diffP2(this.z[0] + (1/2)*y1[0], this.z[1] + (1/2)*y1[1], this.z[2] + (1/2)*y1[2], this.z[3] + (1/2)*y1[3])];

        const y3 = [this.timeStep*this.diffAlpha1(this.z[0] + (1/2)*y2[0], this.z[1] + (1/2)*y2[1], this.z[2] + (1/2)*y2[2], this.z[3] + (1/2)*y2[3]),
                this.timeStep*this.diffAlpha2(this.z[0] + (1/2)*y2[0], this.z[1] + (1/2)*y2[1], this.z[2] + (1/2)*y2[2], this.z[3] + (1/2)*y2[3]),
                this.timeStep*this.diffP1(this.z[0] + (1/2)*y2[0], this.z[1] + (1/2)*y2[1], this.z[2] + (1/2)*y2[2], this.z[3] + (1/2)*y2[3]),
                this.timeStep*this.diffP2(this.z[0] + (1/2)*y2[0], this.z[1] + (1/2)*y2[1], this.z[2] + (1/2)*y2[2], this.z[3] + (1/2)*y2[3])];

        const y4 = [this.timeStep*this.diffAlpha1(this.z[0] + y3[0], this.z[1] + y3[1], this.z[2] + y3[2], this.z[3] + y3[3]),
                this.timeStep*this.diffAlpha2(this.z[0] + y3[0], this.z[1] + y3[1], this.z[2] + y3[2], this.z[3] + y3[3]),
                this.timeStep*this.diffP1(this.z[0] + y3[0], this.z[1] + y3[1], this.z[2] + y3[2], this.z[3] + y3[3]),
                this.timeStep*this.diffP2(this.z[0] + y3[0], this.z[1] + y3[1], this.z[2] + y3[2], this.z[3] + y3[3])];
        this.alpha1 = this.z[0] + (1/6)*(y1[0] + 2*y2[0] + 2*y3[0] + y4[0]);
        this.alpha2 = this.z[1] + (1/6)*(y1[1] + 2*y2[1] + 2*y3[1] + y4[1]);
        this.p1 = this.z[2] + (1/6)*(y1[2] + 2*y2[2] + 2*y3[2] + y4[2]);
        this.p2 =  this.z[3] + (1/6)*(y1[3] + 2*y2[3] + 2*y3[3] + y4[3]);

    }

    diffAlpha1(alpha1: number, alpha2: number, p1: number, p2: number): number {
        const numerator: number = p1*L_2 - p2*L_1*Math.cos(alpha1-alpha2);
        const denominator: number = L_1*L_1*L_2*(M_1 + M_2*Math.pow(Math.sin(alpha1 - alpha2),2));

        return numerator/denominator;
    }

    diffAlpha2(alpha1: number, alpha2: number, p1: number, p2: number): number {
        const numerator: number = p2*(M_1 + M_2)*L_1 - p1*M_2*L_2*Math.cos(alpha1-alpha2);
        const denominator: number = L_1*L_2*L_2*M_2*(M_1 + M_2*Math.pow(Math.sin(alpha1 - alpha2),2));

        return numerator/denominator;
    }

    diffP1(alpha1: number, alpha2: number, p1: number, p2: number): number {
        return -(M_1 + M_2)*g*L_1*Math.sin(alpha1) - this.getA1(alpha1, alpha2, p1, p2) + this.getA2(alpha1, alpha2, p1, p2);
    }

    diffP2(alpha1: number, alpha2: number, p1: number, p2: number): number {
        return -M_2*g*L_2*Math.sin(alpha2) + this.getA1(alpha1, alpha2, p1, p2) - this.getA2(alpha1, alpha2, p1, p2);
    }

    getA1(alpha1: number, alpha2: number, p1: number, p2: number): number {
        const numerator: number = p1*p2*Math.sin(alpha1-alpha2);
        const denominator: number = L_1*L_2*(M_1 + M_2*Math.pow(Math.sin(alpha1 - alpha2),2));

        return numerator/denominator;
    }

    getA2(alpha1: number, alpha2: number, p1: number, p2: number): number {
        const numerator: number = (Math.pow(p1, 2)*M_2*Math.pow(L_2, 2) - 2*p1*p2*M_2*L_1*L_2*Math.cos(alpha1 - alpha2) + Math.pow(p2, 2)*Math.pow(L_1, 2)*(M_1 + M_2))
            *Math.sin(2*(alpha1-alpha2));
        const denominator: number = 2*L_1*L_1*L_2*L_2*Math.pow((M_1 + M_2*Math.pow(Math.sin(alpha1 - alpha2), 2)), 2);

        return numerator/denominator;
    }

}

export default RungeKutta;