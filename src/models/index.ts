import type { StateTransition } from "../types";

export class SimpleStateEngine {
  id: string;
  workflow?: StateTransition[];
  validateResults:
    | { current: number | string; action: string; result: boolean }[]
    | null;

  constructor(id: string) {
    this.id = id;
    this.validateResults = null;
  }

  design(transitions: StateTransition[]) {
    console.error("Method not implemented.");
    return this;
  }

  use(plugin: SimpleStateEngine) {
    console.error("Method not implemented.");
    return this;
  }

  override(id: string, transitions: StateTransition[]) {
    console.error("Method not implemented.");
    return this;
  }

  validate<V>(current: number | string, action: string, validationInput: V) {
    const transition = this.workflow?.find(
      (t) => t.fromState === current && t.action === action
    );
    if (!transition) {
      throw new Error(
        "No transition exists with this initial state and this action."
      );
    }

    this.validateResults = this.validateResults?.filter(
      (r) => !(r.current === current && r.action === action)
    ) as { current: number | string; action: string; result: boolean }[] | null;

    if (
      !transition.validation ||
      transition.validation(validationInput) === true
    ) {
      this.validateResults?.push({
        current: current,
        action: action,
        result: true,
      });
    } else {
      this.validateResults?.push({
        current: current,
        action: action,
        result: false,
      });
      if (transition.onValidationFailed) {
        transition.onValidationFailed();
      }
    }

    return this;
  }

  progress<I>(
    current: number | string,
    action: string,
    sideEffectInput?: I
  ): number | string {
    let final = current;
    const validationResult = this.validateResults?.find(
      (t) => t.current === current && t.action === action
    )?.result;

    if (validationResult === undefined) {
      throw new Error("State Engine must first validate");
    }

    if (validationResult === false) {
      throw new Error("State Engine cannot progress as validation failed");
    }

    const transition = this.workflow?.find(
      (t) => t.fromState === current && t.action === action
    );
    if (!transition) {
      throw new Error(
        "No transition exists with this initial state and this action."
      );
    }

    try {
      transition.sideEffect(sideEffectInput ?? undefined);
    } catch (e) {
      if (transition.onSideEffectError) {
        transition.onSideEffectError();
        return final;
      }
    }
    final = transition.toState;

    if (transition.autoProgress) {
      final = this.validate(final, "auto", "input-for-validation").progress(
        final,
        "auto"
      );
    }
    return final;
  }
}
