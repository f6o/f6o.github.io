class IfLog {
    constructor(type) {
        this.type = type
        this.start_time = Date.now()
        this.end_time = -1
    }
    serialize() {
        return JSON.stringify(this)
    }
}

var l0 = new IfLog('16:8')

Vue.component('current', {
	template: `<p>current: {{l0}}</p>`
})

Vue.component('history', {
	template: `<p>history: todo</p>`
	})

new Vue({ el: '#components'})
