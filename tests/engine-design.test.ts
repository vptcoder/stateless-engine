import { SimpleStateEngine } from '../src/models'
import { expect, test } from 'bun:test'

test('engine design', () => {
  const engine = new SimpleStateEngine('machine-id').design([
    {
      fromState: 'new',
      action: 'save',
      validation: ({ a, b }: { a: number; b: number }) => {
        return a === b
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
      action: 'review',
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
    .validate(current, 'save', { val: 4.25, check: 3 } as {
      val: number
      check: number
    })
    .progress(current, 'save')

  console.log('NEW STATE: ', newState)

  expect(newState).toBe('draft')
})
