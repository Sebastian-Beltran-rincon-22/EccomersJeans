import app from './src/app.js';
import "./src/database/database.js";
import "./src/libs/initialSetup.js";
import { PORT } from './src/config.js';



app.listen(PORT);
console.log('Live serve on: ' + 'http://localhost:' + PORT)

//Ruta de entrada a la API
app.get('/', (req, res) => {
  res.send('Connected to API Ecommerce')
})
