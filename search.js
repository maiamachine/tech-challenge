"use strict";



var appendArticleAttributes = function(article) {

  var title = document.createElement('div');
  var section = document.createElement('div');
  var byline = document.createElement('div');
  var link = document.createElement('a');



  var li = document.createElement('li');

	title.textContent = "Title: " + article.title;
  section.textContent = "Section: " + article.section;
  byline.textContent = "Byline: " + article.byline;
  link.textContent = "Link";
  link.href = article.url;

  li.appendChild(title);
  li.appendChild(section);
  li.appendChild(byline);
  li.appendChild(link);

  list.appendChild(li);
}

var makeRequest = function() {

  var searchTerm = document.getElementById("searchBox").value;

  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.nytimes.com/svc/topstories/v2/science.json?api-key=Gwxln5M3geWlhR6UE0TY1FUWKSG3wCil');

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var results = JSON.parse(this.response).results;
      var titleMatch = _.filter(results, _.conforms({ 'title': function(title) { return title.toUpperCase().includes(searchTerm.toUpperCase()); } }));
      var bylineMatch = _.filter(results, _.conforms({ 'byline': function(byline) { return byline.toUpperCase().includes(searchTerm.toUpperCase()); } }));
      var sectionMatch = _.filter(results, _.conforms({ 'section': function(section) { return section.toUpperCase().includes(searchTerm.toUpperCase()); } }));

      list.innerHTML = '';
      _.map(_.concat(titleMatch, bylineMatch, sectionMatch), appendArticleAttributes);
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
  searchButton.onclick = makeRequest.bind(this);

    document.getElementById('searchForm').addEventListener('submit', function(e) {
      makeRequest();
      e.preventDefault();
    }, false);
})
