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
