MULTIPLE NODE BLOCKCHAIN NETWORK
<p>

The following steps will show how to setup this project using this file structure. It will also show the steps required to
run the multiple node blockchain network.
<p>
Note: Using Postman Desktop is required for this
<p>
***************************************************************************************** <p>
SETUP
<p>
1. Open VS Code.
<p>
2. Switch directories to blockchain. Type 'cd blockchain'
<p>
3. Open 3 terminals
<p>
4. In each terminal, open the specific node. For example, in the first terminal run: npm run node_1
<p>
5. In the second terminal run: npm run node_2.
<p>
6. In the third terminal run: npm run node_3.
<p>
<p>
7. Go to the localhost URLs:
<p>
http://localhost:3001/blockchain
<p>
http://localhost:3002/blockchain
<p>
http://localhost:3003/blockchain
<p>  
8. Open Postman
<p>

9. Use the following setup:
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
10. Then click 'Send'.
	<p>

11. Change '3002' to '3003' to register that node as well.
<p>
12. Open or refresh the URLs of all nodes in the browser. 
<p>
13. Check to make sure they are all registered with each other. This will be indicated by the 'networkNodes' text at the bottom.
<p>
************************************************************************************************* <p>
MINING
<p>
14. Open a new terminal and go to localhost:3001/mine
<p>
15. Run it and check to see that each node recognizes it by hitting refresh.
	<p>
NOTE: The mining reward should be in the Pending Transactions
	<p>
16. Go to Postman and use the following criteria:
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
17. Click Send
<p>
18. Check all nodes
<p>
NOTE:	All nodes should have 2 pending transactions
	<p>
19. Mine another block
<p>
NOTE:	All nodes should show the mining reward and transaction in Index 3
	<p>
NOTE:	The new mining reward should be in the Pending Transactions
	<p>
*********************************************************************************************** <p>
TEST FOR CONSENSYS
<p>
20. Open a browser and a tab for each node url.
<p>
21. If necessary, run each node in each specific terminal.
<p>
22. If necessary, register each node on Postman. 
<p>
23. Enter the following data:
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
24. Click Send.
	<p>

25. Perform this step for each node that is to be registered. For example, if registering node 3003, the simply replace 3002 with 3003 in the Body of Postman and click Send.
<p>
26. Mine blocks on all three nodes. For example:
<p>
localhost:3001/mine
<p>
localhost:3002/mine (2) – meaning mine two times. To mine a second time, just hit refresh
<p>
localhost:3003/mine
<p>
27. Check to see if all three nodes have 5 items in them. This is one less than the times mined. 
<p>
28. Open a new terminal to connect a 4th node to the network.
<p>
29. In the VS Code terminal type: npm run node_4
<p>
30. If it reads ‘Listening on port 3003’  then it is working.
<p>
31. Go to Postman and send a request for node 3004. To do this, enter this data:
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

32. Check to see that it is connected to the network by going to: http://localhost:3004/blockchain
<p>
NOTE: At this point, node 4 will not have the correct blocks.
<p>
NOTE: The ‘/consensus’ end point will need to be hit in order to fix the issue.
<p>
33. To fix this, go to localhost:3004/consensus and run it.
<p>
NOTE: The chain should be replaced with the new blockchain data that is in the other nodes.
<p>
34. Go to localhost:3004/consensus and run it again. This will prompt a note stating that the chain has not been replaced. This is because there was not a need to replace this chain since it is now up to date.
<p>
***********************************************************************************************
