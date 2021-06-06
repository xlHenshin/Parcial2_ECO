class Pelicula{
    constructor(pelicula){
        this.pelicula=pelicula
        this.valorVoto;
    }

    render=()=>{
        let component = document.createElement("div");
        component.className = "Pelicula";

        let enviarBtn = document.createElement("button");
        enviarBtn.className="enviarBtn";

        let nombrePeli = document.createElement("div");
        nombrePeli.className="nombrePeli";
        nombrePeli.innerHTML=this.pelicula.nombre;

        let calificacion = document.createElement("div");
        calificacion.className="calificacion";
        calificacion.innerHTML=this.pelicula.calificacion;


        let starContainer = document.createElement("div");
        starContainer.className="rate"

        for (let i = 5; i > 0; i--) {
            let starRate = document.createElement("input");
            starRate.type='radio';
            starRate.id= this.pelicula.id+"star"+i;
            starRate.name="rate"+this.pelicula.id;
            starRate.value=i;
            let starLabel = document.createElement("label");
            starLabel.htmlFor = this.pelicula.id+"star"+i;
            starLabel.title="text";

            starContainer.appendChild(starRate);
            starContainer.appendChild(starLabel);

            starRate.addEventListener('click', ()=>{
                this.valorVoto=starRate.value;
                //console.log(this.valorVoto);
            });
        }

        let infoDiv = document.createElement("div");
        infoDiv.className="infoDiv";

        infoDiv.appendChild(nombrePeli);
        infoDiv.appendChild(calificacion);
        component.appendChild(infoDiv);
        component.appendChild(starContainer);

        return component;
    }
}
