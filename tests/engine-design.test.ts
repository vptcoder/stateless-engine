import { SimpleStateEngine } from '../src/models'
import { expect, test } from 'bun:test'

test('engine design - save successful', () => {
  type validationNewSave = {
    val: number
    check: number
  }
  const engine = new SimpleStateEngine('machine-id').design([
    {
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
    },
    {
      fromState: 'draft',
      action: 'submit',
      toState: 'submitted',
      sideEffect: () => {
        console.log('SIDE EFFECT: application submitted')
      },
      onSideEffectError: () => {
        throw new Error('unable to perform')
      }
    }
  ])

  const current = 'new'
  const newState = engine
    .validate(current, 'save', { val: 4.25, check: 3 } as validationNewSave)
    .progress(current, 'save')

  console.log('NEW STATE: ', newState)

  expect(newState).toBe('draft')
})

test('engine design - save fail', () => {
  type validationNewSave = {
    val: number
    check: number
  }
  const engine = new SimpleStateEngine('machine-id').design([
    {
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
    }
  ])

  const current = 'new'
  const newState = engine
    .validate(current, 'save', { val: 2, check: 3 } as validationNewSave)
    .progress(current, 'save')

  console.log('NEW STATE: ', newState)

  expect(newState).toBe('new')
})
