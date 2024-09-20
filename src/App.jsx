import React, { useState, useEffect } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: Date.now(),
      username,
      email,
      nationality,
      languages,
      description,
    };

    setUsers([...users, newUser]);

    setUsername("");
    setEmail("");
    setNationality("");
    setLanguages([]);
    setDescription("");
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Foydalanuvchi qo'shish</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
        >
          <option value="Uzbek">O'zbek</option>
          <option value="Russian">Rus</option>
          <option value="American">Amerikalik</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button type="submit">Qo'shish</button>
      </form>

      <h2>Foydalanuvchilar ro'yxati:</h2>
      <ul>
        {users.map((user) => (
          <div key={user.id} className="card">
            <h1>{user.username}</h1>
            <p>{user.email}</p>
            <h4>{user.nationality}</h4>

            <p>{user.description}</p>
            <button onClick={() => handleDelete(user.id)}>O'chirish</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
