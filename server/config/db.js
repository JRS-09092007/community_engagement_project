const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 * Connects to process.env.MONGODB_URI if provided and reachable.
 * Falls back to MongoMemoryServer in development if URI fails or is placeholder.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const isPlaceholder = !uri || uri.includes('username:password');

  if (!isPlaceholder) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.warn(`Could not connect to external MONGODB_URI: ${error.message}`);
      console.log('Falling back to In-Memory MongoDB server for seamless execution...');
    }
  } else {
    console.log('No production MONGODB_URI configured. Starting In-Memory MongoDB server...');
  }

  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const memoryUri = mongoServer.getUri();
    const conn = await mongoose.connect(memoryUri);
    console.log(`In-Memory MongoDB Server Connected: ${conn.connection.host}`);

    // Auto-seed in-memory database
    const seedData = require('../seed');
    console.log('Auto-seeding In-Memory database with initial content...');
    await seedData();
  } catch (memError) {
    console.error('Failed to initialize In-Memory Mongo Server:', memError.message);
    process.exit(1);
  }
};

module.exports = connectDB;
