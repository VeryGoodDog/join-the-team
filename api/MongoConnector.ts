import { Task, Category } from "./Tasks";
import { MongoClient, Collection, ObjectID } from "mongodb";

export class MongoDriver {
  tasks: Collection<Task>;
  categories: Collection<Category>;

  constructor(private client: MongoClient) {
    this.tasks = client.db('task-service').collection('tasks');
    this.categories = client.db('task-service').collection('categories');
  }

  /**
   * Destroy connection to the database
   *
   * @memberof MongoDriver
   */
  disconnect() {
    this.client.close();
  }

  /**
   * Inserts a given task into the database
   *
   * @param {Task} task to be inserted into the database
   * @returns
   * @memberof MongoDriver
   */
  async createTask(task: Task) {
    const res = await this.tasks.insertOne(task);
    return res.insertedId;
  }

  /**
   * Retrieves a task from the database
   *
   * @param {ObjectID} id of the task to retrieve
   * @returns
   * @memberof MongoDriver
   */
  async readTask(id: ObjectID) {
    const task = await this.tasks.findOne({ _id: id });
    return task;
  }

  /**
   * Modifies a task in the database by overwriting it with the given task
   *
   * @param {Task} task the task to modify, must contain an id representing a task that currently exists in the database
   * @memberof MongoDriver
   */
  async updateTask(task: Task) {
    await this.tasks.updateOne({ _id: task._id }, { $set: { ...task }});
  }

  /**
   * Lists all tasks in the database
   *
   * @returns
   * @memberof MongoDriver
   */
  async listTasks() {
    const tasks = await this.tasks.find({}).toArray();
    return tasks;
  }

  /**
   * Deletes a task
   *
   * @param {ObjectID} id of the task to delete
   * @memberof MongoDriver
   */
  async deleteTask(id: ObjectID) {
    await this.tasks.deleteOne({ _id: id });
  }

  /**
   * Crates a new category in the database
   *
   * @param {string} name the name of the new category
   * @returns
   * @memberof MongoDriver
   */
  async createCategory(name: string) {
    const response = await this.categories.insertOne({ name, tasks: [] });
    return response.insertedId;
  }

  /**
   * Lists all categories in the database
   *
   * @returns
   * @memberof MongoDriver
   */
  async listCategories() {
    const categories = await this.categories.find({}).toArray();
    return categories;
  }

  /**
   * Retrieves a category from the database
   *
   * @param {ObjectID} id of the category to retrieve
   * @returns
   * @memberof MongoDriver
   */
  async readCategory(id: ObjectID) {
    return await this.categories.findOne({ _id: id});
  }

  /**
   * Modifies a category's name in the database
   *
   * @param {ObjectID} categoryId the id of the category in the database
   * @param {string} name the new name of the category
   * @memberof MongoDriver
   */
  async updateCategory(categoryId: ObjectID, name: string) {
    await this.categories.updateOne({ _id: categoryId}, {
      $set: { name }      
    });
  }

  /**
   * Adds a list of existing tasks to an existing category
   *
   * @param {ObjectID} categoryId the id of the category in which to add the task
   * @param {ObjectID[]} taskList a list of task ids to add to the category
   * @memberof MongoDriver
   */
  async addTasksToCategory(categoryId: ObjectID, taskList: ObjectID[]) {
    await this.categories.updateOne({ _id: categoryId }, { $push: { tasks: { $each: taskList }  } });
  }

  /**
   * Removes a list of existing tasks from an existing category
   *
   * @param {ObjectID} categoryId the id of the category from which to remove the tasks
   * @param {ObjectID[]} taskList a list of task ids to add to the category
   * @memberof MongoDriver
   */
  async removeTasksFromCategory(categoryId: ObjectID, taskList: ObjectID[]) {
    await this.categories.updateOne({ _id: categoryId }, { $pull: { $each: { tasks: taskList }  }  });
  }

  /**
   * Deletes a category from the database
   *
   * @param {ObjectID} id of the category to delete
   * @memberof MongoDriver
   */
  async deleteCategory(id: ObjectID) {
    await this.categories.deleteOne({ _id: id });
  }
}