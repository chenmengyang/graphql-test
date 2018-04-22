# graphql testing on nodejs (express)
Testing on movie data for the sake of fun, api provided by [moviedb](https://www.themoviedb.org/documentation/api)

## run the server
```javascript
node server.js
```

## Go to graphql UI
localhost:4000/graphql

## Test query
```javascript
{
  movie(id: 269149) {
    title,
    reviews {
      author
      content
    }
  }
}
```
