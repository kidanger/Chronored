LD27
====

Theme: 10 seconds

Game will be available here: http://kidanger.github.io/LD27

Made with Drystal, my game engine.

Idea
====

The player controls a space ship.
It goes from planets to planets (automatic). Each time the ship lands, a new level start.

Levels consist in a start, a end, lots of static boxes (on which the ship can collide and be damaged).
Some boxes are destroyable?
There are two types of capsules: fuel and health.

Controls: the player use right and left to rotate the ship (angular velocity) and forward to activate ship's engine (apply impulse in the direction).
Fuel is initialized to a 10 seconds usage. If you gather a fuel capsule, it restore it to 10 seconds, no more.
When the engine is used, the countdown appears.


TODO
====

Ship image
ship drawing, update, controls

Tomorrow
========

Menu
Particles
Tweening!
Ending


DONE
====

content.lua which can load image/font
Level converter .png -> .lua
level.lua: create boxes and stuff, and bufferize it

