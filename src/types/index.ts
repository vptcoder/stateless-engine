export type StateTransition = {
  fromState: number | string;
  action: string;
  validation?: any;
  onValidationFailed?: any;
  sideEffect?: any;
  onSideEffectError?: any;
  toState: number | string;
  autoProgress?: boolean;
};
