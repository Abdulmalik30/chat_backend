import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

// Corrected MongoDB connection string
const DB_URI = process.env.DB_URI;
app.use(cors({
    origin: '*'
}));

let expressServer;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Error connecting to the database:', error));

mongoose.connection.once('open', () => {
  expressServer = app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});

// Corrected the variable name from 'serve' to 'expressServer'
const io = new Server(expressServer, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);
});
