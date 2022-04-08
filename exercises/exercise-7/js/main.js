const fetchMovies = async () => {
    const response = await fetch ('https://api.airtable.com/v0/appeS3GtaU7pVJANF/Table%201?api_key=keyr30RjuAtaI5Ozj').then (data => data.json())

    console.log (response); 

    const moviesConatiner = document.getElementById('movies-container');

    response.records.forEach(movie => {
        console.log(movie.fields);
        const articleEl = document.createElement('article');
        const titleEL = document.createElement('div');
        const genreEL = document.createElement('div');
        const imdbUrlEL = document.createElement('a');
        const releaseDateEL = document.createElement('div');

        titleEL.innerHTML = movie.fields.Name;
        genreEL.innerHTML = movie.fields.genre;

        imdbUrlEL.href = movie.fields.imdb_url;
        imdbUrlEL.target = "_blank";
        imdbUrlEL.classList.add('imdb-link');

        imdbUrlEL.innerHTML = "IMDB Page";
        releaseDateEL.innerHTML = movie.fields.release_date;

        articleEl.append(titleEL,genreEL,imdbUrlEL,releaseDateEL);
        
        moviesConatiner.appendChild(articleEl);
    });

    const linkTags = document.querySelectorAll('.imdb-link');
    console.log(linkTags);
    linkTags.forEach((link, index) => {
        const linkColor = link.style.color;
        link.id = 'my-link-${index + 1}';
        link.addEventListener('mouseover', (evt) => {
            link.style.color = "green";
        });

        link.addEventListener('mouseout', evt => {
            link.style.color = linkColor;
        })
    });
};



fetchMovies();