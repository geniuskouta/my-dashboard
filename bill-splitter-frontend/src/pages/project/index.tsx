import { useContext } from 'react';
import { ProjectModel } from '../../models';
import { ProjectAdd } from '../../components/Project';
import { ProjectProvider } from '../../providers';
import { Paper, Typography } from '@mui/material';
import ProjectList from '../../components/Project/ProjectList';

function ProjectPage() {
  const reducerState = useContext(ProjectProvider.Context);
  const dispatch = useContext(ProjectProvider.DispatchContext) as React.Dispatch<ProjectProvider.Action>;
  const { getProjects } = useContext(ProjectProvider.SelectorContext) as ProjectProvider.Selector;
  const projects = getProjects(reducerState)

  const handleAddProject = (newProject: ProjectModel.Project) => {
    dispatch({
      type: ProjectProvider.ACTION_TYPE.SET_PROJECTS,
      payload: [...projects, newProject]
    })
    dispatch({
      type: ProjectProvider.ACTION_TYPE.SET_SELECTED_PROJECT_ID,
      payload: newProject.id
    })
  }

  const handleSelectProject = (projectId: number) => {
    dispatch({
      type: ProjectProvider.ACTION_TYPE.SET_SELECTED_PROJECT_ID,
      payload: projectId
    })
  }

  return (
    <Paper elevation={0} sx={{
      paddingY: 3,
      paddingX: 2,
      '& > :not(style):nth-child(n+2)': { marginTop: 4 },
    }}>
      <Typography variant="h1" sx={{ fontSize: 24 }}>Billing projects</Typography>
      <ProjectAdd projects={projects} handleAddProject={handleAddProject} />
      <ProjectList rows={projects} handleSelectProject={handleSelectProject} />
    </Paper>
  )
}

export default ProjectPage
