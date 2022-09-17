$(function() {
  var factory = new barritas.factory();
  $("#file").change(function(evt) {
    factory.loadArticles();
  });

  $("#run").click(function() {
    factory.getArticles().forEach(article => {
      var label = new barritas.label(article);
      $("#labels").append(label.get());
    });
  });

  factory.loadArticles();
  factory.getArticles().forEach(article => {
    var label = new barritas.label(article);
    $("#labels").append(label.get());
  });
});
