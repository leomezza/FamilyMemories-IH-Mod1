![logo_game](./img/CardCover.png)

# Project #1

# Family Memories

This is my first coding project as part of the IronHack bootcamp. It's a game called **Family Memories** and it's just like a regular *memory game* but using pictures of loved children from my family.

## Summary

  - [Game rules](#game-rules)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Running the tests](#running-the-tests)
  - [Version](#version)
  - [Authors](#authors)
  - [Roadmap](#roadmap)
  - [Acknowledgments](#acknowledgments)

## Game rules

1. Cards will be mixed up
2. All cards face down
3. Player turn over any two cards
   * If the two cards match we keep them
   * If they don't match, we turn them back over
4. Remember what was on each card and where it was
5. The game is over when all the cards have been matched
6. The player checks how many attempts were needed

## Prerequisites

No real prereqs, just use your **browser**, game is using standard *HTML, CSS and JavaScript*.

## Installing

You can run it offline by downloading/cloning the project files or you can run my online instance from [GitHub Pages](https://leomezza.github.io/FamilyMemories-IH-Mod1/)

If you want to customize the game with your own family pictures firstly download/clone the the project, then just throw the image files inside **img** folder and edit the constant array *family* from *js/script.js* with the family members names which must match the filenames from the pictures.

   Example:
```javascript
const family = ['Romeo', 'Juliet', 'John', 'Mary'];
```
   **img** folder must have correspondent files *Romeo.jpg, Juliet.jpg, John.jpg, Mary.jpg* inside it.

## Running the tests

Explain how to run the automated tests for this system

## Version

Version | Comments
------- | --------
0.1 | Initial release

## Authors

  * **Leonardo Mezzanotti** - [leomezza](https://github.com/leomezza)
  * Some parts of this code are taken from this [Self Guided Reinforcement Lab](https://github.com/ironhack-labs/lab-javascript-memory-game) - thanks much my instructor for pointing me to this resource


## Roadmap

* 2, 3 or 4 players
* Improve responsive web design

## Acknowledgments

* **Henrique** - Instructor
* **Ingrid** - Teacher Assistant
