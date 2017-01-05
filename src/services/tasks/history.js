import queryString from 'query-string'
import Api from '../api'

class History extends Api {
    async search(id, args = {}) {
        args.limit = 4;

        const url = this.baseUrl + '/' + id + '/executions?' + queryString.stringify(args)

        const response = await fetch(url, {
            method:     'GET',
            headers:    this.getHeaders()
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }
        
        return await response.json()
    }
}

export default new History('http://localhost:1337/dev.machine:8000/api/tasks', {
    username: 'admin@tasks-scheduler.com',
    password: 'access88'
})
