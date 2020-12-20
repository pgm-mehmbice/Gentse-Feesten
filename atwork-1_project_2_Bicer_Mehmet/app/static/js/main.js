const EVENTS_API = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
const NEWS_API = 'https://www.pgm.gent/data/gentsefeesten/news.json';
const EVENTS1_API = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
const CATEGORIES_API = 'https://www.pgm.gent/data/gentsefeesten/categories.json';

(() => {
  const app = {
    initialize() {
      console.log("1. Application started!");
      this.cacheElements();
      this.buildUI();
      this.MenuClickEventListener();
    },

    cacheElements() {
      console.log("2. Chache all exisiting DOM elements!");
      this.$hamburgermenu = document.querySelector('.hamburgermenu');
      this.$hambutten = document.querySelector('.hambutten');
      this.$events = document.querySelector('.events');
      this.$news = document.querySelector('.news');
      this.$events1 = document.querySelector('.events1');
      this.$categories = document.querySelector('.categories');
      // this.$ = document.querySelector('.');
    },

    buildUI() {
      console.log("3. Build the user interface!");
      this.$hamburgermenu.innerHTML = this.createHTMLForNavbar();
      this.$events.innerHTML = this.getDataFromEventsAPI();
      this.$news.innerHTML = this.getDataFromNewsAPI();
      this.$events1.innerHTML = this.getDataFromEvents1API();
      this.$categories.innerHTML = this.getDataFromCategoriesAPI();
      // this.$.innerHTML = this.createHTMLFor();
    },

    createHTMLForNavbar() {
      console.log("creating HTML for navbar");
      let tempStr = '';

      tempStr +=`<ul>`
      hamburgermenu.forEach(hammenu => {
        tempStr += `
        <li class="nav"><a href="${hammenu.link}">${hammenu.name}</a></li>`
      });
      tempStr += `</ul>`
      return tempStr;
    },

    MenuClickEventListener() {
      console.log('Menu Click Event Listener');
      this.$hambutten.addEventListener('click', (evt) => {
        if (this.$hamburgermenu.classList.contains('open')) {
          this.$hamburgermenu.classList.remove('open');
        } else {
          this.$hamburgermenu.classList.add('open');
        } 
        
      })
    },

    getDataFromEventsAPI() {
      fetch(EVENTS_API, {})
          .then(response => response.json())
          .then(json => this.updateEvents(json))
          .catch(error => console.log(error));
    },

    updateEvents(data) {
      this.$events.innerHTML = data.slice(0,3).map((ev) => {

        return `
          <article class="article-event">
            <a href="${ev.url}">
              <div class="foto-datum">
                <img src="${ev.image !== null ? ev.image.thumb : 'static/media/Rectangle_101.png'}">
                <p>${ev.day} ${ev.day_of_week} ${ev.start}</p>
              </div>
              <div class="description-plaats">
                <h3>${ev.description}</h3>
                <p>${ev.location}</p>
              </div>
            </a>
          </article>
          `;
      }).join('');
    },

    getDataFromNewsAPI() {
      fetch(NEWS_API, {})
      .then(response => response.json())
      .then(json => this.updateNews(json))
      .catch(error => console.log(error));
    },

    updateNews(data) {
      this.$news.innerHTML = data.slice(0,3).map((news) => {

        return `
        <article class="article-new">
          <a href="${news.url}">
            <div class="foto-datum-1">
              <img src="${news.picture !== null ? news.picture.medium : 'static/media/Rectangle_101.png'}">
              <p>${news.publishedAt}</p>
            </div>
            <div class="title-synopsis">
              <h3>${news.title}</h3>
              <p>${news.synopsis}</p>
              <img src= "static/media/vector.png">
            </div>
          </a>
        </article>`

      }).join('');
    },

    createdPublishedAt() {
      console.log("created At And Modified At");
    
      const publishedAt = new Date(news.publishedAt);

      return `
      Created at: ${publishedAt}`
    },

    getDataFromEvents1API() {
      fetch(EVENTS1_API, {})
          .then(response => response.json())
          .then(json => this.updateEvents1(json))
          .catch(error => console.log(error));
    },

    updateEvents1(data) {
      this.$events1.innerHTML = data.slice(1,4).map((ev1) => {

        return `
          <article class="article-event1">
            <a href="${ev1.url}">
              <div class="foto-datum1">
                <img src="${ev1.image !== null ? ev1.image.thumb : 'static/media/Rectangle_101.png'}">
                <p> ${ev1.start}</p>
              </div>
              <div class="description-plaats1">
                <h3>${ev1.description}</h3>
                <p>${ev1.location}</p>
              </div>
            </a>
          </article>
          `;
      }).join('');
    },

    getDataFromCategoriesAPI() {
      fetch(CATEGORIES_API, {})
          .then(response => response.json())
          .then(json => this.updateCategories(json))
          .catch(error => console.log(error));
    },

    updateCategories(data) {
      this.$categories.innerHTML = data.map((cate) => {

        return `
          <article class="article-categories">
            <p><a href="#">${cate}</a></p>
          </article>
          `;
      }).join('');
    },

}
  app.initialize();
})();