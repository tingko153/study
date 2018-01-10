import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    message: 'hello vue!!!',
    message2: 'hellow world!!'
  }
});

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: new Date()
  }
});

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
});

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'javascript 배우기'},
      { text: 'vue 배우기' },
      { text: '무언가 만들자' }
    ]
  },
  methods: {
    addList: function() {
      this.todos.push({ text: 'test1' })
    }
  }
});

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'hello vue'
  }
});