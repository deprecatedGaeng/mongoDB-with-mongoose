import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

//ROUTES
import boardRoute from './routes/board';
import signupRoute from './routes/signup';
import loginRoute from './routes/login';

//ENV CONFIG
dotenv.config();

const app = express();
const port = process.env.PORT || 4500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ADD ROUTES
app.use('/board',boardRoute);
app.use('/signup',signupRoute);
app.use('/login',loginRoute);
//MONGOOSE
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

//LISTEN
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));

export default app;