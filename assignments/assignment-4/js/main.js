const fetchMusic = async () => {
    const response = await fetch('https://api.spotify.com/v1/artists/5a2EaR3hamoenG9rDuVn8j/albums?offset=0&limit=20&include_groups=album,single,compilation,appears_on&locale=en-US,en;q=0.9').then(data => data.json());
    console.log(response);
    buildSlideshow (response.records);
    return response.records;
};


const buildSlideshow = (Music) => {
    console.log(Music);
    console.log(buildSlide(Music[0]));
    const slideshowContainer = document.getElementById('slideshow-container');
    const prevButton = document.getElementById('<');
    const nextButton = document.getElementById('>');
    const firstMusic = buildSlide(Music[0]);
    console.log(firstMusic);
    slideshowContainer.append(firstMusic);
    
    let currentMusic = 0;
    
    prevButton.addEventListener('click',() => {
        if (currentMusic === 0){
            currentMusic = Music.lengh - 1;
        } else {
            currentMusic = currentMusic - 1;
        }

        const MusicRecord = Music[currentMusic];

        const slideEl = buildSlide(MusicRecord);

        slideshowContainer.innerHTML = '';
        slideshowContainer.append(slideEl);
    });

    nextButton.addEventListener('click',() => {
        if (currentMusic === Music.lengh -0) {
            currentMusic = 0;
        } else {
            currentMusic = currentMusic + 1;
        }

        const MusicRecord = Music[currentMusic];
        swapSlide(MusicRecord);

    
    });

};

const swapSlide = (MusicRecord) => {
    const slideEl = buildSlide(MusicRecord);

    slideshowContainer.innerHTML = '';
    slideshowContainer.append(slideEl);
}

const buildSlide = (Music) => {
    const MusicContainer = document.createElement('article');
    if (Music.fields.album){
        console.log (Music.fields.album[0].url);
        const albumImg = document.createElement ('img')
        albumImg.src = pokedex.fields.photo[0].url;
        albumImg.classList.add('album-img', 'asdadas');
        albumImg.id = 'album-img-id';
        albumContainer.append(albumImg);
   }

   if (Music.fields.name){
       console.log(Music.fields.name);
   }
   return MusicContainer;  

}

response.records.forEach(Music=> {
    console.log(Music.fields);
    const articleEl = document.createElement('article');
    const nameEL = document.createElement('div');
    const typeEL = document.createElement('div');
    const external_urlsEL = document.createElement('a');
    const idEL = document.createElement('div');

    titleEL.innerHTML = Music.fields.name;
    genreEL.innerHTML = Music.fields.type;

    external_urlsEL.href = movie.fields.imdb_url;
    external_urlsEL.target = "_blank";
    external_urlsEL.classList.add('imdb-link');

    external_urlsEL.innerHTML = "Page";

    articleEl.append(nameEL,typeEL,external_urlsEL,idEL);
    
    MusicConatiner.appendChild(articleEl);
   });
fetchMusic();

