import { SimpleStateMachine } from './models';

export const machine = new SimpleStateMachine('machine-id').build('machine-id', [
	{ from: 'currentState', to: 'nextState' },
	{
		from: 'currentState',
		to: 'nextState',
		onAfterChange: () => {
			console.log('state has changed');
		},
		onError: () => {},
	},
	{
		from: 'currentState',
		to: 'nextState',
		onBeforeChange: () => {},
		onAfterChange: () => {},
		onError: () => {},
	},
	{
		from: 'currentState',
		to: 'nextState',
		onBeforeChange: () => {},
		onAfterChange: () => {},
		onError: () => {},
	},
]);

machine.override('machine-id', [
	{
		from: 'currentState',
		to: 'nextState',
		onBeforeChange: () => {},
		onAfterChange: () => {},
		onError: () => {},
	},
	{
		from: 'currentState',
		to: 'nextState',
		onBeforeChange: () => {},
		onAfterChange: () => {},
		onError: () => {},
	},
]);
