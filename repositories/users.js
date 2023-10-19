import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT user_id, name, email, password, created_at FROM users";

    return dbPool.query(query);
}

const createData = (name, email, password) => {
    let createdAt = new Date();
    const query = "INSERT INTO users (name, email, password, created_at) VALUE(?,?,?,?)";
    let value = [name, email, password, createdAt];

    return dbPool.query(query, value);
}

const updateData = (id, name, email) => {
    let updatedAt = new Date();

    const query = "UPDATE users SET name = ?, email = ?, updated_at = ? WHERE user_id = ?";
    let value = [name, email, updatedAt, id];

    return dbPool.query(query, value);
}

const deleteData = (id) => {
    const query = 'DELETE from users WHERE user_id = ?';

    return dbPool.query(query, [id]);
}

export {getData, createData, updateData, deleteData}