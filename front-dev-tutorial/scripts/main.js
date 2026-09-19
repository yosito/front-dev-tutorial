document.addEventListener('DOMContentLoaded', function () {
    const hero = new HeroSlider('.swiper');
    hero.start();

    //const _textAnimation = function(el, isIntersecting){
    //    if(isIntersecting){
    //        const ta = new TweenTextAnimation(el);
    //        ta.animate();
    //    }
    //}

    //const so = new ScrollObserver('.tween-animate-title', _textAnimation);

    //const _inviewAnimation = function(el, inview){
    //    if(inview){
    //        el.classList.add('inview');
    //    } else {
    //        el.classList.remove('inview');
    //   }
    //}

    //const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);

    //const header = document.querySelector('.header');
    //const _navAnimation = function(el, inview){
    //    if(inview){
    //        header.classList.remove('triggered');
    //    } else {
    //        header.classList.add('triggered');
    //    }
    //}

    //const so3 = new ScrollObserver('.nav-trigger', _navAnimation, { once:false });

    new Main;
});

class Main {
    constructor(){
        this.header = document.querySelector('.header');
        this.hero = new HeroSlider('.swiper');
        this.sides = document.querySelectorAll('.side');
        this._observers = [];
        this._init();
    }

    _init(){
        new MobileMenu;
        Pace.on('done', this._scrollInit.bind(this));

    }

    _scrollInit() {
        this._observers.push(
            new ScrollObserver('#main-content', this._sideAnimation.bind(this), { once: false, rootMargin: "-300px 0px" }),
            new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), { once: false }),
            new ScrollObserver('.swiper', this._toggleSlideAnimaton(this), { once: false }),
            new ScrollObserver('.cover-slide', this._inviewAnimation),
            new ScrollObserver('.appear', this._inviewAnimation),
            new ScrollObserver('.tween-animate-title', this._textAnimation)
        )
        console.log(this._observers);
    }

    _toggleSlideAnimaton(el, inview){
        if(inview){
            this.hero.start();
        } else {
            this.hero.stop();
        }
    }

    _navAnimation(el, inview){
        if(inview){
            this.header.classList.remove('triggered');
        } else {
            this.header.classList.add('triggered');
        }
    }

    _inviewAnimation(el, inview){
        if(inview){
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }

    _textAnimation(el, isIntersecting){
        if(isIntersecting){
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    _sideAnimation(el, inview){
        if(inview){
            this.sides.forEach(side => side.classList.add('inview'));  
        } else {
            this.sides.forEach(side => side.classList.remove('inview'));
        }
    }
}