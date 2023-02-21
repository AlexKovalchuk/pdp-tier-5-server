import { MongoClient } from 'mongodb';

async function connectToCluster() {
    let mongoClient;
    const uri = 'mongodb+srv://pdp-user:pdp-user@learnnodejs.53bis.mongodb.net/?retryWrites=true&w=majority'
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
        
        return mongoClient;
    } catch ( error ) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

const clientDb = connectToCluster();

export default clientDb;

