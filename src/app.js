const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const project = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(project);
  return response.status(201).json(project);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const projectIndex = repositories.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found" });
  }

  const project = repositories[projectIndex];

  project.title = title;
  project.url = url;
  project.techs = techs;

  repositories[projectIndex] = project;

  return response.status(201).json(project);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found" });
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).json({});
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found" });
  }

  const project = repositories[projectIndex];

  project.likes++;

  repositories[projectIndex] = project;

  return response.status(201).json(project);
});

module.exports = app;
