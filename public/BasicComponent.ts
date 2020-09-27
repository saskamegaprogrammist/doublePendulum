class BasicComponent {
	private _data: object;
	private _parent: HTMLElement;

	constructor(data: object, parent: HTMLElement) {
		this._data = data;
		this._parent = parent;

	}
	get data() {
		return this._data;
	}

	set data(dataToSet: object) {
		this._data = {...dataToSet};
	}

	get parent() {
		return this._parent;
	}

	set parent(parent: HTMLElement) {
		this._parent = parent;
	}

	async create(identities: Array<string> = null, type: string = null) {
		// implement this
	}

	render() {
		// implement this
	}

	renderTo(selector: string) {
		// implement this
	}

    createHandlers() {
        //implement this
    }
}

export default BasicComponent;