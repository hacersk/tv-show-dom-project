//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.style.backgroundColor = "RGB(237, 235, 230)";

  let container = document.createElement("div");
  container.className = "container";
  rootElem.appendChild(container);
  container.style.display ="flex";
  container.style.flexWrap ="wrap";
 
  container.style.width ="100%";
  container.style.justifyContent="center";
  //container.style.alignContent="center";
  episodeList.forEach(element => {
    console.log(element);
    let article = document.createElement("article");
    container.appendChild(article);

   
    //article.float ="left";
    article.style.width= "25%";
   article.style.margin ="20px 30px 10px 10px";
    article.style.borderStyle ="outset";
    article.style.backgroundColor ="white";
   
    article.style.padding ="15px";
    article.style.color= "black";
    article.style.textAlign ="center";



    let h3 = document.createElement("h3");
    h3.innerHTML = element.name +" - "+ "S0"+element.season+"E0"+element.number;
    article.appendChild(h3);
    //h3.style.boxShadow =" 3px 3px 0 #c9c9c7";
    h3.style.padding="25px";
    h3.style.borderStyle="solid";
    h3.style.borderRadius ="5px";

    let img = document.createElement("img");
    img.src = element.image.medium;
    article.appendChild(img);
    img.style.marginBottom="5px";

    let p = document.createElement("p");
     p.textContent = element.summary;
    article.appendChild(p);
    p.style.textAlign="left";
    p.style.paddingRight ="20px";
    p.style.marginTop="15px";
    p.style.opacity =".6";
    
    let a = document.createElement("a");
    a.innerText = element._links.self.href;
    article.appendChild(a);
    a.style.marginTop = "5px";
    a.style.opacity =".3";
      
  });
 
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
