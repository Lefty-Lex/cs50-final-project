# connect'em
#### Video Demo:  <https://www.youtube.com/watch?v=DlVm-QftRnA>
## Introduction:
This is a connect 4 style game where you can play with your friends, in a browser online!
You or you friend simply has to create a room and send the url to the other , just like that you guys are in the same game!
Who ever is the host has the ability to change the size of the board, from 5x5 to 15x15 ! then simply submit to apply the changes, and both you and your friend will see the newly generated board,
Once one of you win you will be alerted!
### Utilized:
nodejs
socket.io
express
express-session
crypto
ejs

#### Description:
I had to think of a project that would challenge me, compile all of the information that i learned from cs50,  and be something i would enjoy using.
The first thought i had was of a game since i love gaming,And i have been gaming since i was 11 years old purely on pc's, I started there.
I wanted to create a game that i could simply play in my web browser and i wanted it  be able to play it online so i could play with my friends, And my friends could play with theres also.
so I began thinking of things i could create , what languages i could create it in and along the way learn new skills.
I learned about nodejs how it could utilize javascript for creating server backends so i gave it a go instead of using python which was my first thought!
I began working on a connect 4 style game and my god was it tricky,
Figuring out what kind of logic i want the game to have, how to implement that logic, correct layout along with getting the grid to work correctly.
One of the most difficult things i had to figure out was how i wanted to send the information from the client to the server and vice versa, As using simple http requests did not seem like the best option so i found out about socket.io and how it could send information through sockets and keep the connection open !
Another tricky thing i came across was to figure out who and how many people was connected, for this i used express-session to help keep track of users with there sessionID.
Almost everything in this game is server sided due to me wanting to prevent as much as possible any exploits happening due to that ruining the game for everyone.

#### todo list:
add animations for when the coins drop in.
allow more than 2 players to be able to join a single room.
allow users to sign up to be able to create there own usernames and add friends to have easier joining with one another.

#### Possible improvements:
The layout of the webpage could be improved.
Colors and styling of the webpage could be improved.

#### Final thoughts:
CS50 has been a great, interactive, tough and engaging learning experience for me,
I have learned more in the past few months in programming and CS than i have in the past 2 years of attempting to learn myself.
There is so many resources online that usually lead to a dead end after teaching you the basics and never challenging you,
Oh boy cs50 is not that every single lecture presents a challenge but also makes stuff in your head go "Ohhhh thats how that works".
I therefor thank everyone involved in CS50 for the knowledge they have gave me along with everyone that has taken there course.
