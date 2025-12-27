import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todos.db");

export const initDB = () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					"CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL);",
					[],
					() => resolve(),
					(_tx, err) => {
						reject(err);
						return false;
					}
				);
			},
			(err) => reject(err)
		);
	});
};

export const addTodoOffline = (title) => {
	return new Promise((resolve, reject) => {
		const id = Date.now();
		db.transaction(
			(tx) => {
				tx.executeSql(
					"INSERT INTO todos (id, title) VALUES (?, ?);",
					[id, title],
					(_tx, result) => resolve({ id, rows: result.rows }),
					(_tx, err) => false
				);
			},
			(err) => reject(err)
		);
	});
};

export const updateTodoOffline = (id, title) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					"UPDATE todos SET title = ? WHERE id = ?;",
					[title, id],
					(_tx, result) => resolve(result),
					(_tx, err) => false
				);
			},
			(err) => reject(err)
		);
	});
};

export const loadTodos = () => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					"SELECT * FROM todos;",
					[],
					(_tx, result) => {
						const items = [];
						for (let i = 0; i < result.rows.length; i++) {
							items.push(result.rows.item(i));
						}
						resolve(items);
					},
					(_tx, err) => false
				);
			},
			(err) => reject(err)
		);
	});
};