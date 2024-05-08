# Simple statemachine

## Philosophy

Design first, then execute seamlessly.

- avoid messy callbacks in code
- keep state management clear and on the smallest footprint, leave room for other important stuffs
- predictable, all design decision in 1 place and easy to debug
- seamless tie-in with side-effects

## Usage design

Example (see more in tests):

```js

// Design the state engine
type validationNewSave = {
val: number
check: number
}

const engine = new SimpleStateEngine('machine-id')
.design([
{
	fromState: 'new',
	action: 'save',
	validation: ({ val, check }: validationNewSave) => {return a >= b},
	onValidationFailed: () => {console.log('ON VALIDATION FAILED: pretends alert user...')},
	toState: 'draft',
	sideEffect: () => {console.log('SIDE EFFECT: state has changed')},
	onSideEffectError: () => {}
},
{
	fromState: 'draft',
	action: 'submit',
	toState: 'submitted',
	sideEffect: () => {console.log('SIDE EFFECT: application submitted')},
	onSideEffectError: () => {throw new Error('unable to perform')}
}
])

// Use the state engine
const current = 'new'
const newState = engine
.validate(current, 'save', { val: 4.25, check: 3 } as validationNewSave)
.progress(current, 'save')
```
