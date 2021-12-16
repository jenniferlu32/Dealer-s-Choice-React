import React from 'react';
import Todo from './Todo';
import axios from 'axios';

const Projects = ({ projects, deleteProject, addProject }) => {

  return (
    <div>
        {
          projects.map(project => {
            return ([
            <h3 key={project.id}>Project Name: {project.project}</h3>,
            <p key={project.id+project.leader}>Project Leader: {project.leader}</p>,
            <Todo key={project.id+'tasks'} tasks={project.todos}/>,
            <button key={project.id+'newProject'} onClick={() => addProject()}>Add Project</button>,
            <button key={project.id+'deleteProject'} onClick={() => deleteProject(project.id)}>Delete Project</button>
            ])
          })
        }
    </div>
  )
}

export default Projects;
