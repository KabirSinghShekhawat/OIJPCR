const btn = document.getElementById('fetchButton');
const ISO8601ToDate = (date) => {
    // date = date.split("T")[0];
    const date_ISO8601 = new Date(date);
    const year = date_ISO8601.getFullYear();
    let month = date_ISO8601.getMonth()+1;
    let dt = date_ISO8601.getDate();

    if (dt < 10) dt = '0' + dt;
    if (month < 10) month = '0' + month;
    
    const ddMMYYYY = {
        date: dt, 
        month: month, 
        year: year
    }

    return ddMMYYYY;
}


fetchAllJournals = async () => { 
    const response = await fetch('http://localhost:3000/api', {method: 'GET'});
    if(!response.ok) throw new Error(response.message);
    const journals = await response.json();
    return journals;
}  

fetchAllJournals()
.then((journals) => {
    journals.forEach((journal) => {
    console.log(journal);
    const id = journal._id;
    const { author, title, slug, createdAt } = journal;
    const journalObject = {
        id: id,
        title: title,
        author: author,
        slug: slug,
        date: createdAt
    }
    buildCard(journalObject);
})})
.catch((error) => {console.log(error)})

const buildCard = (journal) => {
    const date = ISO8601ToDate(journal.date);
    const dateFormat = `${date.date}-${date.month}-${date.year}`
    console.log(
    `Building Id: ${journal.id}\nDate(dd-mm-yyyy): ${dateFormat}` + 
    `\nTitle: ${journal.title}` +
    `\nAuthor: ${journal.author} \nSlug: ${journal.slug}\n`)
    
    // let journalContainer = document.getElementsByClassName('journalList-container')

    // let journalCard = document.createElement("div")
    // journalCard.classList.add('journal-card-container')

    // let journalCardTitle = document.createElement("div")
    // journalCardTitle.classList.add('journal-card-title')
    // journalCardTitle.innerHTML = `<h3>${journal.title}</h3>`

    // journalCard.appendChild(journalCardTitle)
    // document.body.appendChild(journalCard)
}
