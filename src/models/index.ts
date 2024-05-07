import type { StateTransition } from '../types';

export class SimpleStateMachine {
	id: string;
	workflow?: StateTransition[];

	constructor(id: string) {
		this.id = id;
	}

	build(id: string, transitions: StateTransition[]) {
		console.error('Method not implemented.');
		return this;
	}

	use(plugin: SimpleStateMachine) {
		console.error('Method not implemented.');
		return this;
	}

	override(id: string, transitions: StateTransition[]) {
		console.error('Method not implemented.');
		return this;
	}

	progress() {
		throw new Error('Method not implemented. Should return nextState');
	}

	rollback() {
		throw new Error('Method not implemented. Should return prevState');
	}

	private onError() {
		console.error('Method not implemented.');
		return this;
	}
}
