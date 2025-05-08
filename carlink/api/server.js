import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // URL do seu frontend
    credentials: true
  }));
app.use(express.json());    

app.use("/usuarios", userRoutes);
app.use("/auth", authRoutes);

app.listen(8800, () => {
    console.log("Connected to backend.");
});
