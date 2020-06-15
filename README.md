# montyhall
A game based on the Monty Hall problem (commonly seen in TV shows).

## summary
The Monty Hall problem is a brain teaser, in the form of a probability puzzle, loosely based on the American television game show Let's Make a Deal and named after its original host, Monty Hall. The problem was originally posed (and solved) in a letter by Steve Selvin to the American Statistician in 1975. (from [Wikipedia](https://en.wikipedia.org/wiki/Monty_Hall_problem))

### the problem
In a situation which there are 3 doors, and behind one of them there is a prize, while there is nothing on the others. The participant chooses one of the doors, then the host (who knows what is behind the doors) opens another door which does not have the prize. Then he asks the participant if he wants to keep with the initially chosen door or to switch to the other door. Either way, after the confirmation from the participant, the host reveals what is behind the chosen door: a prize or the emptyness.

### business rules
- game assumptions:
    - The prize is initially hidden randomly behind the doors
- host assumptions:
  - The host must always open a door that was not picked by the participant
  - The host must always open an empty door, never the door with the prize
    - In case the participant has chosen the door with the prize, the host should randomly open one of the empty doors
  - The host must always offer the chance to switch between the originally chosen door and the remaining closed door

## Installation & Run
To install and run the game, just fork the src and run it on any webserver (Apache, nodejs, etc) as all scripts and dependencies are built-in and/or on CDN. The application was built using React JS and React Redux libs.
