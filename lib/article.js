(function(barritas, $, undefined) {
  barritas.article = function(design, title, product, price, sku) {
    return {
      design: design,
      title: title,
      product: product,
      price: price,
      sku: sku,
    };
  };
}(window.barritas = window.barritas || {}, jQuery));
