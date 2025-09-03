$.ajax({
    type: 'get',
    dataType: 'json',
    url: "http://localhost:5000/fixtures",
    success: function (data){
        // console.log(data);
    },
    error: function (data) {
        console.log("error fetching data")
    }
})