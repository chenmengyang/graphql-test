const fetch = require('node-fetch');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, } = require('graphql');
const api_key = 'c6f7ebb2fc1ff43574fdd6c4dd473f64'

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    description: '......',

    fields: () => ({
        author: {
            type: GraphQLString,
            resolve: r => r.author
        },
        content: {
            type: GraphQLString,
            resolve: r => r.content
        }
    })
})


const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: '......',

    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: d => d.title
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            resolve: d => d.reviews
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            movie: {
                type: MovieType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${api_key}&language=en-US`)
                .then(res => res.json())
                .then(movie => fetch(`https://api.themoviedb.org/3/movie/${args.id}/reviews?api_key=${api_key}&language=en-US&page=1`)
                    .then(res2 => res2.json())
                    .then(reviews => {
                        let obj = {
                            title: movie.title,
                            reviews: reviews.results,
                        };
                        return obj;
                    })
                )
            }
        })
    })
})

// fetch(`https://api.themoviedb.org/3/movie/${args.id}/reviews?api_key=${api_key}&language=en-US&page=1`)
// .then(res => res.json())
// .then(reviews => {
//     let obj = {
//         title: movie.title,
//         reviews: reviews.results,
//     };
//     return obj;
// })
