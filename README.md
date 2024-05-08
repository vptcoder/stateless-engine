# Simple statemachine

## Philosophy
Design first, then execute seamlessly.
- avoid messy callbacks in code
- keep state management clear and on the smallest footprint, leave room for other important stuffs
- predictable, all design decision in 1 place and easy to debug
- seamless tie-in with side-effects

## Usage design

```js

type StateTransition = {
from: number | string

}
const machine = new SimpleStateMachine();

machine.default("machine-id",
	[
		{from: "currentState", to: "nextState", onBeforeChange: {() => {}}, onAfterChange: {() => {}}, onError: {() => {}}},
		{from: "currentState", to: "nextState", onBeforeChange: {() => {}}, onAfterChange: {() => {}}, onError: {() => {}}},
		{from: "currentState", to: "nextState", onBeforeChange: {() => {}}, onAfterChange: {() => {}}, onError: {() => {}}},
		{from: "currentState", to: "nextState", onBeforeChange: {() => {}}, onAfterChange: {() => {}}, onError: {() => {}}},
	]
)

nachine.override("machine-id",[
		{from: "currentState", to: "nextState", onBeforeChange: {() => {}}, onAfterChange: {() => {}}, onError: {() => {}}},
		{from: "currentState", to: "nextState", onBeforeChange: {() => {}}, onAfterChange: {() => {}}, onError: {() => {}}}
])
```
