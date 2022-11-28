(function(barritas, $, undefined) {
  var invertColor = function(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    // https://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? "#000000" : "#FFFFFF";
  };

  // TODO: deprecate articleType.
  var toIcon = function(type, color) {
    switch(type) {
      case barritas.articleType.SHIRT:
        return $(`
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 56 56" width="56" height="56">
          <path fill="` + color + `" stroke="#555555" stroke-width="2" d="M28,55c-4.6,0-9.2-0.3-15.5-3.9c-0.6-0.4-1-1.1-1-1.8L12.4,25c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.3,0
          	c-1.6-0.3-3.1-0.8-4.5-1.6c-1.6-0.9-3-2.2-4.3-3.7c-0.7-0.9-1.3-1.8-1.8-2.8c-0.3-0.6-0.3-1.3,0-1.9l1.1-2c4.3-8.2,5.3-8.8,5.9-9.1
          	c0.9-0.5,2.4-0.7,5.3-0.9c1.7-0.1,3.5-0.3,4.8-0.6l0.9-0.8c0.4-0.3,0.8-0.4,1.2-0.4c0.5,0,1.1,0.2,1.5,0.6c0,0,0.7,0.8,1.9,1.6
          	c1,0.7,2.6,1.5,4.3,1.5c2,0,3.9-1.1,5.7-3.1C34.3,1.2,34.9,1,35.4,1c0.4,0,0.9,0.1,1.2,0.4l1.2,0.9c1.3,0.2,3,0.4,4.6,0.5
          	c2.9,0.2,4.4,0.4,5.3,0.9c0.6,0.3,1.5,0.9,5.7,8.9c0.1,0.1,0.1,0.1,0.1,0.2l1.1,2.1c0.3,0.6,0.3,1.3,0,1.9c-0.5,1-1.1,2-1.8,2.8
          	c-1.2,1.6-2.7,2.8-4.3,3.7c-1.4,0.8-2.9,1.3-4.5,1.6c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0l0.9,24.2c0,0.7-0.4,1.4-1,1.8
          	C37.2,54.7,32.6,55,28,55z"/>
        `);
      case barritas.articleType.UNDEFINED:
      default:
        return "";
    }
  };

  // Generates the filename to a random temporary image.
  var getTempImage = function() {
    return "img/sin-foto-0" + (Math.floor(Math.random() * 10)) + ".png";
  };

  barritas.label = function(article) {
    // Product.
    var product = $("<div></div>").addClass("new-label-product text-center").text(article.product);
    // Product details.
    var details = $("<div></div>").addClass("new-label-details-container d-flex")
      .append($("<div></div>").addClass("new-label-details-tab text-center").text("252pc"))
      .append($("<div></div>").addClass("new-label-details-gap-container").append($("<div></div>").addClass("new-label-details-gap-begin").html("&nbsp;")));
    // Add color details if present.
    if (article.color !== null) {
      var color = $("<div></div>").addClass("new-label-details-color")
        .html("&nbsp;")
        .css("background-color", article.color)
        .css("color", invertColor(article.color));
      details
        .append($("<div></div>").addClass("new-label-details-gap-container").append($("<div></div>").addClass("new-label-details-gap-end").html("&nbsp;")))
        .append($("<div></div>").addClass("new-label-details-tab text-center").append(color));
    }
    // Image.
    var image = $("<div></div>").addClass("new-label-image-container")
      .append($("<div id=\"" + "img-".concat(article.id) + "\"></div>").addClass("new-label-image").css("background-image", "url(\"" + getTempImage() + "\")"));
    // Artwork title.
    var title = $("<div></div>").addClass("new-label-title text-center").text(article.title);
    // Barcode.
    var barcode = $("<div></div>").addClass("new-label-barcode text-center")
      .append($("<svg id=\"" + "barcode-".concat(article.id) + "\"></svg>"));

    // Label container.
    var root = $("<div></div>").addClass("new-label-container")
      .append(product)
      .append(details)
      .append(image)
      .append(title)
      .append(barcode);

    this.get = function() { return root; };
  };

  // TODO: remove.
  barritas.oldLabel = function(article) {
    var root = $("<div></div>").addClass("label-card")
      .append($("<div></div>").addClass("d-flex justify-content-center")
        .append(toIcon(article.type, article.color))
        .append($("<div></div>").addClass("label-price text-center text-truncate").text("$".concat(article.price))));

    this.get = function() { return root; };
  };
}(window.barritas = window.barritas || {}, jQuery));
