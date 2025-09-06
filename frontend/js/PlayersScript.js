var avatar = "imgs/football-player.png";
var allPlayersData = [];
var allTeamsData = [];

var totalPlayers = 0;
var totalGoals = 0;
var totalYellowCards = 0;
var totalRedCards = 0;

$(document).ready(function() {
    initializeEventListeners();
    loadPlayerData();
});

function initializeEventListeners() {
    let searchTimeout;
    $("#playerSearch").on("input", function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterPlayers();
        }, 300);
    });

    $("#teamFilter").on("change", function() {
        filterPlayers();
    });

    $("#sort").on("change", function() {
        sortPlayers(this.value);
    });

    $("#clearSearch").on("click", function() {
        $('#sort').val('featured')
        $("#playerSearch").val('');
        $("#teamFilter").val('');
        $('#sort').val('featured');
        filterPlayers();
    });

    $(document).on("keydown", function(e) {
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            $("#playerSearch").focus();
        }
        if (e.key === 'Escape') {
            $("#playerSearch").val('').trigger('input');
            $("#teamFilter").val('');
        }
    });
}

function searchPlayers(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return allPlayersData;
    }

    const term = searchTerm.toLowerCase().trim();
    
    return allPlayersData.filter(player => {
        const nameMatch = player.player_name.toLowerCase().includes(term);
        
        const teamMatch = player.team_name.toLowerCase().includes(term);
        
        const goalsMatch = (player.player_goals || '0').toString().includes(term);
        const yellowMatch = (player.player_yellow_cards || '0').toString().includes(term);
        const redMatch = (player.player_red_cards || '0').toString().includes(term);
        
        return nameMatch || teamMatch || goalsMatch || yellowMatch || redMatch;
    });
}

const sortFields = {
    "featured": null,
    "goals": "player_goals",
    "yellow-cards": "player_yellow_cards",
    "red-cards": "player_red_cards",
    "name": "player_name"
};

function sortPlayers(sortBy) {
    let sortedPlayers = [...allPlayersData];
    const field = sortFields[sortBy];
    
    if (field === "player_name") {
        sortedPlayers.sort((a, b) => {
            const nameA = (a[field] || '').toLowerCase();
            const nameB = (b[field] || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (field) {
        sortedPlayers.sort((a, b) => {
            const valueA = parseInt(a[field] || 0);
            const valueB = parseInt(b[field] || 0);
            return valueB - valueA;
        });
    }
    
    const searchTerm = $("#playerSearch").val();
    const selectedTeam = $("#teamFilter").val();
    
    if (searchTerm || selectedTeam) {
        sortedPlayers = applyFilters(sortedPlayers, searchTerm, selectedTeam);
    }
    
    displayPlayers(sortedPlayers);
}

function applyFilters(players, searchTerm, selectedTeam) {
    let filteredPlayers = players;
    
    if (searchTerm && searchTerm.trim() !== '') {
        filteredPlayers = searchPlayers(players, searchTerm);
    }
    
    if (selectedTeam && selectedTeam !== '') {
        filteredPlayers = filteredPlayers.filter(player => 
            player.team_name === selectedTeam
        );
    }
    
    return filteredPlayers;
}

function loadPlayerData() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://d405dcfeb42a.ngrok-free.app/teams',
        headers: {
            'ngrok-skip-browser-warning': "true"
        },
        beforeSend: function() {
            showLoadingState();
        },
        success: function(data) {
            console.log("✅ Data loaded successfully:", data);
            processPlayerData(data.result);
            hideLoadingState();
            showContent();
        },
        error: function(xhr, status, error) {
            console.error("❌ AJAX error:", status, error);
            console.log("Response text:", xhr.responseText);
            showErrorState();
        },
        timeout: 15000
    });
}

function processPlayerData(teamsData) {
    allTeamsData = teamsData;
    allPlayersData = [];
    
    totalPlayers = 0;
    totalGoals = 0;
    totalYellowCards = 0;
    totalRedCards = 0;

    teamsData.forEach(team => {
        if (team.players && team.players.length > 0) {
            team.players.forEach(player => {
               
                const playerWithTeam = {
                    ...player,
                    team_name: team.team_name,
                    team_logo: team.team_logo,
                    team_id: team.team_key
                };
                
                allPlayersData.push(playerWithTeam);
                
                totalPlayers++;
                totalGoals += parseInt(player.player_goals || 0);
                totalYellowCards += parseInt(player.player_yellow_cards || 0);
                totalRedCards += parseInt(player.player_red_cards || 0);
            });
        }
    });

    populateTeamFilter();
    
    updateStatsOverview();
    
    displayPlayers(allPlayersData);
}

function populateTeamFilter() {
    const teamSelect = $("#teamFilter");
    teamSelect.empty().append('<option value="">All Teams</option>');
    
    allTeamsData.forEach(team => {
        teamSelect.append(`<option value="${team.team_name}">${team.team_name}</option>`);
    });
}

function updateStatsOverview() {
    animateCounter("#totalPlayers", totalPlayers);
    animateCounter("#totalGoals", totalGoals);
    animateCounter("#totalYellow", totalYellowCards);
    animateCounter("#totalRed", totalRedCards);
}

function animateCounter(selector, targetValue) {
    const element = $(selector);
    const startValue = 0;
    const duration = 1500;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.text(Math.floor(currentValue));
    }, 16);
}

function filterPlayers() {
    const searchTerm = $("#playerSearch").val().toLowerCase().trim();
    const selectedTeam = $("#teamFilter").val();
    
    let filteredPlayers = allPlayersData;
    
    if (searchTerm) {
        filteredPlayers = searchPlayers(filteredPlayers, searchTerm);
    }
    
    if (selectedTeam) {
        filteredPlayers = filteredPlayers.filter(player => 
            player.team_name === selectedTeam
        );
    }
    
    displayPlayers(filteredPlayers);
    
    updateSearchResultsCount(filteredPlayers.length);
    
    if (filteredPlayers.length === 0) {
        showNoResults();
    } else {
        hideNoResults();
    }
}

function updateSearchResultsCount(count) {
    const searchTerm = $("#playerSearch").val().trim();
    const selectedTeam = $("#teamFilter").val();
    
    let resultText = "";
    
    if (searchTerm || selectedTeam) {
        resultText = `Found ${count} player${count !== 1 ? 's' : ''}`;
        if (searchTerm) {
            resultText += ` matching "${searchTerm}"`;
        }
        if (selectedTeam) {
            resultText += ` in ${selectedTeam}`;
        }
    } else {
        resultText = `Showing all ${count} players`;
    }
    
    $("#searchResults").text(resultText);
}

function searchPlayers(players, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return players;
    }

    const term = searchTerm.toLowerCase().trim();
    
    return players.filter(player => {
        const nameMatch = player.player_name.toLowerCase().includes(term);
        
        const teamMatch = player.team_name.toLowerCase().includes(term);
        
        const goals = player.player_goals || 0;
        const yellowCards = player.player_yellow_cards || 0;
        const redCards = player.player_red_cards || 0;
        
        const goalsMatch = goals.toString().includes(term);
        const yellowMatch = yellowCards.toString().includes(term);
        const redMatch = redCards.toString().includes(term);
        
        let rangeMatch = false;
        if (term.includes('-') && term.includes('goal')) {
            const rangeRegex = /(\d+)-(\d+)\s*goal/;
            const match = term.match(rangeRegex);
            if (match) {
                const min = parseInt(match[1]);
                const max = parseInt(match[2]);
                rangeMatch = goals >= min && goals <= max;
            }
        }
        
        return nameMatch || teamMatch || goalsMatch || yellowMatch || redMatch || rangeMatch;
    });
}

function displayPlayers(players) {
    const container = $("#playerCardsContainer");
    container.empty();
    
    if (players.length === 0) {
        showNoResults();
        return;
    }
    
    hideNoResults();
    
    players.forEach((player, index) => {
        const card = createPlayerCard(player, index);
        container.append(card);
    });
    
    setTimeout(() => {
        addStaggerAnimation();
    }, 100);
}

function createPlayerCard(player, index) {
    const goals = player.player_goals || 0;
    const yellowCards = player.player_yellow_cards || 0;
    const redCards = player.player_red_cards || 0;
    
    return `
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="pCard h-100" style="animation-delay: ${index * 0.1}s;" data-player-name="${player.player_name.toLowerCase()}" data-team-name="${player.team_name.toLowerCase()}">
                <!-- Team Header -->
                <div class="firstCont">
                    <img src="${player.team_logo}" 
                         alt="${player.team_name}" 
                         onerror="this.src='imgs/default-team.png'; this.onerror=null;"
                         loading="lazy">
                    <p class="club-name">${player.team_name}</p>
                </div>
                
                <!-- Player Image -->
                <div class="Simg">
                    <img src="${player.player_image}" 
                         alt="${player.player_name}"
                         onerror="this.src='${avatar}'; this.onerror=null;"
                         loading="lazy">
                </div>
                
                <!-- Player Name -->
                <div class="nameBox">
                    <p title="${player.player_name}">${player.player_name}</p>
                </div>
                
                <!-- Statistics -->
                <div class="row stats">
                    <div class="col lastCont" title="Goals scored">
                        <img src="imgs/football.png" alt="Goals" loading="lazy">
                        <p>${goals}</p>
                    </div>
                    <div class="col lastCont" title="Yellow cards">
                        <img src="imgs/ycard.png" alt="Yellow Cards" loading="lazy">
                        <p>${yellowCards}</p>
                    </div>
                    <div class="col lastCont" title="Red cards">
                        <img src="imgs/rcard.png" alt="Red Cards" loading="lazy">
                        <p>${redCards}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function addStaggerAnimation() {
    $('.pCard').each(function(index) {
        $(this).css({
            'animation-delay': (index * 0.05) + 's'
        }).addClass('fade-in-animation');
    });
}

function showLoadingState() {
    $("#loadingState").show();
    $("#statsOverview").hide();
    $("#searchSection").hide();
    $("#playerCardsContainer").hide();
    $("#noResults").hide();
}

function hideLoadingState() {
    $("#loadingState").hide();
}

function showContent() {
    $("#statsOverview").fadeIn(600);
    setTimeout(() => {
        $("#searchSection").fadeIn(400);
    }, 200);
    setTimeout(() => {
        $("#playerCardsContainer").fadeIn(400);
    }, 400);
}

function showErrorState() {
    hideLoadingState();
    const errorHtml = `
        <div class="text-center py-5">
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle fa-4x mb-3" style="opacity: 0.5; color: rgba(255, 119, 198, 0.7);"></i>
                <h3 class="text-white mb-3">Unable to Load Player Data</h3>
                <p class="text-white-50 mb-4">Please check your connection and try again</p>
                <button class="btn btn-outline-light" onclick="location.reload()">
                    <i class="fas fa-refresh me-2"></i>Retry
                </button>
            </div>
        </div>
    `;
    $("#playerCardsContainer").html(errorHtml);
}

function showNoResults() {
    $("#noResults").fadeIn(300);
}

function hideNoResults() {
    $("#noResults").hide();
}

$(window).on('scroll', function() {
    const navbar = $('.navbar');
    const scrollTop = $(window).scrollTop();
    
    if (scrollTop > 100) {
        navbar.css({
            'background': 'rgba(255, 255, 255, 0.98)',
            'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.15)'
        });
    } else {
        navbar.css({
            'background': 'rgba(255, 255, 255, 0.95)',
            'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        });
    }
});

function observeCardAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    $('.pCard').each(function() {
        observer.observe(this);
    });
}

function formatPlayerName(name) {
    return name.length > 20 ? name.substring(0, 20) + '...' : name;
}

function getPlayerRating(goals, yellowCards, redCards) {
    let rating = goals * 2 - yellowCards * 0.5 - redCards * 2;
    return Math.max(0, Math.min(10, rating)).toFixed(1);
}

$(document).on('mouseenter', '.pCard', function() {
    $(this).find('.stats .col').addClass('stats-hover');
});

$(document).on('mouseleave', '.pCard', function() {
    $(this).find('.stats .col').removeClass('stats-hover');
});

$(document).on('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const cards = $('.pCard:visible');
        const focused = $('.pCard:focus');
        
        if (cards.length > 0) {
            e.preventDefault();
            let index = focused.length ? cards.index(focused) : -1;
            
            if (e.key === 'ArrowDown') {
                index = (index + 1) % cards.length;
            } else {
                index = index <= 0 ? cards.length - 1 : index - 1;
            }
            
            cards.eq(index).focus();
        }
    }
});

function logPerformanceMetrics() {
    if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        console.log('🚀 Page Load Performance:', {
            'DOM Content Loaded': navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            'Page Load': navigation.loadEventEnd - navigation.loadEventStart,
            'Total Players': totalPlayers
        });
    }
}

$(window).on('load', function() {
    setTimeout(logPerformanceMetrics, 1000);
});

window.PlayerStats = {
    loadData: loadPlayerData,
    filterPlayers: filterPlayers,
    searchPlayers: searchPlayers,
    sortPlayers: sortPlayers,
    refreshData: function() {
        allPlayersData = [];
        loadPlayerData();
    }
};
