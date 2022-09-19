$(function() {
  var factory = new barritas.factory();
  $("#file").change(function(evt) {
    factory.loadArticles();
  });

  $("#run").click(function() {
    $("#labels").empty();
    factory.getArticles().forEach((article, i) => {
      if (i % 10 === 0) {
        $("#labels").append($("<div></div>").addClass("blank"));
      }
      var label = new barritas.label(article);
      $("#labels").append(label.get());
      JsBarcode("#barcode-".concat(article.sku), article.sku, {
        margin: 0,
        height: 64,
        displayValue: false,
      });
    });
  });

  factory.loadArticles();
  $("#labels").empty();
  factory.getArticles().forEach((article, i) => {
    if (i % 10 === 0) {
      $("#labels").append($("<div></div>").addClass("blank"));
    }
    var label = new barritas.label(article);
    $("#labels").append(label.get());
    JsBarcode("#barcode-".concat(article.sku), article.sku, {
      margin: 0,
      height: 64,
      displayValue: false,
    });
  });
});
