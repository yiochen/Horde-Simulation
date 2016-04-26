# Horde-Simulation
prototype for CSE 380 project

## symbols
Center black solid circle represents Swiss. Outer circle represents range of the horde. Green rectangles represent zombies. 
## control
arrow key move the center. 
## behavior
Zombies has three behaviors:
- If outside of the circle range, move into the circle.
- If inside the circle range, periodically choose a target position within a circle, move to there and then wait a while.
- If center moves, copy the velocity.

