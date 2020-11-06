Development Log

I just got docker to install.
Finally got docker to create the image I need, and then run it, but it is throwing errors...
Oh I see, when the Dockerfile runs COPY it actually copies the file instead of
making a symlink or something. That's good to know. That makes this a lot easier than
I thought it would be.

First, I should probably add the data needed on the tasks, and then make a TS class
for them.
- Task name.
- Category.
- Time created.
- Completion status.
- Time completed.
- Any extra notes.

Now I need to update MongoConnector.ts. Done!
I also had to add _id to Task. Now I am making a Category class. Done, Now on to
the interesting part of making this a useful API.

After checking out Express I think I have a good idea of how to do these.

- Create a task.
- Rename a task.
- Mark a task as complete.
- Delete a task.
- Create a category.
- Delete a category.
- Rename a category.
- Add a task to a category.
- Remove a task from a category.

I could probably do this all with just GET and POST requests, I think it will be
more interesting to use other things.

The /task endpoint will take a query string of the action, and then any other
required parameters. Say a GET request to /task?act=list will just return all
the task ids, and perhaps a GET req to /task?act=data&id=1234 will return 
relevant data. I will put a spec in another file.

OK! Done. Time to actually implement it.
I was able to message the server from Chrome, which is progress.
I am going to add endpoints for everything, then wire them into the DB.
A good modular way to make endpoints would be ideal. I think having Node
read a directory full of endpoint handler scripts, then automatically bind to
endpoints would be a cool way to do that. In order to get the scripts working
I will need to make a global app singleton that can be imported and that way
I have access to everything everywhere.
Singleton created :)

I got the thing to register and handle the endpoints properly, now I guess all I
need to do is implement the DB interaction.

I can now list tasks, though there are none now... Time to add adding to the DB.

Ok so It actually DIDNT register the endpoints right, now I need to go with a
single handler method for ALL API calls, and I need to move those to their own
collective endpoint, /api/* for example.

This new method works properly :)

For some reason, I can't get the body of any Request.
Oh, I needed to put `app.use(Express.json());` before anything else, easy.

In order to make sure the data from the client is safe, I think I'll just
set everything but the name, category, and notes fields on the server.
AddTask seems to work.
I also got GetTask to work now!
I will write all the endpoints and only add updates here now.

I got all the way to adding categories to the DB, but now I'm running into a
really weird error in `Express.json()`.

After putting a `console.log();` in some method in the stack trace I found out
that `"test"` apparently isn't valid JSON. Back to work!

I got all endpoints to *work*, but the testing I'm doing in static/main.js shows
that some are working when they should not be. Time to make input validation
more robust. I think I'm going to add a flag to the Endpoint class so I can move
the ID validation to the universal handler.

Now, with all the endpoints pretty much totally done, I'm going to focus on 
getting the app to work in docker now.
After struggling with how to make the containers interface properly I got it all
to work right after running `docker-compose up`.

With the API done, I think I will see what I can do with Angular before this
afternoon.
I integrated the Angular project into the current project, and merged the deps
and all the other stuff by editing the Angular config files. I also just got
a component to display the list of all tasks!
And another to display the content of the tasks.

I also tried to get a way to add and remove tasks, but I couldn't get it to work
before "this afternoon". To be fair, I had never worked with Angular before
an hour and a half ago. So for me, even making the tasks show up in the client
is pretty satisfying.

Before submitting I'll make sure everything still works in docker.