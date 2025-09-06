var fetchedData = [];

$.ajax({
    type: 'get',
    dataType: 'json',
    url: "https://news-task-depi-team4-production.up.railway.app/fixtures",
    headers: {
        'ngrok-skip-browser-warning': "true"
    },
    beforeSend: function() {
        // Show loading states
        $("#finishedMatchesCards").html('<div class="loading"><div class="spinner"></div>Loading recent matches...</div>');
        $("#futureMatchesCards").html('<div class="loading"><div class="spinner"></div>Loading upcoming matches...</div>');
        $("#liveMatchesCards").html('<div class="empty-state"><i class="fas fa-tv"></i><h3>No Live Matches</h3><p>Check back later for live match updates</p></div>');
    },
    success: function (data){
        console.log(data);
        fetchedData = data.result;
        
        // Clear loading states
        $("#finishedMatchesCards").empty();
        $("#liveMatchesCards").empty();
        $("#futureMatchesCards").empty();
        
        let hasFinished = false, hasLive = false, hasFuture = false;
        
        for(var i = data.result.length-1; i >= 0; i--){
            var place; // 0 => prev match , 1 => live , 2 => upcomming
            var main = data.result[i];
            var status, isShown, score;
            if(fetchedData[i].event_status == "Finished"){
                status = "Full-Time";
                isShown = "visible";
                score = fetchedData[i].event_ft_result;
                place = 0;
                hasFinished = true;
            }else if(fetchedData[i].event_status.includes("'")){
                place = 1;
                status = fetchedData[i].event_status;
                isShown = "visible";
                score = fetchedData[i].event_ft_result || "0-0";
                hasLive = true;
            }else{
                isShown = "invisible";
                score = "VS";
                place = 2;
                hasFuture = true;
            }
            var card = `
            <div class="my-5 matchCard">
                <div class="d-flex justify-content-between align-content-center">
                    <p class="mt-2 mb-3 mx-4"><i class="fas fa-calendar-alt me-2"></i>${main.event_date}</p>
                    <p class="mt-2 mb-3 mx-4 ${isShown}">${status}</p>
                </div>
                <div class="row mx-auto justify-content-center">
                    <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                        <img src="${main.home_team_logo}" style="width: 45%">
                        <p class="mt-2 mb-1 text-nowrap fs6 fs-md-4 fs-lg-2 homeTeam">${main.event_home_team}</p>
                    </div>
                    <div class="col-3 d-flex flex-column align-items-center justify-content-center" style="padding: 0;">
                        <p class="h2">${score}</p>
                    </div>
                    <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                        <img src="${main.away_team_logo}" style="width: 45%">
                        <p class="mt-2 mb-1 text-nowrap fs6 fs-md-4 fs-lg-2 awayTeam">${main.event_away_team}</p>
                    </div>
                </div>
            </div>
            `;

            if(place == 0){
                $("#finishedMatchesCards").append(card);
            }else if(place == 1){
                $("#liveMatchesCards").append(card);
            }else if(place == 2){
                $("#futureMatchesCards").append(card);
            }
        }
        
        // Add empty states if no matches
        if(!hasFinished) {
            $("#finishedMatchesCards").html('<div class="empty-state"><i class="fas fa-history"></i><h3>No Recent Matches</h3><p>No completed matches to display</p></div>');
        }
        if(!hasLive) {
            $("#liveMatchesCards").html('<div class="empty-state"><i class="fas fa-tv"></i><h3>No Live Matches</h3><p>Check back later for live match updates</p></div>');
        }
        if(!hasFuture) {
            $("#futureMatchesCards").html('<div class="empty-state"><i class="fas fa-clock"></i><h3>No Upcoming Matches</h3><p>No scheduled matches at the moment</p></div>');
        }
    },
    error: function (xhr, status, error) {
        console.error("⛔ AJAX error:", status, error);
        console.log("Response text:", xhr.responseText);
        
        const errorMessage = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Unable to Load Matches</h3>
                <p>Please check your connection and try again</p>
            </div>
        `;
        
        $("#finishedMatchesCards").html(errorMessage);
        $("#liveMatchesCards").html(errorMessage);
        $("#futureMatchesCards").html(errorMessage);
    }
})

var submitBtn = document.getElementById("ex-submit").disabled = true;

// Enhanced search with debouncing
let searchTimeout;
document.getElementById("ex-input").addEventListener("input", function(event){
    event.preventDefault();
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = document.getElementById("ex-input").value.trim().toLowerCase();
        
        if(query) {
            performSearch(query);
        } else {
            displayAllMatches();
        }
    }, 300); // 300ms debounce
});

function performSearch(query) {
    $("#finishedMatchesCards").empty();
    $("#liveMatchesCards").empty();
    $("#futureMatchesCards").empty();

    let hasFinished = false, hasLive = false, hasFuture = false;

    for(var i = fetchedData.length-1; i >= 0; i--){
        if(query == fetchedData[i].event_home_team.toLowerCase() || query == fetchedData[i].event_away_team.toLowerCase()
        || fetchedData[i].event_home_team.toLowerCase().includes(query) || fetchedData[i].event_away_team.toLowerCase().includes(query)){
            var place;
            var status, isShown, score;
            if(fetchedData[i].event_status == "Finished"){
                status = "Full-Time";
                isShown = "visible";
                score = fetchedData[i].event_ft_result;
                place = 0;
                hasFinished = true;
            }else if(fetchedData[i].event_status.includes("'")){
                place = 1;
                status = fetchedData[i].event_status;
                isShown = "visible";
                score = fetchedData[i].event_ft_result || "0-0";
                hasLive = true;
            }else{
                isShown = "invisible";
                score = "VS";
                place = 2;
                hasFuture = true;
            }
            
            var card = `
            <div class="my-5 matchCard">
                <div class="d-flex justify-content-between align-content-center">
                    <p class="mt-2 mb-3 mx-4"><i class="fas fa-calendar-alt me-2"></i>${fetchedData[i].event_date}</p>
                    <p class="mt-2 mb-3 mx-4 ${isShown}">${status}</p>
                </div>
                <div class="row mx-auto justify-content-center">
                    <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                        <img src="${fetchedData[i].home_team_logo}" style="width: 45%">
                        <p class="mt-2 mb-1 text-nowrap fs6 fs-md-4 fs-lg-2 homeTeam">${fetchedData[i].event_home_team}</p>
                    </div>
                    <div class="col-3 d-flex flex-column align-items-center justify-content-center">
                        <p class="h2">${score}</p>
                    </div>
                    <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                        <img src="${fetchedData[i].away_team_logo}" style="width: 45%">
                        <p class="mt-2 mb-1 text-nowrap fs6 fs-md-4 fs-lg-2 awayTeam">${fetchedData[i].event_away_team}</p>
                    </div>
                </div>
            </div>
            `;
            if(place == 0){
                $("#finishedMatchesCards").append(card);
            }else if(place == 1){
                $("#liveMatchesCards").append(card);
            }else if(place == 2){
                $("#futureMatchesCards").append(card);
            }
        }
    }
    
    // Show "no results" messages
    if(!hasFinished) {
        $("#finishedMatchesCards").html('<div class="empty-state"><i class="fas fa-search"></i><h3>No Results Found</h3><p>No recent matches found for your search</p></div>');
    }
    if(!hasLive) {
        $("#liveMatchesCards").html('<div class="empty-state"><i class="fas fa-search"></i><h3>No Results Found</h3><p>No live matches found for your search</p></div>');
    }
    if(!hasFuture) {
        $("#futureMatchesCards").html('<div class="empty-state"><i class="fas fa-search"></i><h3>No Results Found</h3><p>No upcoming matches found for your search</p></div>');
    }
}

function displayAllMatches() {
    $("#finishedMatchesCards").empty();
    $("#liveMatchesCards").empty();
    $("#futureMatchesCards").empty();
    
    let hasFinished = false, hasLive = false, hasFuture = false;
    
    for(var i = fetchedData.length-1; i >= 0; i--){
        var place;
        var status, isShown, score;
        if(fetchedData[i].event_status == "Finished"){
            status = "Full-Time";
            isShown = "visible";
            score = fetchedData[i].event_ft_result;
            place = 0;
            hasFinished = true;
        }else if(fetchedData[i].event_status.includes("'")){
            place = 1;
            status = fetchedData[i].event_status;
            isShown = "visible";
            score = fetchedData[i].event_ft_result || "0-0";
            hasLive = true;
        }else{
            isShown = "invisible";
            score = "VS";
            place = 2;
            hasFuture = true;
        }

        var card = `
        <div class="my-5 matchCard">
            <div class="d-flex justify-content-between align-content-center">
                <p class="mt-2 mb-3 mx-4"><i class="fas fa-calendar-alt me-2"></i>${fetchedData[i].event_date}</p>
                <p class="mt-2 mb-3 mx-4 ${isShown}">${status}</p>
            </div>
            <div class="row mx-auto justify-content-center">
                <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                    <img src="${fetchedData[i].home_team_logo}" style="width: 45%">
                    <p class="mt-2 mb-1 text-nowrap fs6 fs-md-4 fs-lg-2 homeTeam">${fetchedData[i].event_home_team}</p>
                </div>
                <div class="col-3 d-flex flex-column align-items-center justify-content-center">
                    <p class="h2">${score}</p>
                </div>
                <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                    <img src="${fetchedData[i].away_team_logo}" style="width: 45%">
                    <p class="mt-2 mb-1 text-nowrap fs6 fs-md-4 fs-lg-2 awayTeam">${fetchedData[i].event_away_team}</p>
                </div>
            </div>
        </div>
        `;
        if(place == 0){
            $("#finishedMatchesCards").append(card);
        }else if(place == 1){
            $("#liveMatchesCards").append(card);
        }else if(place == 2){
            $("#futureMatchesCards").append(card);
        }
    }
    
    // Add empty states if no matches
    if(!hasFinished) {
        $("#finishedMatchesCards").html('<div class="empty-state"><i class="fas fa-history"></i><h3>No Recent Matches</h3><p>No completed matches to display</p></div>');
    }
    if(!hasLive) {
        $("#liveMatchesCards").html('<div class="empty-state"><i class="fas fa-tv"></i><h3>No Live Matches</h3><p>Check back later for live match updates</p></div>');
    }
    if(!hasFuture) {
        $("#futureMatchesCards").html('<div class="empty-state"><i class="fas fa-clock"></i><h3>No Upcoming Matches</h3><p>No scheduled matches at the moment</p></div>');
    }
}

// Additional enhancements
$(document).ready(function() {
    // Add hover effects to match cards
    $(document).on('mouseenter', '.matchCard', function() {
        $(this).find('img').addClass('animate');
    });

    $(document).on('mouseleave', '.matchCard', function() {
        $(this).find('img').removeClass('animate');
    });
    
    // Stagger animation for cards when they load
    function addStaggerAnimation() {
        $('.matchCard').each(function(index) {
            $(this).css({
                'animation-delay': (index * 0.1) + 's'
            });
        });
    }
    
    // Call stagger animation after AJAX complete
    $(document).ajaxComplete(function() {
        setTimeout(addStaggerAnimation, 100);
    });
});

// Add keyboard navigation for search
document.getElementById("ex-input").addEventListener("keydown", function(event) {
    if (event.key === 'Escape') {
        this.value = '';
        this.blur();
        displayAllMatches();
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else if (navbar) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }
});