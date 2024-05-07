export type StateTransition = {
	from: number | string;
	to: number | string;
	onBeforeChange?: (() => {}) | (() => void);
	onAfterChange?: (() => {}) | (() => void);
	onError?: (() => {}) | (() => void);
	onSuccess?: (() => {}) | (() => void);
};
