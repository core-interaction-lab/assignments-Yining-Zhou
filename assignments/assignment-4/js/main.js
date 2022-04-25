const albumConainer = document.getElementById('album-container');

const fetchMusic = async () => {
    const response = await fetch('https://interactionlab.space/data/assignment-4-1.json').then(data => data.json());
    console.log(response.items);

    buildAlbums (response.items);
};

const buildAlbums = ablums => {
    ablums.forEach(item => {
        console.log(item);
        const wrapper = document.createElement('div');
        wrapper.classList.add('album')
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src',item.images[0].url);
        wrapper.appendChild(imgEl);

        const right = document.createElement('div');

        const nameEl = document.createElement('div');
        nameEl.textContent = item.name;
        right.appendChild(nameEl);

        const dateEl = document.createElement('div');
        dateEl.textContent = item.release_date;
        right.appendChild(dateEl);

        wrapper.appendChild(right)
        albumConainer.appendChild(wrapper);
    });
}

fetchMusic();