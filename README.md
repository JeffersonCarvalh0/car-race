![Release](https://github.com/JeffersonCarvalh0/car-race/workflows/Release/badge.svg?branch=master)

# Car Race
A simple car racing game that runs on the browser.

[CLICK HERE](https://jeffersoncarvalh0.github.io/car-race/) to play the game!

## Build instructions
After cloning the repository, run `yarn` to download the deps, and `yarn start`
to run in your browser. `yarn test` to run the tests.

## How to play
 - A - left lane
 - S - middle lane
 - D - right lane
 - Left arrow - move left
 - Right arrow - move right
 - Escape - Toggle pause
 
On mobile, just tap on the lanes to move the car, and use the pause button at the upper right corner to pause/unpause the game

## Bonuses
### Finished(Merged to master and available in the live version of the game)
 - Pause
 - Obstacles
 - Mobile
 - Public link
 - Upnid stack
 - Documentation
 - Tests
 
### Incomplete(Pull request still open)
 - Turbo
 
### Not started
 - Lap numbers
 - Multiplayer
 - Leaderbord
 - Race ending

## Development
### Techs used
 - Typescript
 - React(Hooks)
 - Styled Components
 - Framer Motion
 - Jest/React Testing Library
 
### Strategy adopted
#### Core Game
used an `useEffect` hook to manage the intinal timer and [`useEventListener`](https://github.com/donavon/use-event-listener) to handle the keyboard controls. CSS transitions were used to move the car from one lane to another.

#### Pause
`useState` to set the pause status. If the game is paused, replace the background git with an static image, and show an overlay above the game screen with pause written on it. Pausing the game also stop the obstacle's animation and timer.

#### Obstacles
Randomly choses a position for a new obstacle and render it. The `newObstacleFlag` is used to trigger the event that sets a new position and creates a new obstacle. There is a `obstacleTimespan` constant that determines how long is the timespan between the new object creation and when it disappears in the bottom of the screen. The obstacle timer is reset at the end of each timespan, and a new obstacle is created. The `newObstacleFlag` is used as the obtsacle's key to force it to render again and trigger the obstacle's animation from start. The movement is managed by css animations and keyframes. At the end of each obstacle's timespan, a check is performed to see if the current player's position is equal to the current obstacle's position. If this is true, a crash happens, the game freezes and a "Game Over" screen is shown, with a button that allows the user to play again. If clicked, this button resets the game's state to start it again.

#### Mobile
Created a `TapAreaWrapper` component which is a flex div that covers the game screen. With its `flex-direction` property set to `column`, it is simple to create three children(`TapAreaRecognizer`) that are flex children that occupy the max amount of space they can. By doing this, each `TapAreaRecognizer` occupies the same amount of space, which enables us to make each of them a different region of the game screen. Each of them handles a mouse click(and a also a tap in a smartphone) that changes the player's position to its respective lane. A pause button was added in the upper-right corner, and percentages and media queries were used to make the game responsive.

#### Turbo(not completed)
Turn the `obstacleTimespan` into a state and cut it by half if the `isTurboActive` is true. The turbo is only active it its respective timer is above 5000ms to set a cooldown to it. The issue with that is, as the animation is handled by the css, the obstacle that is already being rendered in the screen then the timespan changes "jumps" to correct its position after the obstacle's timespan(that is  the animation's time) is changed. In order to prevent this jump, the calculations could be done in the typescript code and the values passed to the css(hypothesis).

#### Deploy
The game is being deployed to github pages. CI/CD is being managed by github actions. There is a development workflow for development that performs tests, type checks and lints the code which runs at every commit(except to master) and a release workflow that does everything the developmont workflow does and automatically deploys to github pages. The release workflow runs at every push to master, which includes PR merges.

## License
Licensed under MIT. See [LICENSE](LICENSE) for details.
