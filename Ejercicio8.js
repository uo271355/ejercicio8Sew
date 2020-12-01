"use strict";
class Meteo {
    constructor(nombre,codigo){
        this.apikey = "a374a4a42a96a0fb8fe56223ed774fa4";
        this.ciudad = nombre;
        this.codigoPais = codigo;
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }
    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    $("pre").text(JSON.stringify(datos, null, 2));
                
                    //PresentaciÃ³n de los datos contenidos en JSON
                    
                    var stringDatos =  "<img src='http://openweathermap.org/img/w/"+datos.weather[0].icon+".png'>"
						stringDatos += "<ul><li>Ciudad: " + datos.name + "</li>";
                        stringDatos += "<li>País: " + datos.sys.country + "</li>";
                        stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                        stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                        stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                        stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                        stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                        stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                        stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                        stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                        stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                        stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                        stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                    
                    $("p").html(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
                }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el Ã¡rbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    verJSON(){
        //Muestra el archivo JSON recibido
		this.crearElemento("h2",this.ciudad,"footer"); 
        this.crearElemento("h3","Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a>","footer"); 
        this.crearElemento("h4",this.correcto,"footer"); // Crea un elemento con DOM 
        this.crearElemento("h5","JSON","footer"); // Crea un elemento con DOM        
        this.crearElemento("pre","","footer"); // Crea un elemento con DOM para el string con JSON
	//	this.crearElemento("p","<img src='https://openweathermap.org/img/w/01d.png'>","footer"); // Crea un elemento con DOM para el string con JSON
		this.crearElemento("h5","Datos","footer"); // Crea un elemento con DOM 
        this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con JSON
        this.cargarDatos();
    }
	eliminar(){
		$("h5").remove();
		$("h2").remove();
		$("h3").remove();
		$("h4").remove();
		$("pre").remove();
		$("p").remove();
		$("li").remove();
		$("ul").remove();
	}
	zaragoza(){
		$("#Zaragoza").hide();
		$("#Valladolid").show();	
		$("#Nantes").show();
	}
	nantes(){
		$("#Nantes").hide();
		$("#Valladolid").show();
		$("#Zaragoza").show();
	}
	valladolid(){
		$("#Valladolid").hide();
		$("#Nantes").show();
		$("#Zaragoza").show();
	}
}

var meteoZaragoza = new Meteo("Zaragoza","ES");
var meteoNantes=new Meteo("Nantes","FR");
var meteoValladolid=new Meteo("Valladolid","ES");
