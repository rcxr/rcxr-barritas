(function(barritas, $, undefined) {
  var toColor = function(color) {
    return color ? color : null;
  };

  barritas.article = function(id, title, filename, product, sku, color) {
    return {
      id: id,
      title: title,
      filename: filename,
      product: product,
      sku: sku,
      color: toColor(color),
    };
  };
}(window.barritas = window.barritas || {}, jQuery));
