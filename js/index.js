







  $(document).ready(function() {
    //Preloader
    preloaderFadeOutTime = 5000;
    function hidePreloader() {
    var preloader = $('#load');
    preloader.fadeOut(preloaderFadeOutTime);
    }
    hidePreloader();
    });



var close = document.getElementById("close");
var bar = document.getElementById("bar");
var navbox = document.getElementById("navbox");
var crossBox = document.getElementById("crossBox");

navbox.style.width = "0px";

bar.onclick = function () {
    if (navbox.style.width === "0px") {
        navbox.style.width = "250px";
        crossBox.style.display = "block";

    }

}
close.onclick = function () {
    if (navbox.style.width === "250px") {
        navbox.style.width = "0px";
        crossBox.style.display = "none";
    }

}





$(document).ready(function () {
    $(".best-offer .owl-carousel").owlCarousel({

        loop: true,
				nav: false,
				dots: false,
				autoplay: true,

				responsive: {
					0: {
						items: 2,

					},
					600: {
						items: 3,

					},
					800: {
						items: 4,
					}


				}

});



$(".top-store .owl-carousel").owlCarousel({

loop: true,
nav: false,
dots: true,
autoplay: true,

responsive: {
  0: {
    items: 1,

  }
 


}

});


});




class Slideshow {
    constructor(el) {
        
        this.DOM = {el: el};
      
        this.config = {
          slideshow: {
            delay: 3000,
            pagination: {
              duration: 3,
            }
          }
        };
        
        // Set the slideshow
        this.init();
      
    }
    init() {
      
      var self = this;
      
      // Charmed title
      this.DOM.slideTitle = this.DOM.el.querySelectorAll('.slide-title');
      this.DOM.slideTitle.forEach((slideTitle) => {
        charming(slideTitle);
      });
      
      // Set the slider
      this.slideshow = new Swiper (this.DOM.el, {
          
          loop: true,
          autoplay: {
            delay: this.config.slideshow.delay,
            disableOnInteraction: false,
          },
          speed: 500,
          preloadImages: true,
          updateOnImagesReady: true,
          
          // lazy: true,
          // preloadImages: false,

          pagination: {
            el: '.slideshow-pagination',
            clickable: true,
            bulletClass: 'slideshow-pagination-item',
            bulletActiveClass: 'active',
            clickableClass: 'slideshow-pagination-clickable',
            modifierClass: 'slideshow-pagination-',
            renderBullet: function (index, className) {
              
              var slideIndex = index,
                  number = (index <= 8) ? '0' + (slideIndex + 1) : (slideIndex + 1);
              
              var paginationItem = '<span class="slideshow-pagination-item">';
              paginationItem += '<span class="pagination-number">' + number + '</span>';
              paginationItem = (index <= 8) ? paginationItem + '<span class="pagination-separator"><span class="pagination-separator-loader"></span></span>' : paginationItem;
              paginationItem += '</span>';
            
              return paginationItem;
              
            },
          },

          // Navigation arrows
          navigation: {
            nextEl: '.slideshow-navigation-button.next',
            prevEl: '.slideshow-navigation-button.prev',
          },

          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        
          on: {
            init: function() {
              self.animate('next');
            },
          }
        
        });
      
        // Init/Bind events.
        this.initEvents();
        
    }
    initEvents() {
        
        this.slideshow.on('paginationUpdate', (swiper, paginationEl) => this.animatePagination(swiper, paginationEl));
        //this.slideshow.on('paginationRender', (swiper, paginationEl) => this.animatePagination());

        this.slideshow.on('slideNextTransitionStart', () => this.animate('next'));
        
        this.slideshow.on('slidePrevTransitionStart', () => this.animate('prev'));
            
    }
    animate(direction = 'next') {
      
        // Get the active slide
        this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
        this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
        this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-title'),
        this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');
      
        // Reverse if prev  
        this.DOM.activeSlideTitleLetters = direction === "next" ? this.DOM.activeSlideTitleLetters : [].slice.call(this.DOM.activeSlideTitleLetters).reverse();
      
        // Get old slide
        this.DOM.oldSlide = direction === "next" ? this.DOM.el.querySelector('.swiper-slide-prev') : this.DOM.el.querySelector('.swiper-slide-next');
        if (this.DOM.oldSlide) {
          // Get parts
          this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector('.slide-title'),
          this.DOM.oldSlideTitleLetters = this.DOM.oldSlideTitle.querySelectorAll('span'); 
          // Animate
          this.DOM.oldSlideTitleLetters.forEach((letter,pos) => {
            TweenMax.to(letter, .3, {
              ease: Quart.easeIn,
              delay: (this.DOM.oldSlideTitleLetters.length-pos-1)*.04,
              y: '50%',
              opacity: 0
            });
          });
        }
      
        // Animate title
        this.DOM.activeSlideTitleLetters.forEach((letter,pos) => {
                    TweenMax.to(letter, .6, {
                        ease: Back.easeOut,
                        delay: pos*.05,
                        startAt: {y: '50%', opacity: 0},
                        y: '0%',
                        opacity: 1
                    });
                });
      
        // Animate background
        TweenMax.to(this.DOM.activeSlideImg, 1.5, {
            ease: Expo.easeOut,
            startAt: {x: direction === 'next' ? 200 : -200},
            x: 0,
        });
      
        //this.animatePagination()
    
    }
    animatePagination(swiper, paginationEl) {
            
      // Animate pagination
      this.DOM.paginationItemsLoader = paginationEl.querySelectorAll('.pagination-separator-loader');
      this.DOM.activePaginationItem = paginationEl.querySelector('.slideshow-pagination-item.active');
      this.DOM.activePaginationItemLoader = this.DOM.activePaginationItem.querySelector('.pagination-separator-loader');
      
      console.log(swiper.pagination);
      // console.log(swiper.activeIndex);
      
      // Reset and animate
        TweenMax.set(this.DOM.paginationItemsLoader, {scaleX: 0});
        TweenMax.to(this.DOM.activePaginationItemLoader, this.config.slideshow.pagination.duration, {
          startAt: {scaleX: 0},
          scaleX: 1,
        });
      
      
    }
    
}

const slideshow = new Slideshow(document.querySelector('.slideshow'));




     

function dec(val,price,numqty,tprice){
    let iconv=document.getElementById(val);
    let number=document.getElementById(numqty);
    var oneprice=document.getElementById(price);
     var totprice=document.getElementById(tprice);
     console.log(iconv);
    if(iconv.value<=1)
    {
        iconv.value=1;
        alert("number never be less than 1");
    }
    else{

        iconv.value=parseInt(iconv.value)-1;


         number.innerHTML=parseInt(iconv.value);
        totprice.innerHTML=parseInt(oneprice.innerHTML)*parseInt(iconv.value);

    }


}
function inc(val,price,numqty,tprice){
     
  let iconv=document.getElementById(val);
  let number=document.getElementById(numqty);
    var oneprice=document.getElementById(price);
    var totprice=document.getElementById(tprice);
    if(iconv.value>=5)
    {
        iconv.value=5;
        alert("number never be greate than 5");
    }
    else{

        iconv.value=parseInt(iconv.value)+1;
        number.innerHTML=parseInt(iconv.value);
        totprice.innerHTML=parseInt(oneprice.innerHTML)*parseInt(iconv.value);
    }

}

function tipdec(tip){
    let iconv=document.getElementById(tip);
    //  let tip=document.getElementById('tipprice1');
    var valu=document.getElementById("tipprice1")
    if(iconv.value<=1)
    {
        iconv.value=1;
        alert("Tip-Coin Never Be 0");
    }
    else{

        iconv.value=parseInt(iconv.value)-1;
        valu.innerText= 20 * parseInt(iconv.value) 



         
    }

}
function tipinc(tip){
    let iconv=document.getElementById(tip);
    //  let tip=document.getElementById('tipprice1')
    var valu=document.getElementById("tipprice1")

        iconv.value=parseInt(iconv.value)+1;
        //  tip.innerHTML=20*parseInt(iconv.value)
        valu.innerText= 20 * parseInt(iconv.value) 

        
    

}
