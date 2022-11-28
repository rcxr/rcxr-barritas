(function(barritas, $, undefined) {
  barritas.factory = function() {
    var articles = [];
    var filenames = [];

    // Loads the articles from file, and executes the callback on the resulting
    // list of articles and missing image filenames.
    this.loadArticles = function(file, onComplete) {
      Papa.parse(file, {
        complete: csv => {
          // Remove the first row as it contains the headers. Then process each
          // row to produce an article.
          articles =  csv.data.slice(1).map((row, i) => barritas.article(
            /* id= */ i,
            /* title= */ row[0],
            /* url= */ row[1],
            /* filename= */ row[2].toLowerCase(),
            /* product= */ row[3],
            /* size= */ row[4],
            /* sku= */ row[5],
            /* color= */ row[6],
          ));
          filenames = [...new Set(articles.map(article => article.filename))];
          onComplete(articles, filenames);
        },
      });
    };

    // Removes a filename from the set and returns its original position.
    this.pop = function(filename) {
      var i = filenames.indexOf(filename);
      if (i === -1) {
        return -1;
      }
      filenames[i] = "";
      return i;
    };

    this.getArticles = function() { return articles; };
  };
}(window.barritas = window.barritas || {}, jQuery));
