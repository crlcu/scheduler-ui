import base64 from 'base-64'

const ENDPOINT = 'http://localhost:1337/api.tasks-scheduler.com/api';

class AuthAPI {
    async login(id) {
        const url = `${ENDPOINT}/login`;

        var headers = new Headers()
        headers.append('Authorization', 'Basic ' + base64.encode('admin@tasks-scheduler.com:access88'))

        headers.append('Accept', 'application/json')

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        })

        if (!response.ok) {
            throw new Error(`RedditService getDefaultSubreddits failed, HTTP status ${response.status}`)
        }
        
        const data = await response.json()
        
        return data.data
    }
}

export default new AuthAPI()
