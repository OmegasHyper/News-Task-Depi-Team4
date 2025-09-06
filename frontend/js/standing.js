$.ajax({
    type: 'get',
    dataType: 'json',
    url: "https://news-task-depi-team4-production.up.railway.app/standings",
    headers: {
        'ngrok-skip-browser-warning': "true"
    },
    success: function (data){
        console.log(data);
        for(let i=0;i<data.result.total.length;i++){
           let team = data.result.total[i];

            var content = `
                <tr class="card-team-2-row">
                    <td class="ct2-rank">${team.standing_place}</td>

                    <td class="ct2-team">
                        <img src="${team.team_logo}" alt="${team.standing_team}" class="ct2-logo">
                        <span class="ct2-name">${team.standing_team}</span>
                    </td>

                    <td class="ct2-played">${team.standing_P}</td>

                    <td class="ct2-points">${team.standing_PTS}</td>

                    <td class="ct2-record">${team.standing_W}-${team.standing_D}-${team.standing_L}</td>

                    <td class="ct2-gf">${team.standing_F}</td>

                    <td class="ct2-ga">${team.standing_A}</td>

                    <td class="ct2-gd">${team.standing_GD}</td>
                </tr>
            `;
            $('#tb1').append(content);
        }
    },
    error: function (xhr, status, error) {
        console.error("AJAX error:", status, error);
        console.log("Response text:", xhr.responseText);
    }
})