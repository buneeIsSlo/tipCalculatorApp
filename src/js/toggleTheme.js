import anime from 'animejs/lib/anime.es.js';

const sunPath = "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";
const moonPath = "M16.5 27.8382C16.5 43.0261 31 54 31 54C15.8122 54 0 43.0261 0 27.8382C0 12.6504 15.8122 0.5 31 0.5C31 0.5 16.5 12.6504 16.5 27.8382Z";


export default class ToggleTheme {

    constructor() {
        if(!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            body: "data-theme",
            toggleTheme: ".toggle__theme",
            toggleThemeContainer: ".toggle__theme-container",
            calculator: "main",
            moon: ".moon",
            logo: ".logo"
        }
        
        this.body = document.querySelector(`[${this.selectors.body}]`);
        this.toggleTheme = document.querySelector(`${this.selectors.toggleTheme}`);
        this.calculator = document.querySelector(`${this.selectors.calculator}`);
        this.moon = document.querySelector(`${this.selectors.moon}`);
        this.toggleThemeContainer = document.querySelector(`${this.selectors.toggleThemeContainer}`);
        this.logo = document.querySelector(`${this.selectors.logo}`);

        this.lightTheme = "light";
        this.darkTheme = "dark";
        this.theme = JSON.parse(localStorage.getItem("theme")) || this.lightTheme;

        return true;
    }

    setupEvents() {
            this.body.dataset.theme = this.theme;

            // Apply theme on load
            window.addEventListener("load", () => this.onLoadTheme());

            // Toggle theme on mouse click
            this.toggleTheme.addEventListener("click", () => this.changeTheme());
            
            // Toggle theme when Enter key is pressed
            this.toggleThemeContainer.addEventListener("keydown", event => {
                if(event.keyCode === 13) this.changeTheme();
            })
    }

    /* Multipurpose Function 
       1. Changes the theme based on the data present in local storage on page load.
       2. Since the animations are minimal, This is perfect for users that prefer reduced motion. 
       P.S. Pretty big brain if you ask me...
    */
    onLoadTheme() {
        this.savedTheme = this.body.dataset.theme;

        anime({
            targets: this.calculator,
            duration: 1000,
            opacity: [0, 1],
            easing: "easeOutQuad"
        })

        if(this.savedTheme === this.lightTheme) {
            anime({
                targets: this.moon,
                d: [{value: moonPath}],
                easing: "easeOutQuad",
                duration: 1000
            })

            this.svgLightAnimation();
        }
        else if(this.savedTheme === this.darkTheme) {
            anime({
                targets: this.moon,
                d: [{value: sunPath}],
                easing: "easeOutQuad",
                duration: 1000
            })

            this.svgDarkAnimation();
        }
    }

    /* Function to change theme */
    changeTheme() {
        this.currentTheme = this.body.dataset.theme;

        if(this.currentTheme === this.lightTheme) {
            this.body.dataset.theme = this.darkTheme
            this.toSunAnimation();
            this.toggleThemeAnimation();
            this.svgDarkAnimation();
            localStorage.setItem("theme", JSON.stringify(this.darkTheme));
        } 
        else if(this.currentTheme === this.darkTheme) {
            this.body.dataset.theme = this.lightTheme;
            this.toMoonAnimation();
            this.toggleThemeAnimation();
            this.svgLightAnimation();
            localStorage.setItem("theme", JSON.stringify(this.lightTheme));
        }
    }

    /* Function to animate sun to moon */
    toMoonAnimation() {
        anime.timeline({
            duration: 500,
        })
        .add({
            targets: this.moon,
            d: [{value: moonPath}],
            easing: "easeOutQuad"
        })
        .add({
            targets: this.toggleTheme,
            rotate: 320,
            easing: "easeInOutElastic(1, .8)"
        }, "-=50")
    }

    /* Function to animate moon to sun */
    toSunAnimation() {
        anime.timeline({
            duration: 500,
        })
        .add({
            targets: this.toggleTheme,
            rotate: 0,
            easing: "easeInOutElastic(1, .8)"
        })
        .add({
            targets: this.moon,
            d: [{value: sunPath}],
            easing: "easeInSine"
        }, "-=200")
    }

    /* Function to animate theme change */
    toggleThemeAnimation() {
        anime({
            targets: this.body,
            opacity: [0, 1],
            duration: 700,
            easing: "easeInOutCirc"
        })

        anime({
            targets: this.calculator,
            translateY: [-20, 0],
            duration: 1500,
            easing: "easeInOutCirc"
        })
    }

    /* Function to animate logo fill to light */
    svgLightAnimation() {
        anime({
            targets: this.logo,
            opacity: [0, 1],
            duration: 100
        })

        anime({
            targets: this.logoSVGPath(),
            fill: ["hsl(185, 84%, 74%)", "#3D6666"],
            easing: "easeOutCirc",
            duration: 700,
            scale: [.8, 1],
        })
    }

    /* Function to animate logo fill to dark */
    svgDarkAnimation() {
        anime({
            targets: this.logo,
            opacity: [0, 1],
            duration: 100
        })

        anime({
            targets: this.logoSVGPath(),
            fill: ["#3D6666", "hsl(185, 41%, 84%)"],
            easing: "easeOutCirc",
            duration: 700,
            scale: [.8, 1],
        })
    }

    /* Function to path of logo SVG from logo SVG document*/
    logoSVGPath() {
        return this.logo.getSVGDocument().childNodes[0].querySelector("path");
    }


}

