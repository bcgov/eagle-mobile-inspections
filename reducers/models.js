import * as Action from '../js/actionTypes'

const DEFAULT_MODELS = {
  users: [],
  user: {},

  projects: [],
  project: {},

  inspections: [],
  inspection: {},
  inspectionUpdatedFlag: false,
  inspectionEditingFlag: false,

  elements: [],
  element: {},

  currentInspection: {},

  items: [],

  refresh: false
}

export default function modelsReducer(state = DEFAULT_MODELS, action) {
  switch (action.type) {
  case Action.REFRESH_AUTH:
    return { ...state, refresh: action.refresh }

  case Action.UPDATE_PROJECT:
    return { ...state, project: action.project }

  case Action.UPDATE_PROJECTS:
    return { ...state, projects: action.projects }

  case Action.GET_LOCAL_INSPECTIONS:
    return { ...state, inspections: action.inspections }

  case Action.CURRENT_INSPECTION:
    return { ...state, currentInspection: action.currentInspection }

  case Action.UPDATE_ITEMS:
    return { ...state, items: action.items }

  case Action.UPDATE_INSPECTION:
    return { ...state, inspection: action.inspection }

  case Action.UPDATE_INSPECTIONS:
    return { ...state, inspections: action.inspections }

  case Action.DELETE_INSPECTION:
    return { ...state, inspection: action.inspection }

  case Action.DELETE_ELEMENT:
    return { ...state, element: action.element }

  default:
    return state
  }
}
