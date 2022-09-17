$(function() {
  $("#file").change(function(evt) {
    // load articles
  });
  $("#run").click(function() {
    // clear and generate articles
  });

  var label = new barritas.label(barritas.article("title", "artwork.png", "product", "metadata", "sku"));
  $("#labels").append(label.get());
});
