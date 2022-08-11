var vm = new Vue({
    el: '#app',
    data: {
        unit: 10,
        items: [
            { ts: 1660175983818, count: 30 },
            { ts: 1660145983818, count: 20 },
            { ts: 1659015983818, count: 10 }
        ]
    },
    computed: {
        inTwentyFourHours: function() {
            const now = Date.now()
            const l = []
            // use filter?
            for ( let i = 0; i < this.items.length; i++ ) {
                const diff = now - this.items[i].ts
                if ( diff > 0 && diff < 1000*60*60*24 ) {
                    l.push(this.items[i])
                }
            }
            return l
        }
    }
})