export type StateTransition = {
	fromState: number | string;
	action: string;
	validationMethod?: any;
	onValidationFailed?: any;
	sideEffect?: any;
	onSideEffectError?: any;
	toState: number | string;
	autoProgress?: boolean;
};
