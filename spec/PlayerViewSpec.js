describe("PlayerView", function() {
  var view, collection;

  beforeEach(function() {
    collection = new Songs();
    collection.reset([
  {
    url: "mp3s/0.mp3",
    title: "4 Page Letter",
    artist: "Aaliyah"
  },
  {
    url: "mp3s/11d A Resolution.mp3",
    title: "We Need A Resolution",
    artist: "Aaliyah"
  },
  {
    url: "mp3s/05 Hoe.mp3",
    title: "Hot Like Fire",
    artist: "Aaliyah"
  },
  {
    url: "mp3s/04.mp3",
    title: "One In A Million",
    artist: "Aaliyah"
  }
]);
    view = new PlayerView({collection: collection});
  });

  it("should change when the first song is queued", function(){
    expect(view.model).toBeUndefined();
    var song = collection.models[0];
    song.set("queuedAt", new Date());
    expect(view.model).toEqual(song);
  });

  describe("what happens when the song ends", function(){
    it("should remove the old song from the playlist", function(){
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      view.removeFromQueue();
      expect(view.model).toBeUndefined();

    });
    it("should get the next song in the playlist", function(){
      var song = collection.models[0];
      song.set("queuedAt", new Date());
      expect(view.model).toEqual(song);
      console.log(collection.models);
      var song2 = collection.models[1];
      song2.set("queuedAt", new Date());
      view.removeFromQueue();
      expect(view.model).toEqual(song2);
      view.removeFromQueue();
      expect(view.model).toBeUndefined();

    });
  });
});