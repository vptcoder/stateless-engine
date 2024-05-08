import { SimpleStateEngine } from './models'

export const engine = new SimpleStateEngine('machine-id').design([
    {
        fromState: 0,
        action: 'submit',
        validation: ({ a, b }: { a: number; b: number }) => {
            return a === b
        },
        onValidationFailed: () => {
            console.log('pretends alert user...')
        },
        toState: 1,
        sideEffect: () => {
            console.log('state has changed')
        },
        onSideEffectError: () => {}
    },
    {
        fromState: 1,
        action: 'review',
        toState: 2,
        sideEffect: () => {
            console.log('application reviewed')
        },
        onSideEffectError: () => {
            throw new Error('unable to perform')
        }
    }
])

const current = 0
const newState = engine
    .validate(current, 'submit', { val: 4.25, check: 3 } as {
        val: number
        check: number
    })
    .progress(current, 'submit')

console.log(newState)
