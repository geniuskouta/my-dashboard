import { useContext, useEffect } from 'react';
import { SplitBillProject } from '../../components/SplitBill';
import { ProjectModel } from '../../models';
import { ProjectProvider } from '../../providers';
import { Link as UiLink, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

function SplitBillPage() {
  const reducerState = useContext(ProjectProvider.Context);
  const dispatch = useContext(ProjectProvider.DispatchContext) as React.Dispatch<ProjectProvider.Action>;
  const { getSelectedProject, getProjects } = useContext(ProjectProvider.SelectorContext) as ProjectProvider.Selector;
  const currentProject = getSelectedProject(reducerState)
  const projects = getProjects(reducerState)
  const navigate = useNavigate()

  const handleSetCurrentProject = (updatedProject: ProjectModel.Project) => {
    const updatedProjects = projects.map(project => {
      if (project.id === updatedProject.id) {
        return updatedProject
      }
      return project
    })

    dispatch({
      type: ProjectProvider.ACTION_TYPE.SET_PROJECTS,
      payload: updatedProjects
    })
  }

  useEffect(() => {
    if(currentProject === null) {
      navigate('/')
    }
  }, [currentProject])

  if(currentProject === null) {
    return null
  }

  return (
    <Paper elevation={0} sx={{
      paddingY: 3,
      paddingX: 2,
      '& > :not(style):nth-child(n+2)': { marginTop: 4 },
    }}>
      <Link to="/">
        <UiLink>
          Back to project list
        </UiLink>
      </Link>
      <SplitBillProject project={currentProject} handleSetCurrentProject={handleSetCurrentProject} />
    </Paper>

  )
}

export default SplitBillPage
