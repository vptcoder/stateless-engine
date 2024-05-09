import { SimpleStateEngine } from '../src/models'
import { expect, test } from 'bun:test'

test('engine add - save successful', () => {
  type validationNewSave = {
    val: number
    check: number
  }
  type validationDraftSubmit = validationNewSave

  const engine = new SimpleStateEngine('machine-id')
    .add({
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
        console.log('SIDE EFFECT: saved successfully')
      },
      onSideEffectError: () => {}
    })
    .add({
      fromState: 'draft',
      action: 'submit',
      validation: ({ val, check }: validationNewSave) => {
        console.log('val: ', val, 'check: ', check)
        console.log('val is bigger than check: ', val >= check)
        return val >= check
      },
      onValidationFailed: () => {
        console.log('ON VALIDATION FAILED: pretends alert user...')
      },
      toState: 'submitted',
      sideEffect: () => {
        console.log('SIDE EFFECT: submitted successfully')
      },
      onSideEffectError: () => {}
    })

  const current = 'new'
  const saved = engine
    .validate(current, 'save', { val: 4.25, check: 3 } as validationDraftSubmit)
    .progress(current, 'save')

  console.log('NEW STATE: ', saved)
  expect(saved).toBe('draft')

  const submitted = engine
    .validate(saved, 'submit', {
      val: 4.25,
      check: 3
    } as validationNewSave)
    .progress(saved, 'submit')
  console.log('NEW STATE: ', submitted)
  expect(submitted).toBe('submitted')
})
