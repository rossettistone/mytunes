describe("LibraryEntryView", function() {
  var view, model;

  beforeEach(function() {
    model = new Backbone.Model({
      artist: "Fakey McFakerson",
      title: "Never Gonna Mock You Up",
      playCount: 0
    });
    view = new LibraryEntryView({model: model});
    view.render();
  });

  it("should set the song model's 'queuedAt' property when you click on it", function(){
    //put a mock test here
    expect(model.attributes.queuedAt).toBeFalsy();
    console.log(view.$el.children().first().text());
    view.$el.children().first().click();
    expect(model.attributes.queuedAt).toEqual(1);
  });
});