describe("PlaylistView", function() {
  var view, collection;

  beforeEach(function() {
    collection = new Songs();
    collection.reset([
      {fake: "data", url: "is apparently necessary"}
    ]);

    spyOn(PlaylistView.prototype, 'render').andCallThrough();
    view = new PlaylistView({collection: collection});
    view.render();
  });

  it("should tell the user to click on some songs in the library", function(){
    expect(view.$el.html()).toMatch(/click on something/);
  });

  describe("when a song has 'queuedAt' added or removed", function(){

    it("should be rerendered", function(){
      var oldCallCount = view.render.callCount;
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      expect(view.render.callCount).toEqual(oldCallCount + 1);
    });

    it("should have the updated item in its collection", function(){
      expect(view.queuedSongs.length).toEqual(0);
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      expect(view.queuedSongs[0]).toEqual(song);
    });

    it("should have the updated item in its html", function(){
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      expect(view.$el.html()).not.toMatch(/click on something/);
    });

  });

  describe("when the user clicks the 'remove from playlist' button on a song", function() {
    
    it("should remove the song from the playlist", function() {
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      view.$('span').trigger('click');
      expect(view.queuedSongs[0]).toBeUndefined();  
    });
  });
    
});