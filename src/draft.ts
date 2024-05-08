import { SimpleStateEngine } from './models';

export const engine = new SimpleStateEngine('machine-id').design([
	{
		fromState: 0,
		action: 'submit',
		validationMethod: ({ a, b }: { a: number; b: number }) => {
			return a === b;
		},
		onValidationFailed: () => {
			console.log('pretends alert user...');
		},
		toState: 1,
		sideEffect: () => {
			console.log('state has changed');
		},
		onSideEffectError: () => {},
	},
	{
		fromState: 1,
		action: 'review',
		toState: 2,
		sideEffect: () => {
			console.log('application reviewed');
		},
		onSideEffectError: () => {
			throw new Error('unable to perform');
		},
	},
]);

const newState = engine
	.validate(0, 'submit', { a: 3, b: 3 } as {
		a: number;
		b: number;
	})
	.progress(0, 'submit');

console.log(newState);
