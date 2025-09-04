var fetchedData = [];

$.ajax({
    type: 'get',
    dataType: 'json',
    url: "http://localhost:5000/fixtures",
    success: function (data){
        console.log(data);
        // var flag = false
        fetchedData = data.result;
        for(var i = fetchedData.length - 1; i >= 0; i--){
            fixtureCards(fetchedData)
        }
    },
    error: function (data) {
        console.log("error fetching data")
    }
})

document.getElementById("ex-input").addEventListener("input", function(event){
    event.preventDefault();
    const query = document.getElementById("ex-input").value.trim().toLowerCase();
    
    if(query) {
        $("#matchesCards").empty();
        for(var i = fetchedData.length - 1; i >= 0; i--){
            if(query == fetchedData[i].event_home_team.toLowerCase() || query == fetchedData[i].event_away_team.toLowerCase()
            || fetchedData[i].event_home_team.toLowerCase().includes(query) || fetchedData[i].event_away_team.toLowerCase().includes(query)){
                var status, isShown, score;
                if(fetchedData[i].event_status == "Finished"){
                    status = "Full-Time";
                    isShown = "visible";
                    score = fetchedData[i].event_ft_result;
                }else{
                    isShown = "invisible";
                    score = "VS";
                }
                
                var card = `
                <div class="my-5 matchCard">
                    <div class="d-flex justify-content-between align-content-center">
                        <p class="mt-2 mb-3 mx-4">${fetchedData[i].event_date}</p>
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
                $("#matchesCards").append(card);
            }else{
                for (let i = fetchedData.length - 1; i >= 0; i--) {
                    const element = array[i];
                }
            }
        }
    }
})

function fixtureCards(data, i){
    var main = data.result[i];
    var status, isShown, score;
    if(main.event_status == "Finished"){
        status = "Full-Time";
        isShown = "visible";
        score = main.event_ft_result;
    }else{
        isShown = "invisible";
        score = "VS";
    }
    var card = `
    <div class="my-5 matchCard">
        <div class="d-flex justify-content-between align-content-center">
            <p class="mt-2 mb-3 mx-4">${main.event_date}</p>
            <p class="mt-2 mb-3 mx-4 ${isShown}">${status}</p>
        </div>
        <div class="row mx-auto justify-content-center">
            <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                <img src="${main.home_team_logo}" style="width: 45%">
                <p class="mt-2 mb-1 text-nowrap fs6 fs-md-4 fs-lg-2 homeTeam">${main.event_home_team}</p>
            </div>
            <div class="col-3 d-flex flex-column align-items-center justify-content-center">
                <p class="h2">${score}</p>
            </div>
            <div class="col-4 d-flex flex-column align-items-center justify-content-between">
                <img src="${main.away_team_logo}" style="width: 45%">
                <p class="mt-2 mb-1 text-nowrap fs6 fs-md-4 fs-lg-2 awayTeam">${main.event_away_team}</p>
            </div>
        </div>
    </div>
    `;

    $("#matchesCards").append(card);
}