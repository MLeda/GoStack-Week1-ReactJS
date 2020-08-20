import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(Response => {
      setRepositories(Response.data);
    })

  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "url": "https://github.com/MLeda?tab=repositories",
      "title": `Novo Respositório ${Date.now()}`,
      "techs": [
        "Node",
        "Express",
        "TypeScript"
      ]
    })

    const repository = response.data;
    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    const repository = repositories[repositoryIndex];
    repositories.splice(repositoryIndex, 1)

    const response = await api.delete('repositories/' + repository.id);
    if (response.status = '204')
      setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository =>
            <>
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
      </button>
              </li>
            </>
          )

        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
