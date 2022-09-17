(function(barritas, $, undefined) {
  barritas.label = function(article) {
    var root = $("<div></div>").addClass("label-card")
      .append($("<div></div>").addClass("label-title text-truncate text-center").text("title title title title title title "))
      .append($("<div></div>").addClass("label-artwork").text("artwork"))
      .append($("<div></div>").addClass("label-product text-truncate").text("product"))
      .append($("<div></div>").addClass("label-metadata").text("metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata metadata "))
      .append($("<div></div>").addClass("label-barcode").text("barcode"));

    this.get = function() { return root; };
  };
}(window.barritas = window.barritas || {}, jQuery));
