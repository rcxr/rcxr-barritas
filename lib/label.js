(function(barritas, $, undefined) {
  barritas.label = function(article) {
    var root = $("<div></div>").addClass("label-card")
      .append($("<div></div>").addClass("label-title text-truncate text-center").text(article.title))
      .append($("<div></div>").addClass("label-artwork").text(article.artwork))
      .append($("<div></div>").addClass("label-product text-truncate").text(article.product))
      .append($("<div></div>").addClass("label-metadata").text(article.metadata))
      .append($("<div></div>").addClass("label-barcode").text(article.sku));

    this.get = function() { return root; };
  };
}(window.barritas = window.barritas || {}, jQuery));
