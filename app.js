console.log("Backend Mobile App");

import express from 'express';
import mongoose from 'mongoose';
 import cookieParser from 'cookie-parser';
 import cors from 'cors';
 import { fileURLToPath } from "url";
import morgan from 'morgan';
import path from 'path';
import { serveSwaggerUI, setupSwaggerUI } from './Swagger_Config.js';
import authRoutes from './routes/authRoutes.js'
import connectDb from "./config/db.js";
import router from "./routes/myroutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const hostname = process.env.SERVERURL;
const port = process.env.SERVERPORT;
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
import twilio from 'twilio'
import Message from './model/message.js'

//const dbURI = 'mongodb+srv://fedibr:fedibr28@cluster0.38xgvkm.mongodb.net/mongodb';
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
import dotenv from 'dotenv';

dotenv.config();
async function sendMessage(to, body) {
  try {
    const message = await client.messages.create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: body  
    });

    const messageRecord = new Message({
      to,
      body,
      dateSent: new Date(),
      sid: message.sid
    });

    await messageRecord.save();
    console.log('Message sent and saved:', message.sid);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
/*
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        console.log('Connecté à la base de données MongoDB');
        app.listen(port, () => {
            console.log(`Serveur en cours d'exécution sur le port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Erreur de connexion à la base de données MongoDB :', err);
    });
*/

 
app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, "../View/facebook.html"));
});

app.post('/api/send-sms', async (req, res) => {
  const { to, body } = req.body;
  
  try {
    await sendMessage(to, body);
    res.status(200).json({ message: 'SMS sent successfully' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});


app.use(authRoutes);
app.use('/api-docs', serveSwaggerUI, setupSwaggerUI);





const corsOptions = {
  origin: 'http://localhost:3000',
};
dotenv.config();



//info on req : GET /route ms -25
app.use(morgan("dev"));

app.use(cors(corsOptions));
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/api/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
  });
});
app.use("/Public/image", express.static(path.join(__dirname, "Public/image")));

// app.use(NotFoundError);
// app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running on ${hostname}:${port}`);
});
