
const db = {
    id: 'appJ4NFS8HgXUWIvH',
    table: 'pokedex',
    apiKey: 'keyr30RjuAtaI5Ozj'
};

const airtableUrl = `https://api.airtable.com/v0/${db.id}/${db.table}?maxRecords=100&view=Grid%20view&api_key=${db.apiKey}`

const fetchpokedex = async () => {
    const response = await fetch(airtableUrl).then(data => data.json());
    console.log(response);
    const pokedexConatiner = document.getElementById('pokedex-container');

    const myObject = {
        title: 'pokedex'
    }

    const myArray = ['pokedex'];

    const isRelease = true;

    console.log (myArray [0])
    console.log (myObject)

    const container = document.getElementById('pokedex-container');

    response.records.forEach(pokedex => {
       
        if (pokedex.fields.photo){
             console.log (pokedex.fields.photo[0].url);
             const photoImg = document.createElement ('img')
             photoImg.src = pokedex.fields.photo[0].url;
             photoImg.setAttribute('src',pokedex.fields.photo[0].url);
             container.append(photoImg);
        }

        if (pokedex.fields.name){
            console.log(pokedex.fields.name);
        }


        console.log(pokedex.fields);
        const articleEl = document.createElement('article');
        const nameEL = document.createElement('div');
        const linkEL = document.createElement('a');
        const categoryEL = document.createElement('div');
        const abilitiesEL = document.createElement('div');
        const descriptionEL = document.createElement('p');

        nameEL.innerHTML = pokedex.fields.name;
        categoryEL.innerHTML = pokedex.fields.category;
        abilitiesEL.innerHTML = pokedex.fields.abilities;
        descriptionEL.innerHTML = pokedex.fields.description;

        linkEL.href = pokedex.fields.link;
        linkEL.target = "_blank";
        linkEL.classList.add('link');

        linkEL.innerHTML = "link Page";


        articleEl.append(nameEL,linkEL,categoryEL,abilitiesEL,descriptionEL);
        
        pokedexConatiner.appendChild(articleEl);
    });

    const linkTags = document.querySelectorAll('.link');
    console.log(linkTags);
    linkTags.forEach((link, index) => {
        const linkColor = link.style.color;
        link.id = 'my-link-${index + 1}';
        link.addEventListener('mouseover', (evt) => {
            link.style.color = "pink";
        });

        link.addEventListener('mouseout', evt => {
            link.style.color = linkColor;
        })
    });
};

fetchpokedex();

