# Smart To Do List

This web application helps visitors create a list of to-do items in four categories (books to read, movies to watch, restaurants to visit, and products to buy).  The visitor can use a smart search bar that provides autocomplete suggestions by connecting to the following four APIs: Google Books, Yelp, Amazon, and The Movie Database. The APIs will also be used to obtain summary information about each item.

## Final Product

### Registration Page
!["Registration Page"](https://github.com/vdutz/smart-todo-list/blob/master/docs/registration-page.png?raw=true)

### Item List Page
!["Item List Page"](https://github.com/vdutz/smart-todo-list/blob/master/docs/list-page.png?raw=true)

### Item List Page with Hover
!["My List with Hover"](https://github.com/vdutz/smart-todo-list/blob/master/docs/list-page-hover.png?raw=true)

### Search Page
!["Search Page"](https://github.com/vdutz/smart-todo-list/blob/master/docs/search-page.png?raw=true)

### Search Page (2)
!["Search Page (2)"](https://github.com/vdutz/smart-todo-list/blob/master/docs/search-page2.png?raw=true)

### Search Item Zoom
!["Search Item Zoom"](https://github.com/vdutz/smart-todo-list/blob/master/docs/search-item-zoom.png?raw=true)

### Search Item Zoom with Hover
!["Search Item Zoom with Hover"](https://github.com/vdutz/smart-todo-list/blob/master/docs/search-item-zoom-hover.png?raw=true)

### Edit Profile Page
!["Edit Profile Page"](https://github.com/vdutz/smart-todo-list/blob/master/docs/edit-profile-page.png?raw=true)


## Dependencies

- amazon-product-api 0.4.3 or above
- bcrypt 1.0.2 or above
- body-parser 1.15.2 or above
- cookie-session 2.0.0-beta.2 or above
- dotenv 2.0.0 or above
- express 4.13.4  or above
- knex 0.13.0 or above
- knex-logger 0.1.0
- morgan 1.7.0 or above
- node-sass-middleware 0.9.8 or above
- pg 7.0.1 or above
- request-promise 4.2.1 or above

## Getting Started

1. Create the .env by using .env.example as a reference: cp .env.example .env
2. Update the .env file with your correct local information
3. Install dependencies: npm i
4. Fix to binaries for sass: npm rebuild node-sass
5. Run migrations: npm run knex migrate:latest
6. Check the migrations folder to see what gets created in the DB
7. Run the seed: npm run knex seed:run
8. Check the seeds file to see what gets seeded in the DB
9. Run the server: npm run local
10. Visit http://localhost:8080/

## Test Login Information

You may use the following pre-existing account to login:

- Email: test@test.com
- Password: test

## Obtaining the API Keys

### The Movie Database API

- Follow the steps on this page: https://developers.themoviedb.org/3/getting-started

### Yelp Fusion API

- Follow the steps on this page: https://www.yelp.ca/developers/documentation/v3/get_started

### Amazon API

- Follow the steps on this page: http://docs.aws.amazon.com/AWSECommerceService/latest/GSG/GettingStarted.html

