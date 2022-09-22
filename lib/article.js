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

  barritas.article = function(id, filename, title, product, price, sku, type, color) {
    return {
      id: id,
      filename: filename,
      title: title,
      product: product,
      price: price,
      sku: sku,
      type: toType(type),
      color: toColor(color),
    };
  };
}(window.barritas = window.barritas || {}, jQuery));
