$("#ex-search").on("mouseenter", function(){
    $("i img").fadeOut(100, function(){
        $("#search-img").attr("src", "imgs/magnifying-glass-white.png");
    }).fadeIn(100);
})

$("#ex-search").on("mouseleave", function(){
    $("i img").fadeOut(100, function(){
        $("#search-img").attr("src", "imgs/mag-purple-removebg-preview.png");
    }).fadeIn(100);
})

