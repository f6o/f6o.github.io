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
    computed: {
        uint64array: function () {
            return this.items.map((item) => {
                let arr = new ArrayBuffer(8)
                let view = new DataView(arr)
                let n = BigInt(item.ts)
                view.setBigUint64(0, n)
                view.setUint16(0, item.kcal)
                return '0x' + view.getBigInt64().toString(16)
            })
        },
        uint8array: function() {
            return this.items.flatMap((item) => {
                let arr = new ArrayBuffer(8)
                let view = new DataView(arr)
                let n = BigInt(item.ts)
                view.setBigUint64(0, n)
                view.setUint16(0, item.kcal)
                return [ 0, 1, 2, 3, 4, 5, 6, 7 ].map((i) => view.getUint8(i))
            }).join(' ')
        },
        unpacked: function () {
            // TODO: read from user
            let data = [
                "0x3e801828cd520b6",
                "0x6601828cd55e1f",
                "0x7b01828cd67bc9",
                "0x3e801828ce71021",
                "0x51401828ce71d3a",
                "0x8201828ce72769",
                "0x7b01828ce85709",
                "0x3c01828ee64d73",
                "0x4601828ee65225",
                "0xdc01828ee65d8f",
                "0xc801828ee667ed",
                "0xfa01828ee671d1"
            ]
            return data.map((item) => {
                let n = BigInt(item)
                let arr = new ArrayBuffer(8)
                let view = new DataView(arr)
                view.setBigUint64(0, n)
                let kcal = view.getUint16(0)
                view.setUint16(0, 0)
                let ts = view.getBigUint64(0)

                // TODO: 
                return [kcal, ts.toString()]
            })
        }
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