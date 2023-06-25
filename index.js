import express from "express";
import routes from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.get('/', function(request, response, next){

	response.sendFile(`${process.env.PWD}/public/home.html`);


});

app.post('/', function(request, response, next){

	response.send(request.body);

});

app.listen(3000, () => {
    console.log('Server Started @ port 3000')
});
