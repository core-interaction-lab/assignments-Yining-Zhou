const fetchMovies = async () => {
    const response = await fetch ('https://api.airtable.com/v0/appeS3GtaU7pVJANF/Table%201?api_key=keyr30RjuAtaI5Ozj').then (data => data.json())

    console.log (response); 

    const moviesConatiner = document.getElementById('movies-container');

    response.records.forEach(movie => {
        console.log(movie.fields);
        const articleEl = document.createElement('article');
        const titleEL = document.createElement('div')
        const genreEL = document.createElement('div')
        const imdbUrlEL = document.createElement('div')
        const releaseDateEL = document.createElement('div')

        titleEL.innerHTML = movie.fields.Name;
        genreEL.innerHTML = movie.fields.gener;
        imdbUrlEL.innerHTML=movie.fields,imdb_url;
        releaseDateEL.innerHTML = movie.fields.release_date;

        articleEl.append(titleEL,genreEL,imdbUrlEL,releaseDateEL);

        moviesConatiner.appendChild(articleEl);

    });
};

fetchMovies();