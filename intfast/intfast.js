Vue.component('logs', {
    data: function () {
        return {
            logs: [ 1, 2, 3 ]
        }
    },
    template: `<div class="container-fluid"><div class="row"><div class="col-sm-12"><div class="card-deck">
<div class="card" v-for="l in logs">
<div class="card-body">
<a href="#">{{ l }}</a>
</div>
</div>
</div></div></div></div>`
})

Vue.component('control',{
    template : `<header class="navbar">
      <div id="controls">
        <button>click here</button>
      </div>
    </header>`
})

new Vue({ el: '#app'})
