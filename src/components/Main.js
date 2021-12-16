import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Projects from './Projects';

const Main = () => {
  const [projects, setProjects] = React.useState([]);

  useEffect(async() => {
    const { data: projects } = await axios.get('/api');
    setProjects(projects);
  }, [ projects ]); //dependenices

async function deleteProject(projectId) {
  await axios.delete(`/api/${projectId}`);
  setProjects(projects.filter(project => project.id !== projectId))
};

async function addProject() {
  const newProject = {
    project: 'fake data',
    leader: 'fake data'
  };
  await axios.post(`/api`, newProject);
  setProjects([...projects, newProject]);
}

  return (
    <div>
      {
        projects.length && <Projects projects={projects} deleteProject={deleteProject} addProject={addProject}/>
      }
    </div>
  )
};

export default Main;
