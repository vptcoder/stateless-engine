import type { StateTransition } from '../types'

export class SimpleStateEngine {
  id: string
  workflow?: StateTransition[]
  validateResults:
    | { current: number | string; action: string; result: boolean }[]
    | null

  constructor(id: string) {
    this.id = id
    this.workflow = []
    this.validateResults = []
  }

  design(transitions: StateTransition[]) {
    transitions?.forEach((t) => this.add(t))
    return this
  }

  use(plugin: SimpleStateEngine) {
    if (!plugin.workflow) {
      return
    }
    plugin.workflow?.forEach((t) => this.add(t))
    return this
  }

  add(transition: StateTransition) {
    if (
      !this.workflow?.find(
        (f) =>
          f.fromState === transition.fromState && f.action === transition.action
      )
    ) {
      this.workflow?.push(transition)
    } else {
      throw new Error(
        'A similar transition with current state ' +
          transition.fromState +
          ' with action ' +
          transition.action +
          ' already exists'
      )
    }
    return this
  }

  remove(transition: StateTransition) {
    this.workflow = this.workflow?.filter(
      (f) =>
        !(
          f.fromState === transition.fromState && f.action === transition.action
        )
    )
    return this
  }

  override(transitions: StateTransition[]) {
    transitions.forEach((t) => {
      this.remove(t).add(t)
    })
    return this
  }

  validate<V>(current: number | string, action: string, validationInput: V) {
    const transition = this.workflow?.find(
      (t) => t.fromState === current && t.action === action
    )

    if (!transition) {
      throw new Error(
        'No transition exists with this initial state and this action.'
      )
    }

    this.validateResults = this.validateResults?.filter(
      (r) => !(r.current === current && r.action === action)
    ) as { current: number | string; action: string; result: boolean }[] | null

    if (
      !transition.validation ||
      transition.validation(validationInput) === true
    ) {
      this.validateResults?.push({
        current: current,
        action: action,
        result: true
      })
    } else {
      this.validateResults?.push({
        current: current,
        action: action,
        result: false
      })
      if (transition.onValidationFailed) {
        transition.onValidationFailed()
      }
    }

    return this
  }

  progress<I>(
    current: number | string,
    action: string,
    sideEffectInput?: I
  ): number | string {
    let final = current
    const validationResult = this.validateResults?.find(
      (t) => t.current === current && t.action === action
    )?.result

    if (validationResult === undefined) {
      throw new Error('State Engine must first validate')
    }

    if (validationResult === false) {
      console.error('State Engine cannot progress as validation failed')
      return final
    }

    const transition = this.workflow?.find(
      (t) => t.fromState === current && t.action === action
    )
    if (!transition) {
      throw new Error(
        'No transition exists with this initial state and this action.'
      )
    }

    try {
      transition.sideEffect(sideEffectInput ?? undefined)
    } catch (e) {
      if (transition.onSideEffectError) {
        transition.onSideEffectError()
        return final
      }
    }
    final = transition.toState

    if (transition.autoProgress) {
      final = this.validate(final, 'auto', 'input-for-validation').progress(
        final,
        'auto'
      )
    }
    return final
  }
}
