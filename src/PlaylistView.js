var PlaylistView = Backbone.View.extend({

  tagName: "table",

  queuedSongs: [],

  initialize: function(){
    var that = this;
    this.collection.bind("change:queuedAt", this.handleQueueChange.bind(this));
    this.$el.sortable({
      connectWith: this.$el,
      cursor: 'pointer',
      update: function(event, ui) {
        // console.log($('.ui-sortable div').index(ui.item));
        var newQ = _.map($('.ui-sortable > div > span'), function(val){
          return parseInt($(val)[0].attributes['data-songid'].value);
        } );
        for (var i in newQ){
          for (var j in that.queuedSongs){
            if (newQ[i] === that.queuedSongs[j].attributes.queuedAt){
              that.queuedSongs[j].attributes.queuedAt = i;
              that.queuedSongs = that.collection.queued();
              console.log(i);
              console.log('this is j: '+ j);
            }
          }

        }

        console.log(that.queuedSongs);
      }
    });
  },

  render: function(){
    if (this.model){
      this.$el.html('');
      for ( var i in this.queuedSongs){
        this.$el.append("<div><span class='btn btn-danger' data-songid='"+i+"''>X</span>" + this.queuedSongs[i].attributes['title']+ "</div>");
        this.$('[data-songid='+i+']').bind('click', this.removeSong.bind(this));
      }
    }else{
      this.$el.html('You must click on something !');
    }
    return this.$el;
  },

  handleQueueChange: function(){
    this.model = this.collection.queued()[0];
    this.queuedSongs = this.collection.queued();
    this.render();
  },

  removeSong: function(ev){
    var num = $(ev.target).data('songid');
    this.queuedSongs[num].set("queuedAt", undefined);

  }


});

