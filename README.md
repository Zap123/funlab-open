![funlab](logo.png)

Funlab brings live events to life through interactive mobile experiences.

During concerts, parties and other events, Funlab engages attendees through interactive activities on their phones. This helps people feel more connected to the event while providing valuable insights to organizers.

Funlab empowers businesses and artists to easily provide interactive experiences - without expensive, one-off custom solutions. Artists and event organizers can choose from a catalog of pre-designed experiences and games, then customize and launch them in minutes.

All while boosting engagement, excitement and data collection to maximize the fun and success of any event.

This is the open core of the solution I brought to live events.

In the open core there are 3 types of actions: text, color and questions or experiments.
Text can be used to send a message to all participants, color will change the screen color and experiment will send questions

The followings are some examples of the message format: 

```
{"action":"text", "parameters":["put your hands in the air!"]}

{"action":"color", "parameters":["red"]}

{"action":"color", "parameters":["green"]}

{"action":"experiment", "parameters":["What is your favorite song?", "Smells Like
Teen Spirit - Nirvana", "Imagine - John Lennon", "One - U2", "Billie Jean - Micheal
Jackson"]}
```

It is also possible to request songs and to leave a message to the DJ.

Click on the image to see a demo
[![Demo funlab](demo.jpg)](https://raw.githubusercontent.com/Zap123/funlab-open/master/screencast.mp4?token=GHSAT0AAAAAACDS2QIYYS5LD23Y4ZIS52Z6ZD7T3OQ)
