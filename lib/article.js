(function(barritas, $, undefined) {
  barritas.article = function(title, artwork, product, metadata, sku) {
    return {
      title: title,
      artwork: artwork,
      product: product,
      metadata: metadata,
      sku: sku,
    };
  };
}(window.barritas = window.barritas || {}, jQuery));
