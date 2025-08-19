//Tu i thirr mjeshtrat me ta ndreq kit sen
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from '../config/index';
import { createConnection } from '../infrastructure/database/PostgreConfig';
import userRoutes  from '../presentation/routes/authRoutes';
import projectRoutes from "../presentation/routes/projectRoutes";

// Tu e cook applikacionin
const app = express();
app.use(cors({
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', userRoutes);
app.use('/api/project', projectRoutes);

// Ruje portin qtu maspari king
const PORT = config.server.port;

// Dheze kit mut
createConnection()
  .then(() => {

    app.listen(PORT, () => {
      console.log(`O nigga serveri u dhez hin kqyre qtu -> http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Databaza sboni mu lidh mfal king. Qe kqyre vet nese spo beson:", err);
    process.exit(1);
  });