Vue.component('logs', {
    data: function () {
        return {
            logs: [ 1, 2, 3 ]
        }
    },
    // TODO: sample components
	template: `<div>
<ul v-if="logs.length">
<li v-for="l in logs">{{ l }}</li>
</ul>
<p v-else>No logs</p>
</div>`
})

new Vue({ el: '#components'})
