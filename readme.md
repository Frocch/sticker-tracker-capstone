# Sticker Tracker
Currently deployed on Heroku: https://sticker-tracker-capstone.herokuapp.com/

Sticker Tracker is a fullstack web application designed to use in tandem with the popular Panini FIFA World Cup Qatar 2022 Sticker Album, with the purpose of adding the physical stickers you collect to your digital album so you can have quick and easy access to see what stickers you already have and most importantly, what stickers you are still missing. To make trading as easy as possible, with the click of a button you can pull up the list of your missing stickers and use that to share with anyone you want. 

The function to display Missing Stickers is not currently live on the current version, but will be included in the next update of the app.

![alt text](https://github.com/Frocch/sticker-tracker-capstone/blob/main/images/LOGINStickerTracker.png?raw=true)

![alt text](https://github.com/Frocch/sticker-tracker-capstone/blob/main/images/SIGNUPStickerTracker.png?raw=true)

![alt text](https://github.com/Frocch/sticker-tracker-capstone/blob/main/images/MAINStickerTracker.png?raw=true)


## Technologies Used

* JavaScript
* Express
* Node.js
* Heroku
* Sequelize.js
* PostgreSQL
* HTML
* CSS

## Features

* Login and registration in order to send and receive unique user album data to the database. 
* Stickers are organized and displayed by teams and categories to match page content in the physical album for ease of use.
* User adds sticker to their album by simply clicking the Add button next to the sticker name.
* User can acces "My Album" button to change the page display to show their current album in the same format as it was for the full list of stickers.
* User can sign out from the home page.
* Team stickers are generated and displayed directly from information in the database, which means that this app could very easily be used to a future version of the album or any other album by simply using a database with said updated information and updating HTML to match said album. 
* Upcoming Features include Missing Sticker list, Sticker rarity labels and Repeat Stickers list so the user can upload their repeated stickers in order to have access to a list of their repeated stickers they are willing to trade. Current priority is correcting known bugs and issues before implementing additional features.


