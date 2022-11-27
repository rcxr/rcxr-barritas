// TODO: add documentation.
(function(barritas, $, undefined) {
  barritas.factory = function() {
    var articles = [];
    var filenames = [];

    this.loadArticles = function(file, onComplete) {
      Papa.parse(file, {
        complete: csv => {
          articles =  csv.data.slice(1).map((row, i) => barritas.article(
            /* id= */ i,
            /* title= */ row[0],
            /* filename= */ row[1].toLowerCase(),
            /* product= */ row[2],
            /* price= */ row[3],
            /* sku= */ row[4],
            /* type= */ row[5].toLowerCase(),
            /* color= */ row[6],
          ));
          filenames = [...new Set(articles.map(article => article.filename))];
          onComplete(articles, filenames);
        },
      });
    };

    this.pop = function(filename) {
      var i = filenames.indexOf(filename);
      if (i === -1) {
        return -1;
      }
      filenames[i] = "";
      return i;
    }

    this.getArticles = function() { return articles; };
  };
}(window.barritas = window.barritas || {}, jQuery));
