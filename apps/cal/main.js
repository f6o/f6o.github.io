var vm = new Vue({
    el: '#app',
    data: {
        unit: 100,
        limit: 1600,
        items: [
            { ts: 1660175983818, kcal: 1000 },
            { ts: 1660145983818, kcal: 400 },
            { ts: 1659015983818, kcal: 1200 }
        ]
    },
    computed: {
        inTwentyFourHours: function () {
            const now = Date.now()
            const l = []
            let sum = 0
            // use filter?
            for (let i = 0; i < this.items.length; i++) {
                const diff = now - this.items[i].ts
                if (diff > 0 && diff < 1000 * 60 * 60 * 24) {
                    const item = this.items[i]
                    item.count = item.kcal / this.unit
                    l.push(item)
                    sum += item.kcal
                }
            }
            return { list: l, sum: sum }
        }
    }
})