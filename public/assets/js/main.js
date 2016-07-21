
(function(){

    const modalSuccess = $("#submit-request-success");
    const modalFailure = $("#submit-request-failure");
    const popupCarousel = $('#popup-carousel');
    
    function showCarousel(){
        popupCarousel.modal("show");
        return false;
    }
    
    $('.carousel').carousel({
        interval: 5000
    }).on('slide.bs.carousel', function (e) {
        var nextH = $(e.relatedTarget).height();
        $(this).find('.active.item').parent().animate({
            height: nextH
        }, 500);
    });
    
    $('#more-btn, #gallery-link').click(showCarousel);
    
    $(".hoverable-image").hover(function(){
        var imageEl = $(this);
        var src = imageEl.attr("src");
        var tmp = src.split('.');
        var base = tmp[0];
        var ext = tmp[tmp.length-1];
        
        const bk = '.bk.'
        
        imageEl.attr("src", base + bk + ext);
    }, function(){
        var imageEl = $(this);
        var src = imageEl.attr("src");
        var tmp = src.split('.');
        var base = tmp[0];
        var ext = tmp[tmp.length-1];
        
        imageEl.attr("src", base + '.' + ext);
    });

    $( "#submit-request" ).submit(function( event ) {
        event.preventDefault();
        
        const form = $( this );        
        
        var data = parseFormData(form);
        
        firebaseProxy.init();
        firebaseProxy.requestsRef.push(data, function(err){
            var modal = err ? modalFailure : modalSuccess;

            modal.modal("show");
            setTimeout(function(){ modal.modal('hide'); }, 3000); 
        });


        
        return false;
    });

    function parseFormData(form) {
        var dataArray = form.serializeArray();
        var data = {};
        
        dataArray.forEach(function(item){
            data[item.name] = item.value; 
        });
        return data;    
    }
   
    function FirebaseProxy() {
        this.inited = false;
        this.requestsRef = null;
    }
    
    $(".smooth-scroll").on('click', function(e) {
       // prevent default anchor click behavior
       e.preventDefault();

       // store hash
       var hash = this.hash;

       // animate
       $('html, body').animate({
           scrollTop: $(hash).offset().top
         }, 300, function(){

           // when done, add hash to url
           // (default click behaviour)
           window.location.hash = hash;
         });

    });
    
    FirebaseProxy.prototype.init = function() {
        if(this.inited) return;
        const config = {
            apiKey: "AIzaSyCbbxo6XnIqbRhHp8r6HuB64e0L0Bcvj8Q",
            authDomain: "landing-cris.firebaseapp.com",
            databaseURL: "https://landing-cris.firebaseio.com",
            storageBucket: "",
        };
        firebase.initializeApp(config);

        // firebase.auth().signInAnonymously().catch(function(error) {
        //     console.error(error);
        // });
        
        this.requestsRef = firebase.database().ref('MagicalLabDB').child('requests');
        this.inited = true;
    }
    const firebaseProxy = new FirebaseProxy;

    //vk integration
    (function(){
        VK.init({apiId: 5527532, onlyWidgets: true});
        VK.Widgets.Like("vk_like", {type: "button"});
    })();
    
    //fb integration
    (function(){
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.6";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })();
    
})();
