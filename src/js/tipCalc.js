export default class TipCalc {

    constructor() {
        if(!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            inputBill: "input--bill",
            inputCustom: "input--custom",
            inputPeople: "input--num-of-people",
            percentageBtns: "#input--percentage button",
            tipAmount: ".tip__result",
            totalAmount: ".total__result",
            reset: ".reset",
            inputPeopleLabel: ".input__persons label",
        }
        
        this.inputBill = document.getElementById(`${this.selectors.inputBill}`);
        this.inputCustom = document.getElementById(`${this.selectors.inputCustom}`);
        this.inputPeople = document.getElementById(`${this.selectors.inputPeople}`);
        this.percentageBtns = Array.from(document.querySelectorAll(`${this.selectors.percentageBtns}`));
        this.tipAmount= document.querySelector(`${this.selectors.tipAmount}`);
        this.totalAmount= document.querySelector(`${this.selectors.totalAmount}`);
        this.reset = document.querySelector(`${this.selectors.reset}`);
        this.inputPeopleLabel = document.querySelector(`${this.selectors.inputPeopleLabel}`);

        return true;
    }

    setupEvents() {
       this.handleAllInputs();
       
       // Bill input event listener    
       this.inputBill.addEventListener("input", () => this.refreshResult());
      
       // Percentage buttons click event listener
       this.percentageBtns.forEach(btn => {
           btn.addEventListener("click", () => {
               this.removeCurrentActiveStyles();
               btn.classList.add("active");
               this.inputCustom.value = "";
               this.refreshResult();
           })
       });

       // Custom input event listener
       this.inputCustom.addEventListener("input", () => {
           this.removeCurrentActiveStyles();
           this.refreshResult();
        });

       // Num. of people input event listener
       this.inputPeople.addEventListener("input", event => {
           if(+(event.target.value) === 0) {
               this.errorStyles("add");
               this.displayResult("__.__", "__.__");
           }
           else {
               this.errorStyles("remove");
               this.refreshResult();
           }
       });

       // Reset button click event listener
       this.reset.addEventListener("click", () => this.resetCalc());
    }


    /* Function to handle every input */
    handleAllInputs() {
        this.limitInputTo(this.inputBill, 99999);
        this.limitInputTo(this.inputCustom, 100);
        this.limitInputTo(this.inputPeople, 100);
    }

    /* Function to limit input values based on the parameter */
    limitInputTo(inp, limit) {
       inp.addEventListener("input", () => {
        let inputVal = inp.value;
        inp.value = inputVal > limit ? limit : inputVal;
       }) 
    }

    /* Function to remove active styles from every percentage button */
    removeCurrentActiveStyles() {
        this.percentageBtns.forEach(b => b.classList.remove("active"));
    }

    /* Function to reset the calculator to initial state */
    resetCalc() {
        this.inputBill.value = "";
        this.removeCurrentActiveStyles();
        this.inputCustom.value = "";
        this.inputPeople.value = "";
        this.errorStyles("remove");
        this.displayResult("0.00", "0.00");
        this.disableReset(true);
    }

    /* Function to validate all inputs */
    validateForm() {
        if(this.getInputVal(this.inputBill) !== "" && 
            this.getInputVal(this.inputPeople) !== "" &&
             (this.getInputVal(this.inputCustom) !== "" || 
               this.percentageBtns.some(btn => btn.classList.contains("active")))) 
               {
                   this.disableReset(false);
                   return true;
               }
        else {
            this.disableReset(true);
            this.displayResult("__.__", "__.__");
            return false;
        }
    }

    /* Function to display the calculated result */
    displayResult(tip, total) {
        this.tipAmount.innerText = this.tipAmount.innerText.replace(/[^$].+/, tip);
        this.totalAmount.innerText = this.totalAmount.innerText.replace(/[^$].+/, total);
    }

    /* Function to error apply styles if input is 0 */
    errorStyles(style) {
        if(style === "add") {
            this.inputPeopleLabel.classList.add("error");
            this.inputPeople.classList.add("error__border");
        }
        if(style === "remove") {
            this.inputPeopleLabel.classList.remove("error");
            this.inputPeople.classList.remove("error__border");
        }
    }

    /* Function to refresh result on user input */
    refreshResult() {
        if(this.validateForm()) {
            let bill = +(this.getInputVal(this.inputBill));
            let people = +(this.getInputVal(this.inputPeople));
            let perc = +(this.getInputVal(this.inputCustom) || 
                        this.percentageBtns.filter(btn => btn.classList.contains("active"))[0].value);

            if(people === 0) return;

            this.errorStyles("remove");
            let tip = (bill * (perc / 100));
            let tipPerPerson = (tip / people).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
            let total = ((bill + tip) / people).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

            this.displayResult(tipPerPerson, total);
        }
        else {
            return ;
        }
    }

    /* Function to disable the reset button based on the parameter */
    disableReset(boolean) {        
       this.reset.disabled = boolean === true ? true : false;
    }
    
    /* Function to get input values from an input */
    getInputVal(inp) {
        return inp.value;
    }

}