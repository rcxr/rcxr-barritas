$(function() {
  var reset = function() {
    $("#file-label").html("Elige el archivo CSV con tus etiquetas&hellip;");
    $("#images-label").html("Elige las imágenes necesarias&hellip;");
    $("#images-picker").hide();
    $("#missing-filenames").empty();
    $("#labels").empty();
  };

  reset();
  var factory = new barritas.factory();

  // Read from csv file the label definitions with temporary images, and list
  // missing image filenames.
  $("#file").change(function(event) {
    // Any previous state is invalid. Reset components.
    reset();

    // Verify valid file was selected.
    var file = event.target.files[0];
    if (!file) return;

    // Update file input.
    $("#file-label").html(file.name);

    // Load articles from file. Process resulting files and missing image
    // filenames usign a callback.
    factory.loadArticles(event.target.files[0],
      // Bind resulting articles to labels. List missing filenames.
      function(articles, filenames) {
        var sheet;
        articles.forEach((article, i) => {
          if (i % 10 === 0) {
            sheet = $("<div></div>").addClass("sheet d-flex flex-wrap");
            $("#labels").append(sheet);
          }

          // Bind an article to a label component.
          var label = new barritas.label(article);
          // Add label to the current sheet container.
          sheet.append(label.get());
          // Invoke qr code generation.
          new QRCode("qr-".concat(i), {
            text: article.url,
            width: 68,
            height: 68,
          });
          // Invoke barcode generation.
          JsBarcode("#barcode-".concat(i), article.sku, {
            format: "MSI",
            margin: 0,
            width: 3,
            height: 60,
            displayValue: false,
          });
        });

        // List missing image filenames.
        $("#missing-filenames").append($("<span></span>").addClass("badge badge-light mr-1 mb-1").text("Imágenes"));
        $("#missing-filenames").append(filenames.map((filename, i) => $("<span id=\"filename-" + i + "\"></span>").addClass("badge badge-secondary mr-1 mb-1").text(filename)));
        $("#images-picker").show();
      });
  });

  // Upon selecting image files, compress them and load the compressed versions.
  $("#images").change(function(event) {
    Array.from(event.target.files).forEach(file => {
      // Normalize filename.
      var filename = file.name.toLowerCase();
      // Verify if image has been previously processed.
      var i = factory.pop(filename);
      if (i === -1) {
        return;
      }

      // Update the filename badge to show this image is now available.
      $("#filename-".concat(i)).removeClass("badge-secondary").addClass("badge-success");

      // Update the image component of each article using it.
      factory.getArticles()
        .filter(article => article.filename === filename)
        .forEach(article => {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 180,
            useWebWorker: false,
          };
          // Compress the image.
          imageCompression(file, options)
            .then(function (miniFile) {
              // Load compressed image into the respective component.
              const url = URL.createObjectURL(miniFile);
              $("#img-".concat(article.id)).css("background-image", "url(\"" + url + "\")");
            })
            .catch(function (error) {
              console.error(error.message);
            });
        });
    });
  });
});
