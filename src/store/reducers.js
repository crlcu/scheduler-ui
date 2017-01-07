import auth from './auth/reducer'
import tasks from './tasks/reducer'
import tasks_history from './tasks/history/reducer'
import roles from './roles/reducer'
import validation from './validation/reducer'

const lastAction = (state = null, action) => {
    return action
}

export {
    auth,
    tasks,
    tasks_history,
    roles,
    validation,
    lastAction
}
