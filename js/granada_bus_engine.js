
var GranadaBusEngine = {

	init: function gbe_init() {

		document.getElementById('searchForm').addEventListener('submit',function(e) {
			
			console.log('asdasd');
			var numberOfStop = document.getElementById('numberOfStop').value;
			console.log(numberOfStop);
			e.preventDefault();
			e.stopPropagation();

		});

		document.getElementById('searchForm').addEventListener('keydown',function(e) {
			if (e.keyCode === 13) {
				var stopsInput = document.getElementById('numberOfStop');
				var numberOfStop = stopsInput.value;
				GranadaBusEngine.request(numberOfStop, GranadaBusEngine.render);
				stopsInput.value = '';
			}
		});
	
	},
	render: function gbe_render(data){

		console.log("Render" + data.responseText);
		// TODO Renderizar

		var lines = data.lines;

 		var listContainer = document.getElementById('listLines');

  	// Make the list itself which is a <ul>
    var listElement = document.createElement("ul");

    listElement.className = "line_list";

    // add it to the page
    listContainer.appendChild(listElement);

		for (var i=0; i<lines.length; i++)
		{ 		       
		    // create a <li> for each one.
		    var listItem = document.createElement("li");

		    // add the item text
		    listItem.innerHTML = '<p>' + lines[i].name + '</p><p>Tiempo: ' + lines[i].time + '</p><p>Dirección: ' + lines[i].address + '</p>';

      

		    // add listItem to the listElement
		    listElement.appendChild(listItem);

		}


	},
	request: function gbe_request(bus_stop, callback){

		// TODO Add xmlHTTPRequest + Pablo
		console.log('llamando con la parada ' + bus_stop);
		var xhr = new XMLHttpRequest({
    		mozSystem: true
  		});
		xhr.open('GET', 'http://80.25.252.168:8080/websae/Transportes/parada.aspx?idparada=' + bus_stop, true);
	 //    xhr.responseType = 'document';
	    xhr.onreadystatechange = (function() {
	 	console.log(xhr.readyState);
	      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status === 0)) {

	 		var htmlCode = xhr.response;
	 		// console.log("Paso por aqui" +  htmlCode.documentElement.innerHTML);
			// var reGetTitle = new RegExp('"Label1">(.*)\- Código de Parada SMS: (\d+)', "m");
			var reGetTitle = new RegExp('Código de Parada SMS: (\d+)', "m");
			// document.getElementById('contenido').innerHTML = htmlCode;

			var titleMatch = reGetTitle.exec(htmlCode);
			var stopName = titleMatch[0];
			// var stopCode = titleMatch[1];
			console.log(stopName);
			console.log(stopCode);
				// var reGetRawTable = new RegExp('<table cellpadding="0" cellspacing="1" border="0" width="590" align=center>[\s\S]*</table>[\S\s]*<TD width="130" align=center valign=top>
				// ', "m");
				// var tableCode = reGetRawTable.exec(htmlCode)[0];

				var reGetLineNumber = new RegExp("<a class='texto' href='linea.aspx\?idlinea=\d+'>(\d+)</a>", "m");
				// while (match = reGetLineNumber.exec(tableCode)) {
				//     // match es el número de cada línea
				// }


				var reGetLineName = new RegExp('<td class="tabla_campo_valor" align=center>([^<]*)<', "m");
				// while (match = reGetLineName.exec(tableCode)) {
				//     // match es el nombre de cada línea
				// }

				var reGetLineTime = new RegExp('<td width="70" class="tabla_campo_valor" align=center>\s*<!--[^>]*>([^<]*)<', "m");
				// while (match = reGetLineTime.exec(tableCode)) {
				//     // match es el tiempo de espera de cada línea (" " si está llegando ya)

					// }
				 }
		});

		xhr.send();

		// var mockup = {
		// 				name:'Camino de Ronda, 32 - Salsipuedes',
		// 				number:'Nº 321',
		// 				lines:[
		// 					{
		// 						name:'Linea 1',
		// 						time:'llegando',
		// 						address:'ola k ase'
		// 					},
		// 					{
		// 						name:'Linea 2',
		// 						time:'12:20',
		// 						address:'Arriving'
		// 					}]
		// 			};
		// callback(mockup); 

	}

}


window.onload = function(){
	
	// Init listeners
	GranadaBusEngine.init();
	
	//TODO: meter el splash
	// GranadaBusEngine.request(321, GranadaBusEngine.render);

}
