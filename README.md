##How to run the code:
1. Clone the GitHub repository: git clone https://github.com/aadilraza339/jira-manager.git
2. Navigate to the project directory: cd jira-manager
3. Install the required dependencies: npm install
4. Start the server: node server.js

#Task 1:Fetch all tickets from the Jira API and save them in a database table.
You should save the following fields in the database:.
`Number, Name, Description, Reporter, Status, Due Date if any`

#How it works:
The code makes an API request to fetch all the tickets and stores them in the database. Before storing a ticket, the code checks whether it already exists in the database. If it does, the code updates the existing ticket. Otherwise, it inserts the ticket as a new entry.

#Task 2:Change the status of the ticket from 'Open' to 'Close' with a comment in Jira using API

#How it works:
I am retrieving the ticket ID and comment from the request to change the status and add a comment. To move the ticket to the 'Closed' status, we need to specify the transition ID, which is '31'. This transition represents the action of closing the ticket. Additionally, I am making another API request to edit the ticket using the 'PUT' method to add the comment.

#Task 3: Create a UI to show the tickets from the database.
#How it works:
1. cd font-end
2. npm install
3. npm start

I have created a React application for displaying the tickets as a card view. Also makes an API call to fetch the tickets from the backend.

#Task 4: Add a button to re-fetch or re-load new tickets if any from Jira and put them into the database
#How it works:
I have added a reload button to fetch updated responses from the API if any from Jira, and updating the database accordingly.
