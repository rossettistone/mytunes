var PlayerView = Backbone.View.extend({

  initialize: function(){
    // set up an event listener on the songs collection
    this.collection.bind("change:queuedAt", this.handleQueueChange.bind(this));
  },

  // templates are a nicer way to put js data into html strings
  template: _.template('<audio src="<%= url %>" controls autoplay></audio>'),

  render: function(){
    if(this.model){
      this.$el.html(this.template(this.model.attributes));
      this.$('audio').bind('ended', this.removeFromQueue.bind(this));
    }
    return this.$el;
  },

  // event listener
  handleQueueChange: function(){
    if(this.collection.queued() !== []){
      //check to see if the top track in the queue is the same as the playing track
      var mod1 = this.model;
      this.model = this.collection.queued()[0];
      var mod2 = this.model;
      //if the top track the queue is different than the playing track, rerender the player      
      if(mod1 !== mod2) {
        this.render();
      }
    }
  },

  removeFromQueue: function(){
    var newPlayCount = this.model.attributes.playCount + 1;
    this.model.set("playCount", newPlayCount);
    this.model.unset("queuedAt");
  }

});

