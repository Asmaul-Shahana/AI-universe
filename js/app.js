const loadAI = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayAI(data.data.tools);
}

const displayAI = data => {
    const cardContainer = document.getElementById('card-container');
    data.forEach(ai => {
        console.log(ai);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        const feature = [];
        // for(const feat of ai.features)
        // {
        //     feature = feat;
        //     console.log(feature);
        // }
        cardDiv.innerHTML = `
        <div class="card h-100">
            <img src="${ai.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.</p>
                        </div>
                    <div class="card-footer bg-white">
                    <h5 class="card-title fw-bold">${ai.name}</h5>
            </div>
        </div>
        `;
    cardContainer.appendChild(cardDiv);
    });
}

loadAI();