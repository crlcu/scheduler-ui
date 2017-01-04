import Api from '../api'

class History extends Api {
    async search(id, args = {}) {
        const url = `${this.baseUrl}/${id}/executions?page=${args.page}`

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
