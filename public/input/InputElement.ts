import BasicComponent from "../BasicComponent";
const inputTemplate = require('./input.pug');
import './input.scss';
import {rungeKutta} from "../main";
import InputElements from "@input/InputFormInterface";
import {drawLoop} from "@pendulum/drawing";


class InputElement extends BasicComponent {

    private _headSelector =  ".main";
    private _formSelector =  ".forms-page__form";
    private _submitSelector =  ".forms-page__button";

    createHandlers() {
        const form: HTMLFormElement =  document.querySelector(this._formSelector);
        document.querySelector(this._submitSelector).addEventListener('click', (event) => {
            event.preventDefault();
            const elements: InputElements = form.elements as InputElements;
            rungeKutta.set(parseInt(elements.alpha_1.value), parseInt(elements.alpha_2.value), 0, 0);
            // window.requestAnimationFrame(drawLoop);
        } );
    }

    async create(identities: Array<string> = null, type: string = null) {
        this.renderTo(this._headSelector);
        this.createHandlers();
    }

    render() {
        return `${inputTemplate(this.data)}`;
    }

    renderTo(selectorString: string) {
        document.querySelector(selectorString).innerHTML = this.render();
    }

}

export default InputElement;