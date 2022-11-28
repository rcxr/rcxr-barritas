(function(barritas, $, undefined) {
  var toColor = function(color) {
    return color ? color : null;
  };

  barritas.article = function(id, title, url, filename, product, size, sku, color) {
    return {
      id: id,
      title: title,
      url: url,
      filename: filename,
      product: product,
      size: size,
      sku: sku,
      color: toColor(color),
    };
  };
}(window.barritas = window.barritas || {}, jQuery));
