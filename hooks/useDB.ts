import * as SQLite from 'expo-sqlite';
import { useCallback, useEffect } from 'react';

export default function useDB() {
  const db = SQLite.openDatabase('shop.db');

  const initializeDB = useCallback(async () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
      )
    `;

    await db.execAsync([{ sql, args: [] }], false);
    console.log('DB Initialized');
  }, []);

  useEffect(() => {
    initializeDB();
  }, [initializeDB]);
}
