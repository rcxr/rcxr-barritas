(function(barritas, $, undefined) {
  barritas.articleType = Object.freeze({
    UNDEFINED: 0,
    SHIRT: 1,
  });

  var toType = function(type) {
    if (!type) return barritas.articleType.UNDEFINED;
    if (type.toLowerCase() === "shirt") return barritas.articleType.SHIRT;

    console.error("Invalid article type (" + type + ")");
    return barritas.articleType.UNDEFINED;
  };

  var toColor = function(color) {
    return color ? color : "black";
  };

  barritas.article = function(design, title, product, price, sku, type, color) {
    return {
      design: design,
      title: title,
      product: product,
      price: price,
      sku: sku,
      type: toType(type),
      color: toColor(color),
    };
  };
}(window.barritas = window.barritas || {}, jQuery));
