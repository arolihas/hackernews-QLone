const { GraphQLServer } = require('graphql-yoga')

let links = [{
	id: 'link-0',
	url: 'www.howtographql.com',
	description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of the Hackernews Clone',
    feed: () => links,
    link: (id) => links[id],
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
	description: args.description,
	url: args.url,
      }
      links.push(link)
      return link
    },
    update: (parent, args) => {
      toUpdate = links.find(e => e.id === args.id)
      const newLink = {
        id: args.id,
	url: args.url ? args.url : toUpdate.url,
	description: args.description ? args.description : toUpdate.description
      }
      links[links.indexOf(toUpdate)] = newLink 
      return newLink
    },
    delete: (parent, args) => {
      deleted = links.find(e => e.id === args.id)
      links = links.filter(e => e.id !== args.id)
      return deleted
    }
  },
}
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))




