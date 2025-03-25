import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];
    if (model && model.db && model.db.db) {
      let modelExists = await model.db.db.listCollections({
        name: collectionName
      }).toArray();

      if (modelExists.length) {
        await db.dropCollection(collectionName);
      }
    } else {
      console.error(`Model ${modelName} or its database connection is undefined.`);
    }
  } catch (err) {
    throw err;
  }
}
