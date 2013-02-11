var LibraryEntryView = Backbone.View.extend({

  tagName: "tr",

  initialize: function(){
    this.model.bind("change", this.render.bind(this));
  },

  events: {
    "click": "addToQueue",
    "change": "render"
  },

  // templates are a nicer way to put js data into html strings
  template: _.template("<td>(<%= artist %>)</td><td><%= title %></td><td><%= playCount %></td>"),

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  },

  // event listener
  addToQueue: function(){
    var newPosition;
    if (this.model.collection){
      newPosition = this.model.collection.queued().length+1;
    } else {
      newPosition = 1;
    }
    this.model.set("queuedAt", newPosition);
  }

});

