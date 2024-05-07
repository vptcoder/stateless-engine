# Simple statemachine

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
