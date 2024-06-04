import { credentials } from "./src/middleware/index.js"
import { corsOptions } from "./src/configs/index.js"
import cookieParser from "cookie-parser"
import express from "express";
import cors from "cors";
import { CarroRoutes , TesteRoutes } from './src/routes/index.js'

//Initializing express
const app = express();

//Credentials check before CORS!
app.use(credentials);

//Solve CORS
app.use(cors(corsOptions));

//Config JSON response
app.use(express.json());

//Middleware for cookies
app.use(cookieParser());

//Routes
app.use('testando', TesteRoutes);
app.use('carrinhos', CarroRoutes);

app.listen(3000, () => {
  console.log(`Server Running on PORT: 3000!`);
})
