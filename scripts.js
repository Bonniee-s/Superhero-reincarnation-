const superhero = {};
//key: 10209411890770751
superhero.accessToken = "10209411890770751";
const $picture = $(`.picture`)
const $fullNameOfHero = $('.fullNameOfHero')

superhero.getRandomHeroID = () => {
    return Math.floor((Math.random() * 731) + 1)
};
//console.log(superhero.getRandomHeroID);

superhero.init = () => {
    console.log("initializing superhero!")
    superhero.getInfo();
    superhero.getStats();
}

superhero.getInfo = () => {
    const picsResponse = $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: `https://superheroapi.com/api/${superhero.accessToken}/${superhero.getRandomHeroID()}/image`,
            params: {
                method: "GET",
                dataType: "json"
            }
        }
    })
    return picsResponse;
}

superhero.statsArray = []

superhero.getStats = () => {
    const statsResponse = $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: `https://superheroapi.com/api/${superhero.accessToken}/${superhero.getRandomHeroID()}`,
            params: {
                method: "GET",
                dataType: "json"
            }
        }
    }).then(result => {
        superhero.statsArray = []
        superhero.statsArray.push(result.powerstats)
        superhero.statsArray = superhero.statsArray[0]
    }) 
}

superhero.statsFillerListener = () => {
    $('.statsList').html(""); 
    Object.keys(superhero.statsArray).forEach(statName => {
        $('.statsList').append(`<li>${statName}: ${superhero.statsArray[statName]}</li>`)
    })
    
}

//when promise is completed, it will return 
superhero.buttonListener = $('button').on('click', () => {
    let promise = superhero.getInfo();
    superhero.getStats()
    promise.then(data => {
        if(data.url && data.name) {
            $picture.attr('src', data.url)
            $fullNameOfHero.text(data.name)
        } else {
            console.log("error")
        }      
    });   
    superhero.statsFillerListener()
})


//document ready 
$(() => {
    console.log('Document is ready!')
    //superhero.getHero();
    superhero.init();
})

