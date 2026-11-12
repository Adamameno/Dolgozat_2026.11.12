import "better-sqlite3"
import Database from "better-sqlite3"

const db = new Database("./Database/equipments.db");

export function getById(id) {
    return db.prepare("SELECT * FROM equipments WHERE id = ?").get(id);
}

export function getByCategory(category) {
    return db.prepare("SELECT * FROM equipments WHERE category = ?").all(category);
}

export function put(id, name, category, brand, price, quantity) {
    return db.prepare("UPDATE equipments SET name = ?, category = ?, brand = ?, price = ?, quantity = ? WHERE id = ?").run(name, category, brand, price, quantity, id);
}

export function deleteById(id) {
    return db.prepare("DELETE from equipments WHERE id = ?").run(id);
}