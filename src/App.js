import React, { useEffect } from "react";

import "./styles.css";

import api from "./services/api";
import { useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: "Repositorio",
      url: "https://github.com/ren-prog/desafio-conceito-nodejs",
      techs: ["nodejs", "ReactJS", "Angular"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id);
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((r) => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((r) => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
