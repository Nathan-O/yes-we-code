# Project One for WDI

## DESCRIPTION

It's time to put everything that I've learned in the past month together! For my first project I will use my knowledge of front and back-end web development (it's so exciting that I have knowledge of this!) to produce an awesome web application that can be used by friends, family or any of the other billions of people who use the Internet. The type of web application I create is my choice.

The objective of this project is to:

* Apply the skills I've learned by building a web application from the ground up.
* Demonstrate mastery of topics covered during this course so far.

I will be working **individually** for this first project.

## WHAT IS THIS LADY-STACKOVERFLOW YOU SPEAK OF

StackOverflow is male dominated, as is the tech community in general. As I researched the problem with the lack of girls on [SO](http://meta.stackexchange.com/questions/30411/what-can-stack-overflow-do-to-persuade-female-programmers-to-participate-more) one of the comments actually says 'Perhaps some occupations, like IT, are simply not a woman's job? Strippers are mostly women. So what? Why do women complain they don't get into IT?'. Women in tech are told things like 'you need to go back to playing with my Barbie dolls' (Heather, SO), and this even happens on sites like SO. I believe this pushes many women away, and they are made to feel inferior to men. Women need a place to ask and answer questions where they feel safe and free of judgement. This inspired my site, which is like StackOverflow-but for Women!

## HOW DOES MY APP WORK

* **Express API** I implemented a backend API Express that serves up an html page(s) and a JSON API.
* **RESTful Routes** Designed the routes in a [RESTful](http://restfulrouting.com/mappings/resources) manner.
* **MongoDB** Persisted three models in a Mongo Database.
* **AJAX** Leveraged the backend API to fetch JSON asynchronously to the client.
* **jQuery** Used jQuery to manipulate the DOM and data on the client-side.
* **Templating** Backend templating with EJS and rendered the JSON data on the frontend using underscore templates.
* **Authentication** Enable users to signup, login, and logout.
* **Data Validation** Validated data by handling incorrect inputs during sign up (currently redirects to signup page if error occurs), with a unique username.
* **Model Relationship** Created a `has_many` relationship between the User, Questions, and Answers using referenced data.
* **Visual Design** Used Twitter Bootstrap and local CSS files to beautify the front-end.
* **Heroku** Deployed code to Heroku without exposing any secret keys.
* **Authorization** Disallow users from CRUDing content in other users' profiles (NO ACCESS FOR YOU).
* **Cookies** Added a cookie for every user session.
