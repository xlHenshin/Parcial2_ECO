class Pelicula{
    constructor(pelicula){
        this.pelicula=pelicula
    }

    render=()=>{
        let component = document.createElement("div");
        component.className = "Pelicula";

        let nombrePeli = document.createElement("div");
        nombrePeli.className="nombrePeli";
        nombrePeli.innerHTML=this.pelicula.nombre;

        let calificacion = document.createElement("div");
        calificacion.className="calificacion";
        calificacion.innerHTML=this.pelicula.calificacion;

        let starOne = document.createElement("input");
        starOne.type="radio";
        starOne.id= 'star1';
        starOne.name='rate';
        starOne.value="1";
        let oneLabel = document.createElement("label");
        oneLabel.htmlFor = 'star1';
        oneLabel.title= 'text';


        let starTwo = document.createElement("input");
        starTwo.type="radio";
        starTwo.id= 'star2';
        starTwo.name='rate';
        starTwo.value="2";
        let twoLabel = document.createElement("label");
        twoLabel.htmlFor = 'star2';
        twoLabel.title= 'text';

        let starThree = document.createElement("input");
        starThree.type="radio";
        starThree.id= 'star3';
        starThree.name='rate';
        starThree.value="3";
        let threeLabel = document.createElement("label");
        threeLabel.htmlFor = 'star3';
        threeLabel.title= 'text';

        let starFour = document.createElement("input");
        starFour.type="radio";
        starFour.id= 'star4';
        starFour.name='rate';
        starFour.value="4";
        let fourLabel = document.createElement("label");
        fourLabel.htmlFor = 'star4';
        fourLabel.title= 'text';

        let starFive = document.createElement("input");
        starFive.type="radio";
        starFive.id= 'star5';
        starFive.name='rate';
        starFive.value="5";
        let fiveLabel = document.createElement("label");
        fiveLabel.htmlFor = 'star5';
        fiveLabel.title= 'text';

        let starContainer = document.createElement("div");
        starContainer.className="starContainer"
        starContainer.appendChild(starOne);
        starContainer.appendChild(oneLabel);
        starContainer.appendChild(starTwo);
        starContainer.appendChild(twoLabel);
        starContainer.appendChild(starThree);
        starContainer.appendChild(threeLabel);
        starContainer.appendChild(starFour);
        starContainer.appendChild(fourLabel);
        starContainer.appendChild(starFive);
        starContainer.appendChild(fiveLabel);

        component.appendChild(nombrePeli);
        component.appendChild(calificacion);
        component.appendChild(starContainer);


        return component;
    }
}
