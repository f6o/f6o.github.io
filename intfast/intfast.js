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
        return JSON.stringify(this)      
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
    saveToLocalStorage(lskey) {
        if ( localStorage.getKey(lskey) == null ) {
            localStorage.setKey(lskey, this.toString())
        }
    }
}

function loadFromLocalStorage(lskey) {
    // TODO: multiple constructors are not alloed?
    //var ifls = JSON.parse(localStorage.getKey(lskey))
    //return (new IfLog(ifls.type, ifls.start_time, ifls.end_time))
}

Vue.component('current', {
    data: function () {
        var l = new IfLog('16:8')
        
        // REMOVE: test code
        l.setStartTime(1573198200 * 1000)
        
        // TODO: usable?
        //l.saveToLocalStorage('l0')

        return { iflog: l }
    },
    // TODO: sample components
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
