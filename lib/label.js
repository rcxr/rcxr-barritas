(function(barritas, $, undefined) {
  var toIcon = function(type, color) {
    switch(type) {
      case barritas.articleType.SHIRT:
        return $("<svg height=\"58\" width=\"58\"><circle cx=\"28\" cy=\"28\" r=\"27\" stroke=\"" + color + "\" stroke-width=\"1\" fill=\"" + color + "\" /></svg>");
      case barritas.articleType.UNDEFINED:
      default:
        return "";
    }
  }

  barritas.label = function(article) {
    var root = $("<div></div>").addClass("label-card")
      .append($("<div></div>").addClass("label-product text-center text-truncate").text(article.product))
      .append($("<div></div>").addClass("label-artwork").css("background-image", "url(img/rcxr/" + article.design + ".png)"))
      .append($("<div></div>").addClass("label-title text-center text-truncate").text(article.title))
      .append($("<div></div>").addClass("d-flex justify-content-center")
        .append(toIcon(article.type, article.color))
        .append($("<div></div>").addClass("label-price text-center text-truncate").text("$".concat(article.price))))
      .append($("<div></div>").addClass("text-center").append($("<svg id=\"" + "barcode-".concat(article.sku) + "\"></svg>")));

    this.get = function() { return root; };
  };
}(window.barritas = window.barritas || {}, jQuery));
