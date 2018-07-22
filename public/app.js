$('.save').each(function() {   // If an article is currently saved, disable the save button
    if ($(this).attr('data-state') == 'true') {
        $(this).addClass('disabled').text('SAVED!');
    }
});

$('#scrapeNow').click(function() {   // Scrape new articles top menu link
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(data) {
        console.log('Scraping has been completed!');
        location.reload();
    })
})

$('#emptyDatabase').click(function() {   // Empty database top menu link
    $.ajax({
        method: "GET", 
        url: "/empty"
    }).then(function(data) {
        console.log('Database has been emptied!');
        location.reload();
    })
})

$(".save").on("click", function(event){   // Save article button
    id = $(this).attr('data-id');
    $(this).attr('data-state', 'true');
    $(this).addClass('disabled');
    $(this).text('SAVED!');
    $.ajax({
        method:"POST",
        url: "/saved/" + id,
    }).then(function(){
        console.log('Article id: '+ id + ' has been saved!');
    })
})


$("#saved_articles").on("click", function() {
    console.log("retrieving saved articles")
    $.ajax({
        method: "GET",
        url: "/saved"
    }).then(function(data) {
        console.log("saved data " + data)
        window.location = "/saved"
    })
})

$('.note').on('click', function() {
    id = $(this).attr('data-id');
    loadNotes(id);
});

function loadNotes(id) {
    $('.savedNotes').empty();
    id = id;
    $('#submitNote').attr('data-id', id);
    $.ajax({
        method: "GET",
        url: "/articles/" + id
      }).then(function(data) {
        console.log(data);
        $.each(data.notes, function(index, value) {
            $('.savedNotes').append('<div><button class="deleteNote" data-id="' + value._id + '"><i class="far fa-trash-alt"></i></button><p>' + (index+1) + ': ' + value.body + '</p></div>');
        });
      })
    $('.modal').modal('show');
}

$(document).on('click', '.deleteNote', function() {
    console.log('button clicked!');
    $.ajax({
        method: "POST",
        url: "/deletenote/",
        data: {
            id: $(this).attr('data-id')
        }
    }).then(function(data) {
        console.log('Note has been deleted!');
    }).then(function() {
        loadNotes(id);
    })
});


$(document).on("click", '#submitNote', function() {
    id = $(this).attr("data-id");
    console.log(id)
    $.ajax({
        method: "POST",
        url: "articles/" + id,
        data: {
            body: $("#mynote").val()
        }
    }).then(function(data){
        console.log("Note has been saved!");
        $('.modal').modal('hide');
    }).then(function() {
        loadNotes(id);
    })
    $('#mynote').val('');
});