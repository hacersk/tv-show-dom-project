//You can edit ALL of the code here

let input;
let count;
function setup() {

 /*var allEpisodes = getAllEpisodes();
 makePageForEpisodes(allEpisodes);
 getEpisodes(allEpisodes);
 count= document.querySelector(".count_episode");
 count.textContent = "Displaying "+allEpisodes.length+"/"+allEpisodes.length+" episodes";
 loadEpisode(allEpisodes);*/
 getShows();

}



function getShows(){
  fetch("https://api.tvmaze.com/shows")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  })
  .then(function(shows){
  
    let selection = document.getElementById("select_show");
    let first= document.createElement("option");
    selection.appendChild(first);
    first.textContent=" ";
    shows.forEach(show =>{
    let options = document.createElement("option");
    selection.append(options);
    options.value = show.id;
    options.textContent =show.name;
    })
    selection.addEventListener("change",function(){
       getShowEpisode(selection.value)
         console.log(selection.value)
    })

  })
}

function getShowEpisode(showId){
  console.log(showId);
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`) 
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
     return Promise.reject(response);
    }
  })
  .then(function(episodes){
    makePageForEpisodes(episodes);
     getEpisodes(episodes);
    loadEpisode(episodes);
      
  })
}


function loadEpisode(episodeList){
  
  let selection =document.getElementById("select_episode");
  let first= document.createElement("option");
  selection.appendChild(first);
  first.textContent=" ";
  episodeList.forEach(episode => {
    let options = document.createElement("option");
    selection.append(options);
    options.value = episode.id;
    options.textContent = seasonAndEpisode(episode.number,"S")+seasonAndEpisode(episode.season,"E")+" - "+episode.name ;
    count = document.querySelector(".count_episode");
    count.textContent = "Displaying "+episodeList.length+"/"+episodeList.length+" episodes";
  });

  selection.onchange= function(){

    return episodeList.find(episode => {
        if(episode.id == selection.value){
           //location.href = episode.url;
          window.open(episode.url);
        }
      });
    }
 }

 function searchEpisodes(episodeList, searchWord) {
  return episodeList.filter(episode => {
    return (
      episode.name.toLowerCase().includes(searchWord.toLowerCase()) ||
      episode.summary.toLowerCase().includes(searchWord.toLowerCase())
    );
  });

}

 function getEpisodes(episodeList){
  
  input= document.querySelector("#search");
  input.addEventListener("keyup", () => {
    let searchWord = document.querySelector("#search").value;
    let searchedEpisodes = searchEpisodes(episodeList, searchWord);
    count.textContent ="Displaying "+searchedEpisodes.length+"/"+episodeList.length+" episodes";
     makePageForEpisodes(searchedEpisodes);
     //console.log(makePageForEpisodes(searchedEpisodes));
  });
 
}

function seasonAndEpisode(number,char){
  let title;
  if (number < 10) {
    title= char+"0"+number;
    console.log(title);
  } else {
    title = char+number;
  }
  return title;
}



function makePageForEpisodes(episodeList) {

  let rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  //debugger;
  let container = document.createElement("div");
  container.className = "container";
  rootElem.appendChild(container);
  
    episodeList.forEach(episode => {
    
    console.log(episode);
    let article = document.createElement("article");
    container.appendChild(article);

       
    let h3 = document.createElement("h3");
    h3.textContent = episode.name +" - "+ seasonAndEpisode(episode.number,"S")+seasonAndEpisode(episode.season,"E");
    article.appendChild(h3);
   

    let img = document.createElement("img");
    img.src = episode.image.medium;
    article.appendChild(img);
   

    let p = document.createElement("p");
     p.innerHTML = episode.summary;
    article.appendChild(p);
   
    
    let a = document.createElement("a");
    a.title ="click";
    a.href = episode.url;//episode._links.self.href ;
    a.innerText = episode.url;//episode._links.self.href;
    article.appendChild(a);
   
  });
 
  
}

window.onload = setup;
