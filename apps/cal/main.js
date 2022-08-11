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
            let kcal = parseInt(this.form_kcal)
            if (kcal > 0 && kcal < 2000) {
                let item = { ts: Date.now(), kcal: kcal, count: Math.ceil(kcal / this.unit) }
                this.items.push(item)
            }
        }
    }
})