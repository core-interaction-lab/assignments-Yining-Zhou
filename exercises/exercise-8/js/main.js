
const db = {
    id: 'appJ4NFS8HgXUWIvH',
    table: 'pokedex',
    apiKey: 'keyr30RjuAtaI5Ozj'
};

const airtableUrl = `https://api.airtable.com/v0/${db.id}/${db.table}?maxRecords=100&view=Grid%20view&api_key=${db.apiKey}`

const slideshowContainer = document.getElementById('slideshow');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');



const fetchpokedex = async () => {
    const response = await fetch(airtableUrl).then(data => data.json());
    console.log(response);
    buildSlideshow (response.records);
    return response.records;
};

const buildSlideshow = (pokedex) => {
    console.log(pokedex);
    console.log(buildSlide(pokedex[0]));
    const slideshowContainer = document.getElementById('slideshow-container');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const firstPokedex = buildSlide(pokedex[0]);
    console.log(firstPokedex);
    slideshowContainer.append(firstPokedex);
    
    let currentPokedex = 0;
    
    prevButton.addEventListener('click',() => {
        if (currentPokedex === 0){
            currentPokedex = pokedex.lengh - 1;
        } else {
            currentPokedex = currentPokedex - 1;
        }

        const pokedexRecord = pokedex[currentPokedex];

        const slideEl = buildSlide(pokedexRecord);

        slideshowContainer.innerHTML = '';
        slideshowContainer.append(slideEl);
    });

    nextButton.addEventListener('click',() => {
        if (currentPokedex === pokedex.lengh - 1) {
            currentPokedex = 0;
        } else {
            currentPokedex = currentPokedex + 1;
        }

        const pokedexRecord = pokedex[currentPokedex];
        swapSlide(pokedexRecord);

    
    });

};

const swapSlide = (pokedexRecord) => {
    const slideEl = buildSlide(pokedexRecord);

    slideshowContainer.innerHTML = '';
    slideshowContainer.append(slideEl);
}

const buildSlide = (pokedex) => {
    const pokedexContainer = document.createElement('article');
    if (pokedex.fields.photo){
        console.log (pokedex.fields.photo[0].url);
        const photoImg = document.createElement ('img')
        photoImg.src = pokedex.fields.photo[0].url;
        photoImg.classList.add('photo-img', 'asdadas');
        photoImg.id = 'photo-img-id';
        /*photoImg.setAttribute('src',pokedex.fields.photo[0].url);*/
        pokedexContainer.append(photoImg);
   }

   if (pokedex.fields.name){
       console.log(pokedex.fields.name);
   }
   return pokedexContainer;
}

fetchpokedex();