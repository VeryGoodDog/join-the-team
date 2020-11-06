// I used this to debug the error I mentioned with Express.json() in the devlog
import * as path from 'path';
import * as Express from 'express';

const PORT = 8080;

const app = Express();
app.all('*',(req, res, next) => {
	console.log('Req to '+req.path);
	console.log(req.body);
	next();
});
app.use(Express.json()); // this makes sure that req.body has values

app.all('*',(req, res, next) => {
	console.log('Req to '+req.path);
	next();
});

app.use(Express.static(path.join(__dirname, 'static')));

app.listen(PORT);