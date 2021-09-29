import anime from 'animejs/lib/anime.es.js';

export default class Intro {
    
    constructor() {
        if(!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            intro: ".intro",
            spli: ".spli",
            tter: ".tter",
            spliSide: ".spli__container",
            tterSide: ".tter__container",
            calc: ".calc",
            logo: ".logo",
            toggleTheme: ".toggle__theme",
            body: "body"
        }

        this.introContainer = document.querySelector(`${this.selectors.intro}`);
        this.spliSVG = document.querySelector(`${this.selectors.spli}`);
        this.tterSVG = document.querySelector(`${this.selectors.tter}`);
        this.spliContainer = document.querySelector(`${this.selectors.spliSide}`);
        this.tterContainer = document.querySelector(`${this.selectors.tterSide}`);
        this.calculator = document.querySelector(`${this.selectors.calc}`);
        this.logo = document.querySelector(`${this.selectors.logo}`);
        this.toggleTheme = document.querySelector(`${this.selectors.toggleTheme}`);
        this.body = document.querySelector(`${this.selectors.body}`);

        this.reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        return true;
    }

    setUpEvents() {
        if(this.perfersReducedMotion(this.reducedMotionMediaQuery)) this.removeIntroElement();
        else {
            this.scaleDownAnimation();
            window.addEventListener("load", () => {
                this.introAnimation();
            })
        }
    }
    
    /* Function to check if user prefers reduced motion */
    perfersReducedMotion(query) {
        if(!query || query.matches) return true;
        else return false;
    }

    /* Function to animate intro scale down effect */
    scaleDownAnimation() {
        anime({
            targets: this.introContainer,
            scale: ["200%", "100%"],
            easing: "easeInOutCirc",
            duration: 2000
        })
    }
    
    /* Function to animate intro */
    introAnimation() {
        this.spliSVG.style.opacity = 1;
        this.tterSVG.style.opacity = 1;

        // SVGs stroke animation
        anime({
            targets: [this.getSVGPath(this.spliSVG)],
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 1500,
            easing: "easeInOutSine",
            delay: function(el, i) { return i * 250 },
        })
        anime({
            targets: [this.getSVGPath(this.tterSVG)],
            strokeDashoffset: [anime.setDashoffset, 0],
            duration: 1500,
            easing: "easeInOutSine",
            delay: function(el, i) { return i * 250 },
        })
        
        // SVGs fill animation
        anime({
            targets: [this.getSVGPath(this.spliSVG)],
            fill: ["rgba(0, 0, 0, 0)", "#fff"],
            duration: 1000,
            easing: "easeInOutQuad",
            delay: function(el, i) { return i * 400 },
        })
        anime({
            targets: [this.getSVGPath(this.tterSVG)],
            fill: ["rgba(0, 0, 0, 0)", "#fff"],
            duration: 1000,
            easing: "easeInOutQuad",
            delay: function(el, i) { return i * 400 },
            complete: () => {
                this.componentsAnimation();
            }
        })

        // SVGs container split animation
        anime({
            targets: this.spliContainer,
            translateX: -800,
            duration: 2000,
            delay: 4000,
            easing: "easeInOutCirc"
        })
        anime({
            targets: this.tterContainer,
            translateX: 800,
            duration: 2000,
            delay: 4000,
            easing: "easeInOutCirc",
            complete: () => {
                // Remove intro element once animation is completed
                this.removeIntroElement();

                // Change body overflow to visible
                this.body.style.overflow = "visible";
            }
        })
        
        
    }

    /* Function to get path of SVG from SVG document */
    getSVGPath(svg) {
        return Array.from(svg.getSVGDocument().childNodes[0].querySelectorAll("path"));
    }

    /* Function to animate all components */
    componentsAnimation() {
        // Calculator animation
        anime({
            targets: this.calculator,
            opacity: [0, 1],
            scale: ["80%", "100%"],
            easing: "easeInOutCirc",
            duration: 2500
        })

        // Logo animation
        anime({
            targets: this.logo, 
            opacity: [0, 1],
            translateY: [-40, 0],
            easing: "easeInOutCirc",
            duration: 2500
        })

        // Theme toggler animation
        anime({
            targets: this.toggleTheme,
            opacity: [0, 1],
            translateX: [30, 0],
            easing: "easeInOutElastic(1, .5)",
            duration: 2500
        })
    }

    /* Function to remove intro element*/
    removeIntroElement() {
        this.introContainer.remove();
    }
}