import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Method to add content to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction(['jate'], 'readwrite');
    const store = tx.objectStore('jate');
    await store.put({ content });
    await tx.done;
    console.log('Content is added to the database');
  } catch (e) {
    console.error('putDb not implemented');
  }
};

// TODO: Add logic for a method that gets all the content from the database
// Method to get all content from the database
export const getDb = async () => {
  // try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    // const cursor = await store.openCursor;
    // const contentArray = [];
    // cursor?.forEach((entry) => {
    //   contentArray.push(entry.value.content);
    // });
    const request = store.getAll();
    const  result = await request;
    return result.value;
  //   return contentArray;
  // } catch (e) {
  //   console.error('getDb not implemented');
  //   return [];
  // }
};

initdb();