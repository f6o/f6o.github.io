const KEY = 'caldata'
let savedItems = localStorage.getItem(KEY) || ''


var vm = new Vue({
    el: '#app',
    data: {
        unit: 100,
        limit: 1600,
        form_kcal: 0,
        items: savedItems ? JSON.parse(savedItems) : []
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


setInterval(() => {
    localStorage.setItem(KEY, JSON.stringify(vm.items))   
}, 5000);