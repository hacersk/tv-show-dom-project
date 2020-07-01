//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.style.backgroundColor = "RGB(237, 235, 230)";

  let container = document.createElement("div");
  container.className = "container";
  rootElem.appendChild(container);
  
    episodeList.forEach(element => {
    console.log(element);
    let article = document.createElement("article");
    container.appendChild(article);

       
    let h3 = document.createElement("h3");
    let getNumber;
    if(element.number >=10){
      getNumber = "E"+element.number;}
      else {
        getNumber ="E0"+element.number; 
      }
    let getSeason;
    if(element.season>10){
      getSeason ="S"+element.season;
    } else{
      getSeason = "S0"+element.season;
    } 
      
    h3.innerHTML = element.name +" - "+ getSeason+getNumber;
    article.appendChild(h3);
   

    let img = document.createElement("img");
    img.src = element.image.medium;
    article.appendChild(img);
   

    let p = document.createElement("p");
     p.textContent = element.summary;
    article.appendChild(p);
   
    
    let a = document.createElement("a");
    console.log(element._links.self.href);
    a.title ="click";
    a.href = element._links.self.href ;
    a.innerText = element._links.self.href;
    article.appendChild(a);
   
  });
 
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
