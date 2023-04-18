// Load the http module to create an http server.
import createUsersRouter from './src/routes/userRouter';
import createMoviesRouter from './src/routes/moviesRouter';
import buildDependencies from "./src/config/dependencies";
import express from 'express';
import dotenv from 'dotenv';
import db from './src/config/db';


dotenv.config()
const port = process.env.PORT
const dependencies = buildDependencies();
db.init(); 

const app = express();
app.use(express.json())

app.use('/api/users', createUsersRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});