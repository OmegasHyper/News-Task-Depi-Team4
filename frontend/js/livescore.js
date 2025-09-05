$.ajax({
    url: "https://v3.football.api-sports.io/fixtures?live=all",
    method: "GET",
    headers: {
        "x-apisports-key": "f529c6493e351c10587c21a20765547c"
    },
    success: function(data) {
        console.log(data);
        if (data.response && data.response.length > 0) {
            
            for(let i = 0; i < 3; i++) {
                const match = data.response[i];
                
                var content = `
                <div class="card">
                    <div class="card-body">
                        <div class="match-item">
                            <div class="match-layout">
                                <div class="team-section team-away">
                                    <img src="${match.teams.away.logo}" class="team-logo" alt="${match.teams.away.name}">
                                    <span class="team-name">${match.teams.away.name}</span>
                                </div>
                                
                                <div class="match-score">${match.goals.away} - ${match.goals.home}</div>
                                
                                <div class="team-section team-home" style="display:flex;align-items:center;gap:12px;flex-direction:row-reverse;">
                                    <span class="team-name">${match.teams.home.name}</span>
                                    <img src="${match.teams.home.logo}" class="team-logo" alt="${match.teams.home.name}">
                                </div>
                            </div>
                        </div>
                        <div class="match-info">
                            <i class="fas fa-clock"></i>
                            <span class="live-badge">Live</span>
                            <span class="match-time">${match.fixture.status.elapsed || 'Live'}'</span>
                            <span class="league-name">${match.league.name}</span>
                        </div>
                    </div>
                </div>
                `;
                $('#live-matches').append(content);
            }
        } else {
            $('#live-matches').html('<p>No live matches found</p>');
        }
    }
});


/*

// Inside your AJAX success function:
for(let i = 0; i < data.response.length; i++) {
    const match = data.response[i];
    
    var content = `
        <div class="card">
            <div class="card-body">
                <div class="match-item">
                    <div class="match-layout">
                        <div class="team-section team-away">
                            <img src="${match.teams.away.logo}" class="team-logo" alt="${match.teams.away.name}">
                            <span class="team-name">${match.teams.away.name}</span>
                        </div>
                        
                        <div class="match-score">${match.goals.away} - ${match.goals.home}</div>
                        
                        <div class="team-section team-home">
                            <span class="team-name">${match.teams.home.name}</span>
                            <img src="${match.teams.home.logo}" class="team-logo" alt="${match.teams.home.name}">
                        </div>
                    </div>
                </div>
                <div class="match-info">
                    <i class="fas fa-clock"></i>
                    <span class="live-badge">Live</span>
                    <span class="match-time">${match.fixture.status.elapsed || 'Live'}'</span>
                    <span class="league-name">${match.league.name}</span>
                </div>
            </div>
        </div>
    `;
    
    $('#live-matches').append(content);
}

*/