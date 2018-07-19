//On click to do the scrape
$('#scrapeNow').click(function() {    
    console.log("Success!")
    $.getJSON("/scrape", function(data){
        console.log(data)
        console.log('success')
    })
})