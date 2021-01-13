
$(document).ready(function(){
    //Keeps Search Bar at top of page when scrolling
    var navbar = document.getElementById("navbar")
    var sticky = navbar.offsetTop
    window.onscroll = function() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky-top")
        } else {
            navbar.classList.remove("sticky-top")
        }
    }
    const backdrop = document.getElementById('backdrop')
    const root = document.getElementById('root')
    $("#userSearch").submit(function(event){
        event.preventDefault()
        //Clear page for new search results
        $("#root").html("")
        //Read search input and append to API call
        var search = $("#search").val()
        var apiUrl = 'https://api.unsplash.com/search/photos?query='+search+'&content_filter=high&per_page=20&client_id=DO34voYtNh_Faa_RFUoc1LLdiMiTh_9RASFlW4RDr74'
        //GET images from search
        $.ajax({
            url: apiUrl,
            success: function(data){
                console.log(data)
                //From JSON data, get image URL and place image on page
                data.results.forEach(results => {
                    //div for hover elements
                    var div = document.createElement('div')
                    div.classList.add("imageHov")
                    
                    //Make link to link image to source
                    var imageLink = document.createElement('a')
                    imageLink.setAttribute('href', results.urls.raw)
                    var image = document.createElement('img')
                    image.setAttribute('src', results.urls.regular)
                    image.setAttribute('style', 'max-height: 90vh; max-width: 100%; object-fit: scale-down;')
                    image.setAttribute('title', "Photo by "+results.user.name+" on Unsplash")
                    image.setAttribute('id', "ih")
                    imageLink.appendChild(image)

                    //Credit going to Photographer as per Unsplash API guidelines
                    var attribution = document.createElement('p')
                    attribution.setAttribute('id', "field")
                    attribution.innerHTML = "Photo by "
                    var linkUser = document.createElement('a')
                    linkUser.setAttribute('href',"https://unsplash.com/@"+results.user.username+"?utm_source=your_app_name&utm_medium=referral")
                    linkUser.innerHTML = results.user.name
                    attribution.appendChild(linkUser)
                    var on = document.createTextNode(" on ")
                    attribution.appendChild(on)
                    var linkUnsplash = document.createElement('a')
                    linkUnsplash.setAttribute('href',"https://unsplash.com/?utm_source=your_app_name&utm_medium=referral")
                    linkUnsplash.innerHTML = "Unsplash"
                    attribution.appendChild(linkUnsplash)
                    
                    var text = document.createElement('span')
                    text.appendChild(attribution)

                    div.appendChild(imageLink)
                    div.appendChild(text)
                    root.appendChild(div)            
                })
                backdrop.classList.add("bg-light")
            },
            error: function(ajaxContext){
                alert(ajaxContext.responseText)
            }
        })
    })
})
