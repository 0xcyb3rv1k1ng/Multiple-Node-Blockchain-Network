BLOCKCHAIN NETWORK
<p>

The following steps will show how to setup this project using this file structure.
<p>

SETUP
<p>
Open VS Code.
<p>
Switch directories to blockchain. Type 'cd blockchain'
<p>
Open 3 terminals
<p>
In each terminal, open the specific node. For example, in the first terminal run: npm run node_1
<p>
In the second terminal run: npm run node_2.
<p>
In the third terminal run: npm run node_3.
<p>
<p>
Go to the localhost URLs:
<p>
http://localhost:3001/blockchain
<p>
http://localhost:3002/blockchain
<p>
http://localhost:3003/blockchain
<p>  
Open Postman
<p>
Note: Using Postman Desktop is required for this.
<p>
	Use the following setup:
	<p>
		POST: http://localhost:3001/register-and-broadcast-node
		<p>
		Body:
		<p>
			{
			<p>
				“newNodeUrl”: http://localhost:3002
				<p>
			}
			<p>
	Then click 'Send'.
	<p>

Change '3002' to '3003' to register that node as well.
<p>
Open or refresh the URLs of all nodes in the browser. 
<p>
Check to make sure they are all registered with each other. This will be indicated by the 'networkNodes' text at the bottom.
<p>
MINING
<p>
Open a new terminal and go to localhost:3001/mine
<p>
	Run it and check to see that each node recognizes it by hitting refresh.
	<p>
	The mining reward should be in the Pending Transactions
	<p>
Go to Postman and use the following criteria:
<p>
	POST: http://localhost:3002/transaction/broadcast
	<p>
	Body:
	<p>
		{
		<p>
			“amount”: 100,
			<p>
			“sender”: “ABC123E4FG”,
			<p>
			“recipient”: “UVW789X2Z3”
			<p>
		}
		<p>
Click Send
<p>
Check all nodes
<p>
	All nodes should have 2 pending transactions
	<p>
Mine another block
<p>
	All nodes should show the mining reward and transaction in Index 3
	<p>
	The new mining reward should be in the Pending Transactions
	<p>

TEST FOR CONSENSYS
<p>
Open a browser and a tab for each node url.
<p>
If necessary, run each node in each specific terminal.
<p>
If necessary, register each node on Postman. 
<p>
Enter the following data:
<p>
	POST: http://localhost:3001/register-and-broadcast-node
	<p>
	Body:
	<p>
		{
		<p>
			“newNodeUrl”: “http://localhost:3002
			<p>
		}
		<p>
	Click Send.
	<p>

Perform this step for each node that is to be registered. For example, if registering node 3003, the simply replace 3002 with 3003 in the Body of Postman and click Send.
<p>
Mine blocks on all three nodes. For example:
<p>
localhost:3001/mine
<p>
localhost:3002/mine (2) – meaning mine two times. To mine a second time, just hit refresh
<p>
localhost:3003/mine
<p>
Check to see if all three nodes have 5 items in them. This is one less than the times mined. 
<p>
Open a new terminal to connect a 4th node to the network.
<p>
In the VS Code terminal type: npm run node_4
<p>
If it reads ‘Listening on port 3003’  then it is working.
<p>
Go to Postman and send a request for node 3004. To do this, enter this data:
<p>
	POST: http://localhost:3001/register-and-broadcast-node
	<p>
	Body:
	<p>
		{
		<p>
			“newNodeUrl”: http://localhost:3004
			<p>
		}
		<p>
	Click 'Send'.
	<p>

Check to see that it is connected to the network by going to: http://localhost:3004/blockchain
<p>
At this point, node 4 will not have the correct blocks.
<p>
The ‘/consensus’ end point will need to be hit in order to fix the issue.
<p>
To fix this, go to localhost:3004/consensus and run it.
<p>
The chain should be replaced with the new blockchain data that is in the other nodes.
<p>
Go to localhost:3004/consensus and run it again. This will prompt a note stating that the chain has not been replaced. This is because there was not a need to replace this chain since it is now up to date.
<p>
