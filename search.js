"use strict";



var appendArticleAttributes = function(article) {

  console.log(article);

  var title = document.createElement('div');
  var section = document.createElement('div');
  var byline = document.createElement('div');

  var li = document.createElement('li');

	title.textContent = article.title;
  section.textContent = article.section;
  byline.textContent = article.byline;

  li.appendChild(title);
  li.appendChild(section);
  li.appendChild(byline);

  list.appendChild(li);
}


var search = function () {
  console.log("search clicked");
  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.nytimes.com/svc/topstories/v2/science.json?api-key=Gwxln5M3geWlhR6UE0TY1FUWKSG3wCil');

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var articles = JSON.parse(this.response).results;
      console.log(_.map(articles, appendArticleAttributes));
    }
    else {
     console.log(this);
    }
  };

  request.onerror = function() {
    console.log(this);
  };

  request.send();
}

window.addEventListener('load', function() {
  var searchButton = document.getElementById("searchButton");
  var articleList = document.getElementById("list");
  searchButton.addEventListener('click', search);
})
