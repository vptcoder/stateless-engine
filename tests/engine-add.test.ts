import { SimpleStateEngine } from '../src/models'
import { expect, test } from 'bun:test'

test('engine add - save successful', () => {
  type validationNewSave = {
    val: number
    check: number
  }
  const engine = new SimpleStateEngine('machine-id').add({
    fromState: 'new',
    action: 'save',
    validation: ({ val, check }: validationNewSave) => {
      console.log('val: ', val, 'check: ', check)
      console.log('val is bigger than check: ', val >= check)
      return val >= check
    },
    onValidationFailed: () => {
      console.log('ON VALIDATION FAILED: pretends alert user...')
    },
    toState: 'draft',
    sideEffect: () => {
      console.log('SIDE EFFECT: state has changed')
    },
    onSideEffectError: () => {}
  })

  const current = 'new'
  const newState = engine
    .validate(current, 'save', { val: 4.25, check: 3 } as validationNewSave)
    .progress(current, 'save')

  console.log('NEW STATE: ', newState)

  expect(newState).toBe('draft')
})
