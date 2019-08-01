import mongoose from 'mongoose';

/**
 * Mongoose Loader: establishes a connection to the remote
 * MongoDB database.
 *
 * N/B: All loaders take in the express app, and the app config
 * object.
 */








export default function loadMongoose(app, config) {
 
return mongoose.connect('mongodb://collabs:c0llabs@ds149676.mlab.com:49676/workforce' , { useNewUrlParser: true });

}