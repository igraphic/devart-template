# Happy Shapes
**Happy Shapes** _It will Surprise You_
## Authors
- Tyseer Mohamed, https://github.com/igraphic
- Lindsay Craft

## Description

Happy Shapes is a try to implement a new artistic concept: art that authored by computer. 

Inputs are given to the software without specific values. We add more possibilities, and less rules. The computer will manipulate these inputs with values that assigned **by the computer**, to generate unexpected art.

**Insanity: doing the same thing over and over again and expecting different results** _Albert Einstein_

In that type of art doing the same steps every time, will lead to different results.

**In this art We try not to control everything, why?**
Let’s assume that there is no clouds. We have to make our own clouds, and put them in the sky, so we can make rain, and get water to survive. **Will that clouds be more beautiful than what we have now? Will everyone on earth will enjoy looking at it?** and it’s scary to imagine the difference between the clouds in the rich countries and clouds in the poor countries.

The source of human creativity is the nature. That nature **we have no control on it**. In the Nature everything is beautiful, since it was created billions of years ago.

## Idea History

About 8 months ago I was watching a TED video, _Joshua Foer: Feats of memory anyone can do._ in that video Joshua was talking about the memory techniques. The most successful technique to remember list of things or speech, is to imagine a really weird story and link it to the things that you want to remember.

http://www.youtube.com/watch?v=U6PoUg7jXsA

I tried to do this, but it was a little bit hard for me to focus and imagining weird story every time I want to remember something. Then I thought that a software program can do this. I was thinking of a software that can take a list of words or numbers and  write a scenario, based on a predefined objects. After that the software will show pictures, or animation to tell the story for the user.

![Chart](project_images/chart01.png?raw=true "Chart")
 
The objects should have flexible parameters, and behaviour, to act in different situations, and that will help to achieve the target of making a weird story.

**Example**
```
We have number "84206" that we want to remember. 
If we think of the number's digits as [8 as snowman, 4 as boat, 2 as swan, 0 as doughnut, 6 as chair]
We can imagine a story like that one:
A snowman in a boat sailing in a river in the sky, then they hit a swan that fall into ground, to find a doughnut on a chair, the swan liked the doughnut's taste.
```

![Example Story](project_images/story.png?raw=true "Example Story")

I'm thinking of software that will generate a story like that based on the number I want to remember. Take into consideration that the software should generate totally different stories, even for the same inputs. I believe that could be done, for numbers and text.

Thinking of the main Java classes needed
![Sketch](project_images/sketch.jpg?raw=true "Sketch")


## Happy Shapes Story
I knew about the contest since the first day. I was working on an idea to implement the numbers remembering system, but the time passed and I couldn't figure out how to build a prototype for it. Then I decided to work on the simple form of the idea, which is giving the software inputs to do something related to the inputs but unexpected.

**Happy Shapes** is a simple web application that generates fun, whimsical illustrations using basic shapes, with parameters specified by code, and can be controlled by the user.

- Current Shape Options 
- Circle
- Square
- Rectangle
- Triangle 
- Hexagon
- Octagon

Parameters Options
- size
- color
- number
- opacity
- rotation 

The user can control these parameters by using **Happy Shapes** options. With the "Surprise me!" button, **Happy Shapes** will work based on a set of randomly selected shapes and parameters — which is a lot of fun! 

Users also have the option to specify the canvas size of their Happy Shapes creation, and are able to download both raster and vector versions of their work. Happy Shapes can be used in both desktop and mobile browsers. 

The future of Happy Shapes
- Randomly generated animated images (GIF), and Viedos
- Integration with Google Maps, the map will be in the background, and **Happy Shapes** will display photos from the current - - location using the **Happy Shapes** way.
- View photo albums from Google+
- Sharing options
- More shape options

## Link to Prototype

[Happy shapes](http://happy-shapes.appspot.com/ "Happy shapes")

## Example Code
```
//Set default profile
var dp = {source: 0, canvasWidth: 100, canvasHeight: 100, canvasBgColor: "white", numberOfActors: 0, shapes: [0, 2, 3, 4, 6, 8], maxSize: 30, minSize: 5, maxRotate: 180, minRotate: 0, maxOpacity: 1.0, minOpacity: 0.1, rotate: "always", fill: "never", stroke: "random", shadow: "never", usePalette: false, palette: {}};
```
## Links to External Libraries

[Fabric.js](http://fabricjs.com/ "http://fabricjs.com/")

## Helpful Resources

- google
- fabricjs
- jquery
- wikipedia
- stackoverflow
- githup
- w3schools

## Images & Videos
My Friend Lindsay who made the cover photo using *Happy Shapes* also created these videos

### Happy Shapes Demo
http://www.youtube.com/watch?v=SXFZSesniK0

### Happy Shapes Wonderful art in one minute
http://www.youtube.com/watch?v=oDZSzIajpuA

### Happy Shapes _Surprise me!_ inspiration
http://www.youtube.com/watch?v=_rkjOfvwt70

## Earlier
![Happy shapes](project_images/Happy Shapes2.jpg?raw=true "Happy shapes")

![Happy shapes](project_images/happy shapes06.png?raw=true "Happy shapes")

![Happy shapes](project_images/happy shapes05.png?raw=true "Happy shapes")

![Happy shapes](project_images/happy shapes04.png?raw=true "Happy shapes")

![Happy shapes](project_images/happy shapes.png?raw=true "Happy shapes")



