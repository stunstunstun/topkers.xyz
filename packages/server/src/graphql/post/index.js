const { schemaComposer, EnumTypeComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const { Post, SOURCE } = require('@githubjobs/domain')

const postTypeComposer = composeWithMongoose(Post, {})

EnumTypeComposer.create(`enum SOURCE { ${Object.keys(SOURCE).join(',')} }`)

postTypeComposer.addResolver({
  name: 'posts',
  type: [postTypeComposer],
  args: { type: 'SOURCE' },
  resolve: async ({ args: { type } }) => {
    const source = type ? SOURCE[type] : SOURCE.BLOG_PERSONAL
    return Post.find({ source })
  },
})

schemaComposer.Query.addFields({
  posts: postTypeComposer.getResolver('posts'),
})
