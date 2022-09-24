$(function() {
  var reset = function() {
    $("#labels").empty();
    $("#file-label").html("Etiquetas...");
    $("#missing-filenames").empty();
    $("#images-container").hide();
  };
  reset();

  var factory = new barritas.factory();
  $("#file").change(function(event) {
    reset();

    var file = event.target.files[0];
    if (!file) return;

    $("#file-label").html(file.name);
    factory.loadArticles(event.target.files[0], function(articles, filenames) {
      articles.forEach((article, i) => {
        if (i % 10 === 0) {
          $("#labels").append($("<div></div>").addClass("blank"));
        }
        var label = new barritas.label(article);
        $("#labels").append(label.get());
        JsBarcode("#barcode-".concat(i), article.sku, {
          margin: 0,
          height: 64,
          displayValue: false,
        });
      });
      $("#missing-filenames").append($("<span></span>").addClass("badge badge-light mr-1 mb-1").text("Imágenes"));
      $("#missing-filenames").append(filenames.map((filename, i) => $("<span id=\"filename-" + i + "\"></span>").addClass("badge badge-secondary mr-1 mb-1").text(filename)));
      $("#images-container").show();
    });
  });
  $("#images").change(function(event) {
    Array.from(event.target.files).forEach(file => {
      var filename = file.name.toLowerCase();
      var i = factory.pop(filename);
      if (i === -1) {
        return;
      }
      $("#filename-".concat(i)).removeClass("badge-secondary").addClass("badge-success");
      factory.getArticles()
        .filter(article => article.filename === filename)
        .forEach(article => {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 180,
            useWebWorker: false,
          };
          imageCompression(file, options)
            .then(function (miniFile) {
              const url = URL.createObjectURL(miniFile);
              $("#img-".concat(article.id)).attr("src", url);
            })
            .catch(function (error) {
              console.error(error.message);
            });
        });
    });
  });
});
