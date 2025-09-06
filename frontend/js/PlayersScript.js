var avatar = "imgs/football-player.png"

$.ajax({
    type: 'get',
    dataType: 'json',
    url: 'https://d405dcfeb42a.ngrok-free.app/teams',
    headers: {
        'ngrok-skip-browser-warning': "true"
    },
    success: function(data){
        console.log(data);
        for(let i = 0; i <data.result.length; i++){
            for(let k=0; k < data.result[i].players.length; k++){
                var card = `
                <div class="mx-2 my-2 col-sm-12 col-md-6 col-lg-3 pCard" style="background-image: url('imgs/zztexture.jpg');">
                    <div class="firstCont Simg">
                        <img src="${data.result[i].team_logo}" class="mt-2">
                        <p class="club-name">${data.result[i].team_name}</p>
                    </div>
                    <div class="mb-2 d-flex justify-content-center Simg">
                        <img src="${data.result[i].players[k].player_image}"
                             onerror="this.src='${avatar}'; this.onerror=null;"
                             style="width:150px; height:150px; object-fit:cover;">
                    </div>
                    <div class="mb-1 d-flex justify-content-center align-items-center nameBox">
                        <p>${data.result[i].players[k].player_name}</p>
                    </div>
                    <div class="row stats">
                        <div class="col me-1 lastCont">
                            <img src="imgs/football.png">
                            <p>${data.result[i].players[k].player_goals ? data.result[i].players[k].player_goals : "0"}</p>
                        </div>
                        <div class="col me-1 lastCont">
                            <img src="imgs/ycard.png">
                            <p>${data.result[i].players[k].player_yellow_cards ? data.result[i].players[k].player_yellow_cards : "0"}</p>
                        </div>
                        <div class="col me-1 lastCont">
                            <img src="imgs/rcard.png">
                            <p>${data.result[i].players[k].player_red_cards ? data.result[i].players[k].player_red_cards : "0"}</p>
                        </div>
                    </div>
                </div>
                `;

                $('.playerCards').append(card);
            }
        }
    },
    error: function(data){
        console.log("error");
    }
})