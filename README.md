BLOCKCHAIN NETWORK

The following steps will show how to setup this project using this file structure.

SETUP
Open VS Code.
Switch directories to blockchain. Enter cd blockchain
Open 3 terminals
In each terminal, open the specific node. For example, in the first terminal run: npm run node_1
In the second terminal run: npm run node_2.
In the third terminal run: npm run node_3.

Go to the localhost URLs
	http://localhost:3001/blockchain
  http://localhost:3002/blockchain
  http://localhost:3003/blockchain
  
Open Postman
Note: Using Postman Desktop is required for this.
	Use the following setup:
		POST: http://localhost:3001/register-and-broadcast-node
		Body:
			{
				“newNodeUrl”: http://localhost:3002
			}
	Then click send.

Change 3002 to 3003 to register that node as well.
Open or refresh the URLs of all nodes in the browser. 
Check to make sure they are all registered with each other. This will be indicated by the 'networkNodes' text at the bottom.

MINING
Open a new terminal and go to localhost:3001/mine
	Run it and check to see that each node recognizes it by hitting refresh.
	The mining reward should be in the Pending Transactions
Go to Postman and use the following criteria:
	POST: http://localhost:3002/transaction/broadcast
	Body:
		{
			“amount”: 100,
			“sender”: “ABC123E4FG”,
			“recipient”: “UVW789X2Z3”
		}
Click Send
Check all nodes
	All nodes should have 2 pending transactions
Mine another block
	All nodes should show the mining reward and transaction in Index 3
	The new mining reward should be in the Pending Transactions

TEST FOR CONSENSYS
Open a browser and a tab for each node url.
If necessary, run each node in each specific terminal.
If necessary, register each node on Postman. 
Enter the following data:
	POST: http://localhost:3001/register-and-broadcast-node
	Body:
		{
			“newNodeUrl”: “http://localhost:3002
		}	
	Click Send.

Perform this step for each node that is to be registered. For example, if registering node 3003, the simply replace 3002 with 3003 in the Body of Postman and click Send.
Mine blocks on all three nodes. For example:
localhost:3001/mine
localhost:3002/mine (2) – meaning mine two times. To mine a second time, just hit refresh
localhost:3003/mine
Check to see if all three nodes have 5 items in them. This is one less than the times mined. 
Open a new terminal to connect a 4th node to the network.
In the VS Code terminal type: npm run node_4
If it reads ‘Listening on port 3003’  then it is working.
Go to Postman and send a request for node 3004. To do this, enter this data:
	POST: http://localhost:3001/register-and-broadcast-node
	Body:
		{
			“newNodeUrl”: http://localhost:3004
		}
	Click Send.

Check to see that it is connected to the network by going to: http://localhost:3004/blockchain
At this point, node 4 will not have the correct blocks.
The ‘/consensus’ end point will need to be hit in order to fix the issue.
To fix this, go to localhost:3004/consensus and run it.
The chain should be replaced with the new blockchain data that is in the other nodes.
Go to localhost:3004/consensus and run it again. This will prompt a note stating that the chain has not been replaced. This is because there was not a need to replace this chain since it is now up to date.
