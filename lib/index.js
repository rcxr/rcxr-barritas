$(function() {
  var factory = new barritas.factory();
  $("#file").change(function(event) {
    var file = event.target.files[0];
    if (file) { factory.loadArticles(event.target.files[0]); }
  });

  $("#run").click(function() {
    $("#labels").empty();
    factory.getArticles().forEach((article, i) => {
      if (i % 10 === 0) {
        $("#labels").append($("<div></div>").addClass("blank"));
      }
      var label = new barritas.label(i, article);
      $("#labels").append(label.get());
      JsBarcode("#barcode-".concat(i), article.sku, {
        margin: 0,
        height: 64,
        displayValue: false,
      });
    });
  });
});
