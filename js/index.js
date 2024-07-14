//Initialize a random number between 1 and 2
const random = parseInt(Math.random() * 2)+1;

//Initialize an empty 2D array for storing element moves of players
let board  = [
    [
        [''],[''],['']
    ],

    [
        [''],[''],['']
    ],

    [
        [''],[''],['']
    ]
];

//Initialization 
function startUp(){
    
    //This variable gets the main element
    const main = document.querySelector('main');

    let x = 0;
    let o = 0;
    let id = 0;

    for(let i = 0; i < board.length;i++){
        
        for(let j = 0; j < board[i].length;j++){
            
            //Creating a div element with class 'box' and a unique id based on the incrementing id variable.
            const box = document.createElement('div');
            box.setAttribute('class','box');
            box.setAttribute('id',`${id+1}`);
            id++;

            // Creating an h1 element with class 'element' for setting the X or O text.
            const element = document.createElement('h1');
            element.setAttribute('class','element');

            //Create another random number
            const random = parseInt(Math.random() * 2)+1;

            // Determine which symbol ('x' or 'o') to display based on the random number
            if(random == 1){

                // If random equals 1, prioritize displaying 'x' if fewer than 5 have been displayed
                if(x < 5){
                    element.textContent = 'x';
                    element.style.color = 'green';
                }else{
                    // Otherwise, display 'o' if more than 5 'x's have been displayed
                    element.textContent = 'o';
                    element.style.color = 'rgb(189, 189, 13)';
                }
                x++;
            }else{
                // If random does not equal 1, prioritize displaying 'o' if fewer than 5 have been displayed
                if(o < 5){
                    element.textContent = 'o';
                    element.style.color = 'rgb(189, 189, 13)';
                }else{
                    // Otherwise, display 'x' if more than 5 'o's have been displayed
                    element.textContent = 'x';
                    element.style.color = 'green';
                }
                o++;
            }
            
            //Append the element object to a box object
            box.appendChild(element);

            //Append the box object to a main object
            main.appendChild(box);
        }
    }

}
startUp(); //Call the function 'startUp'


//This function handles the first click event
function clickMeToStart(){
    
    //Changing the title based on a random number.
    if(random % 2 == 0){
        document.querySelector('#click-me').textContent = 'First Move : Player X';
    }else{
        document.querySelector('#click-me').textContent = 'First Move : Player O';
    }
    
    //This will remove all content inside elements with the class 'element'.
    document.querySelectorAll('.element').forEach(element =>{
        element.innerHTML = '';
    });
    
    document.removeEventListener('click',clickMeToStart);
    playing(); //Call the function 'playing'. This will run after clickMeToStart is triggered.
}
document.addEventListener('click',clickMeToStart); //Call the function 'clickMeToStart' using a click event listener

let changePlayer = random;

//This function handles the playing stage of players
function playing(){

        //This variable selects all boxes using the .box class
        const boxes = document.querySelectorAll('.box');

        //This variable gets the title element by its id
        const title = document.getElementById('click-me');
    
        //Function for handling the click
        function handleClick(event){

            //This variable is for getting the targeted box
            const box = event.currentTarget;

            //This variable is for getting the element class based on the targeted box
            const element = box.querySelector('.element');
    
            //Checking if the next move is X or O and setting the color and textContent of the element
            if (changePlayer % 2 == 0) {
                element.style.color = 'green';
                element.textContent = 'X';
                title.textContent = 'Player O';
            } else {
                element.style.color = 'rgb(189, 189, 13)';
                element.textContent = 'O';
                title.textContent = 'Player X';
            }
    
            //Getting the id of a clicked box 
            const id = parseInt(box.id);

            //Storing elements in an array based on the id of each box
            switch (id) {
                case 1:
                    board[0][0] = element.innerHTML;
                    break;
                case 2:
                    board[0][1] = element.innerHTML;
                    break;
                case 3:
                    board[0][2] = element.innerHTML;
                    break;
                case 4:
                    board[1][0] = element.innerHTML;
                    break;
                case 5:
                    board[1][1] = element.innerHTML;
                    break;
                case 6:
                    board[1][2] = element.innerHTML;
                    break;
                case 7:
                    board[2][0] = element.innerHTML;
                    break;
                case 8:
                    board[2][1] = element.innerHTML;
                    break;
                case 9:
                    board[2][2] = element.innerHTML;
                    break;
            }
    
            
            changePlayer++; //Increment this variable to change the player after every move

            box.removeEventListener('click', handleClick); //Remove the event listener from the clicked box


            //Call the check function
            check();


            //Checking if the title includes 'Wins' or 'Draw' 
            if (title.textContent.includes('Wins!') || title.textContent.includes('Draw!')) {
                removeEventListeners();
                const header = document.querySelector('header');
    
                const subtitle = document.createElement('h2');
                subtitle.textContent = 'Refresh to play again!';
    
                header.appendChild(subtitle);
            }

        }
        
        //This function adds event listeners to the boxes
        function addEventListeners() {
    
            boxes.forEach(box => {
                
                if (!title.textContent.includes('Wins!')) {
                    box.addEventListener('click', handleClick);
                }
            });
        }
    

        //This function removes all click event listeners from the boxes if there is a winner
        function removeEventListeners() {
            boxes.forEach(box => {
                box.removeEventListener('click', handleClick);
            });
        }
        addEventListeners();
    
    
}



//This function checks if there is a winner
function check(){

    let numOfX = 0;
    let numOfO = 0;

    let hasWinner = false;

    for(let i = 0; i < board.length;i++){
        for(let j = 0; j < board[i].length;j++){
            const firstElement = board[i][j];

            let winner; //Initialize winner

            //Check if the variable 'firstElement' is 'X' or 'O'
            if(firstElement == 'X'){
                winner = "Player X Wins!";
                numOfX++; 
            }else if(firstElement == 'O'){
                winner = "Player O Wins!";
                numOfO++; 
            }
            
            //Check if all elements in a row are equal
            if(firstElement == board[i][0]&&firstElement == board[i][1] && firstElement == board[i][2]){

                //Change the title based on the winner
                document.querySelector('#click-me').textContent = winner;
                hasWinner = true; //Set to true to optimize program performance
                break;
            }
            //Check if all elements in a column are equal
            else if(firstElement == board[0][j]&& firstElement == board[1][j] && firstElement == board[2][j]){

                //Change the title based on the winner
                document.querySelector('#click-me').textContent = winner;
                hasWinner = true; //Set to true to optimize program performance
                break;
            }
            //Check if all elements in the first, middle, and last positions are equal
            else if(firstElement == board[0][0] && firstElement == board[1][1] && firstElement == board[2][2]){

                //Change the title based on the winner
                document.querySelector('#click-me').textContent = winner;
                hasWinner = true; //Set to true to optimize program performance
                break;
            }
            //Check if all elements in the last, middle, and first positions are equal
            else if(firstElement == board[0][2] && firstElement == board[1][1] && firstElement == board[2][0]){

                //Change the title based on the winner
                document.querySelector('#click-me').textContent = winner;
                hasWinner = true; //Set to true to optimize program performance
                break;
            }

            
        }

        if(hasWinner){ // Exit the loop if there is a winner
            break;
        }

    }
    
    //Checking if all boxes are full
    if(numOfO == 4 && numOfX == 5 || numOfO == 5 && numOfX == 4){
        document.querySelector('#click-me').textContent = 'Draw!';
    }

}

