//------------------------------------------------
//CREATE NEW POST
//------------------------------------------------

//Hämta post-elementet från formuläret
const post = document.getElementById("post")

post.addEventListener("submit", function(event){

    //Hindrar att sidan laddas om
    event.preventDefault();

    //Hämta inputvärden
    const namn = document.getElementById("namn").value
    const titel = document.getElementById("titel").value
    const text = document.getElementById("text").value

    //Hämta main-taggen
    const main = document.querySelector("main")

    //Skapa nya element
    const article = document.createElement("article")
    const h1 = document.createElement("h1")
    h1.classList.add("rubrik")
    const authorP = document.createElement("p")
    authorP.classList.add("author")
    const dateP = document.createElement("p")
    dateP.classList.add("date")
    const contentP = document.createElement("p")
    contentP.classList.add("content")

    //Hämta dagens datum och formattera
    const today = new Date()
    const formattedDate = today.toLocaleDateString()

    //Assigna input till de skapade elementen
    h1.textContent = titel
    authorP.textContent = "Författare: " + namn
    dateP.textContent = "Publicerat: " + formattedDate
    contentP.textContent = text

    //Skapa den nedre baren för funktioner
    const bottomBarP = document.createElement("p");
    bottomBarP.classList.add("bottom-bar");
    
    const commentsSpan = document.createElement("span");
    commentsSpan.classList.add("comments");
    commentsSpan.textContent = "Se kommentarer";
    
    const toCommentSpan = document.createElement("span");
    toCommentSpan.classList.add("to-comment");
    toCommentSpan.textContent = "Kommentera";

    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("delete")
    deleteSpan.textContent = "Ta bort inlägg"
    
    bottomBarP.appendChild(commentsSpan);
    bottomBarP.appendChild(toCommentSpan);
    bottomBarP.appendChild(deleteSpan);  

    // Skapa kommentarssektionen
    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");
    commentSection.style.display = "none";
    
    // Skapa kommentarsformuläret
    const commentForm = document.createElement("form");
    commentForm.classList.add("newComment");
    commentForm.style.display = "none";
    
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.classList.add("comment-name");
    nameInput.placeholder = "Ditt namn";
    
    const textInput = document.createElement("textarea");
    textInput.classList.add("comment-text");
    textInput.placeholder = "Din kommentar";
    
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Skicka";
    
    commentForm.appendChild(nameInput);
    commentForm.appendChild(textInput);
    commentForm.appendChild(submitButton);

    //Lägg till elementen i article-taggen
    article.appendChild(h1)
    article.appendChild(authorP)
    article.appendChild(dateP)
    article.appendChild(contentP)
    article.appendChild(bottomBarP)
    article.appendChild(commentSection);
    article.appendChild(commentForm);

    //Lägg till article (posten) överst i main
    main.prepend(article)

    //Lägg till funktionaliteterna nedan (kommentera, delete osv)
    addEventListenersToArticle(article);

    //Töm formuläret
    document.getElementById("post").reset();

});


//------------------------------------------------
//EVENT LISTENERS
//------------------------------------------------

//Skapa funktion för all funktionalitet nedan (för en artikel)
function addEventListenersToArticle(article) {

//------------------------------------------------
//SHOW COMMENT FIELD
//------------------------------------------------

    //Hämta "kommentera"-länk och input-fältet från en artikel
    const toCommentLink = article.querySelector(".to-comment");
    const commentForm = article.querySelector(".newComment");
    
    //Lägg till click-event för "Kommentera"-länk
    toCommentLink.addEventListener("click", function() {

        //kontrollerar vad display är inställd på för input-fältet
        const currentDisplay = window.getComputedStyle(commentForm).display;

        //togglar mellan osynlig och synlig
        if (currentDisplay === "none") {
            commentForm.style.display = "block";
        } else {
            commentForm.style.display = "none";
        }
    });

//------------------------------------------------
//SHOW COMMENTS
//------------------------------------------------

    //hämta visa-kommentarer-länk och kommentarsfältet
    const commentsLink = article.querySelector(".comments");
    const commentSection = article.querySelector(".comment-section");
    
     //Lägg till click-event för "se kommentarer"
    commentsLink.addEventListener("click", function() {

        //kontrollerar vad display är inställd på för input-fältet
        const currentDisplay = window.getComputedStyle(commentSection).display;

        //togglar mellan osynlig och synlig
        if (currentDisplay === "none") {
            commentSection.style.display = "block";

            //hämta ev. kommentarer som finns under ett inlägg
            const existingComments = commentSection.querySelectorAll(".each-comment");
            
            //om antalet kommentarer är noll & det inte redan finns ett meddelande
            if (existingComments.length === 0 && !commentSection.querySelector(".no-comments")) {
                
                //skapa ett meddelande som informerar om detta
                const noCommentsMessage = document.createElement("p");
                noCommentsMessage.classList.add("no-comments");
                noCommentsMessage.textContent = "Inga kommentarer ännu";

                const commentDiv = document.createElement("div")
                commentDiv.classList.add("comment-divider")
                
                //lägg till meddelandet i kommentarssektionen
                commentSection.appendChild(noCommentsMessage);
                commentSection.appendChild(commentDiv)
            }
        } else {
            commentSection.style.display = "none";
        }
    });

//------------------------------------------------
//DELETE POST
//------------------------------------------------

    //Hämta delete-länken från en artikel
    const deleteButton = article.querySelector(".delete");

    //Klick-event
    deleteButton.addEventListener("click", function() {

        const confirmation = confirm("Är du säker?");

        //Vid ja, ta bort inlägget
        if (confirmation) {
            article.remove();
        }
    });

//------------------------------------------------
//CREATE COMMENT
//------------------------------------------------
    
    // Lägg till submit-event på kommentarsfältet
    commentForm.addEventListener("submit", function(event) {

        //hindrar att standardbeteende för ett event inträffar
        //i det här fallet att sidan laddas om
        event.preventDefault();
        
        const nameInput = this.querySelector(".comment-name");
        const textInput = this.querySelector(".comment-text");
        const commentName = nameInput.value;
        const commentText = textInput.value;
        
        //Se till att kommentarssektionen är synlig
        commentSection.style.display = "block";

        // Ta "no comments"-meddelande
        const noCommentsMessage = commentSection.querySelector(".no-comments");
        if (noCommentsMessage) {
            noCommentsMessage.remove();
        }
        
        //Skapa nytt div-element för kommentaren
        const newComment = document.createElement("div");
        newComment.classList.add("each-comment");
        
        //Skapa p-element och tilldela värden
        const nameElement = document.createElement("p");
        nameElement.classList.add("comment-name");
        nameElement.textContent = commentName;
        
        const contentElement = document.createElement("p");
        contentElement.classList.add("comment-content");
        contentElement.textContent = commentText;
        
        //Lägg till kommentarerna i rätt sektion
        newComment.appendChild(nameElement);
        newComment.appendChild(contentElement);
        commentSection.insertBefore(newComment, commentSection.firstChild);
        
        //Rensa kommentarsfältet
        this.reset();
    });
}

//------------------------------------------------
//CALL FUNCTION WHEN LOADING PAGE
//------------------------------------------------

//Vänta tills dokumentet har laddats
document.addEventListener("DOMContentLoaded", function() {

    //Hämta alla artiklar som redan finns på sidan
    const articles = document.querySelectorAll("article");
    
    //Loopa alla artiklar och anropa funktionaliteterna ovan (kommentera, delete osv)
    articles.forEach(function(article) {
        addEventListenersToArticle(article);
    });
});