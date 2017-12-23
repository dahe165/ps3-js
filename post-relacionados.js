//<![CDATA[
// POST RELACIONADOS
var reltitulos = new Array();
var relurls = new Array();
var relresumen = new Array();
var relimagen = new Array();
var reltituloscantidad = 0;
var relmaxamostrar = 4;
function leerpostetiquetas(json) {
  for (var i = 0; i < json.feed.entry.length; i++) {
    var entry = json.feed.entry[i];
    reltitulos[reltituloscantidad] = entry.title.$t;
    reltitulos[reltituloscantidad] = getJSONtitle(entry);
    if(entry.category[0] .term == "wallpapers" | entry.category[0] .term == "animacion" ) {
      relresumen[reltituloscantidad] = "<span style='display:block;text-align:center;'>klik untuk melihat entri di tab baru</span>";
    } else {
      relresumen[reltituloscantidad] = getJSONcontent(entry,70);
    }
    relimagen[reltituloscantidad] = getJSONthumbnail(entry);
    relurls[reltituloscantidad] = getJSONurl(entry);
    reltituloscantidad++;
  }
}
function mostrarrelacionados() {
   var tmp = new Array(0);
   var tmp2 = new Array(0);
   var tmp3 = new Array(0);
   var tmp4 = new Array(0);
   for(var i = 0; i < relurls.length; i++) {
      if(!contains(tmp, relurls[i])) {
         tmp.length += 1; tmp[tmp.length - 1] = relurls[i];
         tmp2.length += 1; tmp2[tmp2.length - 1] = reltitulos[i];
         tmp3.length += 1; tmp3[tmp3.length - 1] = relresumen[i];
         tmp4.length += 1; tmp4[tmp4.length - 1] = relimagen[i];
      }
   }
   reltitulos = tmp2; relurls = tmp; relresumen = tmp3; relimagen = tmp4;
   for(var i = 0; i < reltitulos.length; i++){
     var indice = Math.floor((reltitulos.length - 1) * Math.random());
     var tempTitle = reltitulos[i]; var tempUrls = relurls[i];
     var tempResumen = relresumen[i]; var tempImagen = relimagen[i];
     reltitulos[i] = reltitulos[indice]; relurls[i] = relurls[indice];
     relresumen[i] = relresumen[indice]; relimagen[i] = relimagen[indice];
     reltitulos[indice] = tempTitle; relurls[indice] = tempUrls;
     relresumen[indice] = tempResumen; relimagen[indice] = tempImagen;
   }
   var cuantosPosts = 0;
   var r = Math.floor((reltitulos.length - 1) * Math.random());
   var rini = r;
   var salida;
   var dirURL = document.URL;
   while (cuantosPosts < relmaxamostrar) {
      if (relurls[r] != dirURL) {
         salida = "<div class='relsposts'>";
         salida += "<a href='" + relurls[r] + "' rel='nofollow'  target='_blank' title='" + reltitulos[r] + "'><img alt='' src='" + relimagen[r] + "' /></a>";
         salida += "<h6><a href='" + relurls[r] + "' target='_blank'>" + reltitulos[r] + "</a></h6>";
         salida += "<p>" + relresumen[r] + "</p>";
         salida += "</div>";
         document.write(salida);
         cuantosPosts++;
         if (cuantosPosts == relmaxamostrar) { break; }
      }
      if (r < reltitulos.length - 1) {
         r++;
      } else {
         r = 0;
      }
      if(r==rini) { break; }
   }
}
function contains(a, e) {
  for(var j = 0; j < a.length; j++) if (a[j]==e) return true;
  return false;
}

// NAVEGACION ETIQUETAS BAJO ENTRADAS
var laetiqueta;
var navetiquetasflagfirst = 0;
var labelsporpagina = 4;
var labelanterior, labelsiguiente;
function setnavetiquetas(cual) {
  navetiquetasflagfirst = 0;
  laetiqueta = cual;
  navetiquetas(0);
  return false;
}
function navetiquetas(direccion){
  var p, parametros;
  if(direccion==-1) {
    p = labelanterior.indexOf("?");
    parametros = labelanterior.substring(p);
  } else if (direccion==1) {
    p = labelsiguiente.indexOf("?");
    parametros = labelsiguiente.substring(p);
  } else {
    document.getElementById("postsrelacionados").style.height = "0px";
    document.getElementById("PF5").style.height = "270px";
    parametros = "?start-index=1&max-results=" + labelsporpagina + "&orderby=published&alt=json-in-script"
  }
  parametros += "&callback=shownavetiquetas";
  incluirscriptlabels(parametros);
}
function incluirscriptlabels(parametros) {
  if(navetiquetasflagfirst==1) {removerscriptlabels();}
  document.getElementById("navetiquetas").innerHTML = "<div id='navetiquetasloading'></div>";
  document.getElementById("navetiquetassel").innerHTML = "";
  var archivofeeds = "/feeds/posts/default/-/" + laetiqueta + parametros;
  var nuevo = document.createElement('script');
  nuevo.setAttribute('type', 'text/javascript');
  nuevo.setAttribute('src', archivofeeds);
  nuevo.setAttribute('id', 'NAVLABELTEMPORAL');
  document.getElementsByTagName('head')[0].appendChild(nuevo);
  navetiquetasflagfirst = 1;
}
function removerscriptlabels() {
  var el = document.getElementById("NAVLABELTEMPORAL");
  var padre = el.parentNode;
  padre.removeChild(el);
}
function cerrarnavetiquetas() {
    document.getElementById("PF5").style.height = "0px";
    document.getElementById("postsrelacionados").style.height = "190px";
}
function shownavetiquetas(json) {
  var entry, posttitle, posturl, postimg, postcontent;
  var salida = "";
  labelanterior = "";
  labelsiguiente = "";
  for (var k = 0; k < json.feed.link.length; k++) {
    if (json.feed.link[k].rel == 'previous') {
      labelanterior = json.feed.link[k].href;
    }
    if (json.feed.link[k].rel == 'next') {
      labelsiguiente = json.feed.link[k].href;
    }
  }
  for (var i = 0; i < labelsporpagina; i++) {
    if (i == json.feed.entry.length) { break; }
    entry = json.feed.entry[i];
    posttitle = getJSONtitle(entry);
    posturl = getJSONurl(entry);

    if(entry.category[0] .term == "wallpapers" | entry.category[0] .term == "animacion" ) {
      postcontent = "<span style='display:block;text-align:center;'>click para ver la entrada en una nueva pestaña</span>";
    } else {
      postcontent = getJSONcontent(entry,70);
    }


    postimg = getJSONthumbnail(entry);
    salida += "<div class='relsposts'>";
    salida += "<a href='" + posturl + "' target='_blank'><img alt='' src='" + postimg + "' /></a>";
    salida += "<h6><a href='" + posturl + "' target='_blank'>" + posttitle + "</a></h6>";
    salida += "<p>" + postcontent + "</p>";
    salida += "</div>";
  }
  document.getElementById("navetiquetas").innerHTML = salida;
  salida = "<a href='javascript:cerrarnavetiquetas()' class='close'></a>"
  if(labelanterior) {
    salida += "<a href='javascript:navetiquetas(-1);' class='anterior'></a>";
  } else {
    salida += "<span class='deshabilitado anterior'></span>";
  }
  if(labelsiguiente) {
    salida += "<a href='javascript:navetiquetas(1);' class='siguiente'></a>";
  } else {
    salida += "<span class='deshabilitado siguiente'></span>";
  }
  salida += "<a href='javascript:navetiquetas(0);' class='Top'>Top</a>";
  document.getElementById("navetiquetassel").innerHTML = salida;
  salida = "<a href='/search/label/" + laetiqueta + "' target='_blank'>Tampilan Halaman Label</a><a style='float: right;' href='/feeds/posts/summary/-/" +laetiqueta + "' target='_blank'>Suscribirse a " + laetiqueta + "</a><span class='feed-icon imgFeedER'></span>";
  document.getElementById("navetiquetasfooter").innerHTML = salida;
}
//]]>