class IfLog {
    constructor(type) {
        this.type = type
        this.start_time = Date.now()
        this.end_time = -1
    }
    setStartTime(t) {
        this.start_time = t
    }
    finish() {
        this.end_time = Date.now()
    }
    toString() {
//        return JSON.stringify(this)
        let r = this.remainings()
        return `fasting since ${ new Date(this.start_time) } and ${ r / 1000 / 60 / 60 } hours to go`
    }
    diff() {
        return this.start_time - Date.now()
    }
    remainings() {
        switch( this.type ) {
        case '16:8':
            return this.diff() + 16 * 60 * 60 * 1000
            break;
        default:
            break;
        }
    }
}

Vue.component('current', {
    data: function () {
        var l = new IfLog('16:8')
        l.setStartTime(1573198200 * 1000)
        return { iflog: l }
    },
	template: `<div>
<p>fasting since {{ new Date(iflog.start_time) }}</p>
<p>rems: {{ iflog.remainings() / 1000 / 60 }} mins</p>
<p>now {{ Date.now() }} </p>
</div>

`
})

Vue.component('history', {
	template: `<p>history: todo</p>`
})

new Vue({ el: '#components'})
