# ***Snake***

*JavaScript exercise, April 2017*

**By Joshua Fairchild**

---

## Description
This is a game. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

---

#### Basic Specifications
| Behavior | Example Input | Example Output |
|----------|---------------|----------------|
| Snake moves independently | *user loads the game* | *snake moves 10px in the current direction (every 85 ms)* |
| "Foodsquare" spawns randomly | *user loads the game / snake consumes a foodsquare* | *new foodsquare spawns at a random location* |
| Snake can change direction | *user presses an arrow key* | *snake begins moving in the specified direction* |
| Snake grows in size | *user moves the "head" of the snake over a foodsquare* | *foodsquare disappears, snake grows by one unit* |
| Game ends when the snake touches itself or a wall | *user moves the "head" of the snake onto another square of the body, or into the border* | *game resets (page reload)* |
| Score is recorded | *snake consumes a foodsquare* | "Score: *X*" *displayed to user*  |
| High scores are recorded | *game ends with a score higher than any previous scores made locally on this browser* | "Score: *X*" *displayed to user* |

----

#### Setup/Installation
* Clone this repository

 `git clone https://github.com/joshuafairchild1/snake`

* Navigate to "index.html" within the root directory and open it with any modern web browser

* The webpage can also be viewed [here](https://joshuafairchild1.github.io/snake/)


#### Known Bugs/Issues
If the user tries to change the direction of the snake 2 (or more) times in <85 ms, the game resets.
* Example: snake is moving right, user keys up, then right again (in <85 ms). The game will then reload as if the snake hit itself/wall.


#### Technologies Used
* HTML (Specifically the canvas element)
* CSS with Bootstrap
* JavaScript with jQuery


#### Legal

This software is licensed under the MIT license

Copyright (c) 2017 Joshua Fairchild
