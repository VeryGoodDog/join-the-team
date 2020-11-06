Tasks app!

To start the API run `docker-compose up` in the project dir.
This will take a while to build, most likely. (Because it installs Angular)
Note that starting the app like this has no client by default and one of the
two options below must be used.

You can also start the mongo and mongo-express containers seperately and then
run the API from the commandline via `npm start`.

To see all endpoints functioning, uncomment line 42 of `./api/app.ts` and then
navigate to `http://localhost:8080/test.html` while the API is running.
The console should have several logs of requests made to each endpoint.

To start the Angular server run `ng serve` or `npm startan`, then navigate to
`http://localhost/`.