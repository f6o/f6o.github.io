var vm = new Vue({
    el: '#app',
    data: {
        unit: 100,
        limit: 1600,
        form_kcal: 0,
        items: []
    },
    methods: {
        add: function () {
            let kcal = document.getElementById('kcal').valueAsNumber
            console.log(this)
            if ( kcal > 0 ) {
                let item = { ts: Date.now(), kcal: kcal }
                console.log(item)
                this.items.push(item)
            }
        }
    },
    computed: {
        inTwentyFourHours: function () {
            const now = Date.now()
            // use filter?
            const l = this.items.filter((item) => {
                const diff = now - item.ts
                return diff > 0 && diff < 1000 * 60 * 60 * 24
            }).map((item)=>{
                item.count = Math.ceil(item.kcal / this.unit)
                return item
            })
            const sum = l.reduce((s, item) => {
                return item.kcal + s
            }, 0)
            console.log(l)
            console.log(sum)
            return { list: l, sum: sum }
        }
    }
})