const albumConainer = document.getElementById('album-container');

const fetchMusic = async () => {
    const response = await fetch('https://interactionlab.space/data/assignment-4-1.json').then(data => data.json());
    console.log(response.items);

    buildAlbums (response.items);
};

const buildAlbums = ablums => {
    ablums.forEach(item => {
        console.log(item);
        const imgEl = document.createElement('img');

        imgEl.setAttribute('src',item.images[0].url);
        albumConainer.append(imgEl);
    });
}

fetchMusic();

