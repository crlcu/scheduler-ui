import auth from './auth/reducer'
import groups from './groups/reducer'
import tasks from './tasks/reducer'
import tasks_history from './tasks/history/reducer'
import roles from './roles/reducer'
import validation from './validation/reducer'

const lastAction = (state = null, action) => {
    return action
}

export {
    auth,
    groups,
    tasks,
    tasks_history,
    roles,
    validation,
    lastAction
}
