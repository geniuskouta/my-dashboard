import { createContext, useReducer } from 'react';
import { ProjectModel } from '../../models';

export enum ACTION_TYPE {
    SET_SELECTED_PROJECT_ID = 'SET_SELECTED_PROJECT_ID',
    SET_PROJECTS = 'SET_PROJECTS'
}

export type Action = { type: ACTION_TYPE.SET_SELECTED_PROJECT_ID; payload: number } |
{ type: ACTION_TYPE.SET_PROJECTS; payload: ProjectModel.Project[] };
type ReducerState = {
    projects: ProjectModel.Project[],
    selectedProjectId: number | null
}

const initialState: ReducerState = {
    projects: [],
    selectedProjectId: null
}

function reducer(state: ReducerState, action: Action): ReducerState {
    switch (action.type) {
        case ACTION_TYPE.SET_SELECTED_PROJECT_ID:
            return {
                ...state,
                selectedProjectId: action.payload
            }
        case ACTION_TYPE.SET_PROJECTS:
            console.log(action.payload)
            return {
                ...state,
                projects: action.payload
            }
        default:
            return state
    }
}

export type Selector = {
    getProjects: (state: ReducerState) => ProjectModel.Project[],
    getSelectedProject: (state: ReducerState) => ProjectModel.Project | null
}

const getSelectors = () => {
    const getProjects = (state: ReducerState) => {
        return state.projects
    }

    const getSelectedProject = (state: ReducerState) => {
        return state.projects.find(item => item.id === state.selectedProjectId) || null;
    }

    return {
        getProjects,
        getSelectedProject
    }
}

export const Context = createContext<ReducerState>(initialState);
export const DispatchContext = createContext<React.Dispatch<Action> | null>(null);
export const SelectorContext = createContext<Selector | null>(null);

export function Provider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <SelectorContext.Provider value={getSelectors()}>
                    {children}
                </SelectorContext.Provider>
            </DispatchContext.Provider>
        </Context.Provider>
    );
}
