Vue.component('logs', {
    data: function () {
        return {
            logs: [ 1, 2, 3 ]
        }
    },
	template: `<div class="card-deck">
<div class="card" v-for="l in logs">
<div class="card-body">
<a href="#">{{ l }}</a>
</div>
</div>
</div>`
})

new Vue({ el: '#components'})
