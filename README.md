![All-Seeing Wizards](https://user-images.githubusercontent.com/1077405/212424854-229b01d2-e52f-4475-9acd-f7b24aa2536b.png)

Requires MongoDB.

`yarn install` at the top level, then `yarn dev`

## Deployment

All Seeing Wizards can be built as a single Docker image. The included fly.toml can be used for easy deployment to [Fly.io](https://fly.io).

When running the Docker image, you will need to specify the following environment variables

- `MONGO_URL` should point to a MongoDB cluster. You can try out a free shared cluster on [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- `HASHIDS_SALT` should be some random string to seed the game ID generator
