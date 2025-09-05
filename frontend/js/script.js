    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    document.querySelectorAll('.card-img-top').forEach(img => {
      img.addEventListener('load', function() {
        this.style.opacity = '0';
        this.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          this.style.opacity = '1';
        }, 100);
      });
    });

var newsApiKey = '0f192b1e277a6f4bc0718c5913aee831';
var newsLanguage = 'en';

var sportsPage = 1;
var technologyPage = 1;
var entertainmentPage = 1;

var loadingStates = {
    sports: false,
    technology: false,
    entertainment: false
};

function fetchNewsArticles(category, page = 1) {
    if (loadingStates[category]) return;
    
    loadingStates[category] = true;
    var newsApiUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${newsApiKey}&lang=${newsLanguage}&page=${page}`;
    
    const showMoreBtn = $(`#show-more-${category}-btn`);
    if (page > 1 && showMoreBtn.length) {
        showMoreBtn.find('.btn-text').text('Loading...');
        showMoreBtn.find('.btn-spinner').removeClass('d-none');
        showMoreBtn.prop('disabled', true);
    }

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: newsApiUrl,
        success: function(result) {
            console.log(`${category} articles:`, result);
            
            for(var a = 0; a < result.articles.length; a++) {
                var article = `
                <div class="col-md-4 mb-4">
                    <div class="card news-card">
                        <img src="${result.articles[a].image}" class="card-img-top" alt="${category}" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop'">
                        <div class="card-body">
                            <h5 class="card-title">${result.articles[a].title}</h5>
                            <p class="card-text">${result.articles[a].description}</p>
                            <a href="${result.articles[a].url}" target="_blank" class="btn btn-primary">
                                <i class="fas fa-arrow-right me-1"></i>Read more
                            </a>
                        </div>
                    </div>
                </div>`;
                $(`#${category}-show`).append(article);
            }
            
            switch(category) {
                case 'sports':
                    sportsPage = page + 1;
                    break;
                case 'technology':
                    technologyPage = page + 1;
                    break;
                case 'entertainment':
                    entertainmentPage = page + 1;
                    break;
            }
        },
        
        complete: function() {
            loadingStates[category] = false;
            
            if (page > 1 && showMoreBtn.length) {
                showMoreBtn.find('.btn-text').text('Show More News');
                showMoreBtn.find('.btn-spinner').addClass('d-none');
                showMoreBtn.prop('disabled', false);
            }
        }
    });
}

function showMoreSports() {
    fetchNewsArticles('sports', sportsPage);
}

function showMoreTechnology() {
    fetchNewsArticles('technology', technologyPage);
}

function showMoreEntertainment() {
    fetchNewsArticles('entertainment', entertainmentPage);
}

$(document).ready(function() {
    fetchNewsArticles('sports', 1);
    fetchNewsArticles('technology', 1);
    fetchNewsArticles('entertainment', 1);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    document.querySelectorAll('.card-img-top').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
});
