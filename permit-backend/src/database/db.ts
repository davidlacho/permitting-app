import Datastore from 'nedb';
import path from 'path';

const database = new Datastore({
  filename: path.join(__dirname, '../../data/database.db'),
  autoload: true,
});

export default database;
