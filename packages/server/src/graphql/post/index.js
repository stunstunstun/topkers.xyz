const { schemaComposer, EnumTypeComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const { Post, SOURCE } = require('@hashtags/domain')

const defaultSource = SOURCE.BLOG_PERSONAL
const postTypeComposer = composeWithMongoose(Post, {})

EnumTypeComposer.create(`enum SOURCE { ${Object.keys(SOURCE).join(',')} }`)

postTypeComposer.addResolver({
  name: 'posts',
  type: [postTypeComposer],
  args: { type: 'SOURCE' },
  resolve: async ({ args: { type } }) => {
    const source = type ? SOURCE[type] : defaultSource
    return Post.find({ source })
  },
})

postTypeComposer.addResolver({
  name: 'createPost',
  type: postTypeComposer,
  args: { input: postTypeComposer.getInputType() },
  resolve: async ({ args: { input } }) => {
    const { id, source } = input
    return Post.findOneAndUpdate(
      {
        id,
        source,
      },
      {
        $set: input,
        $setOnInsert: {
          created: new Date(),
        },
      },
      {
        setDefaultsOnInsert: true,
        upsert: true,
        new: true,
      },
    )
  },
})

schemaComposer.Query.addFields({
  posts: postTypeComposer.getResolver('posts'),
})

schemaComposer.Mutation.addFields({
  createPost: postTypeComposer.getResolver('createPost'),
})

module.exports = {
  defaultSource,
}
