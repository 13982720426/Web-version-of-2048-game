
//keydown事件表示键盘被按下
$(document).keydown(function(event)
{
	switch (event.keyCode)
	{
		case 37://left
			//moveLeft()方法，完成左移逻辑，返回值是布尔值，判断是否可以向左
			if(moveLeft())
			{
				//重新生成两个随机数
				generateOneNumber();
				
				//判断当这次移动完成后，游戏是否结束
				setTimeout("isgameover()",400);
			}
			break;
		case 38://up
			if(moveUp())
			{
				//重新生成两个随机数
				generateOneNumber();
				
				//判断当这次移动完成后，游戏是否结束	
				setTimeout("isgameover()",400);
			}
			break;
		case 39://right
			if(moveRight())
			{
				//重新生成两个随机数
				generateOneNumber();
				
				//判断当这次移动完成后，游戏是否结束
				setTimeout("isgameover()",400);
			}
			break;
		case 40://dowm
			if(moveDown())
			{
				//重新生成两个随机数
				generateOneNumber();
				
				//判断当这次移动完成后，游戏是否结束
				setTimeout("isgameover()",400);
			}
			break;
		default:
			break;
	}
});

 

function moveLeft()
{
	//返回值是布尔值，判断是否可以向左移动
	if(!canMoveLeft(board))
	{
		//当前的格子无法移动
		return false;
	}
	
    isaddedArray();
	//完成向左的逻辑
	for(var i=0; i<4; i++)
	{
		for(var j=1; j<4; j++)//左边第一个不能动
		{
			//当前数字格有值的，一定不是0
			if(board[i][j] !=0 )
			{
				//向左移动的逻辑
				for(var k=0; k<j; k++)
				{
					if(board[i][k] == 0 && noBlokHorizontalCol(i,k,j,board))
					{
						//当前值不为0的数字格，左边的数字格必须值为0，并且中间数字格必须值也是0，才能向左移动
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i,k,j,board))
					{
						//当前值不为0的数字格，与左边的数字格值相等，并且中间数字格必须值也是0，才能向左移动
						//move
						showMoveAnimation(i,j,i,k);
						if(added[i][k]!=0)
						{		
							//目标落脚点是否完成过合并
							board[i][k+1] = board[i][j];
							board[i][j] = 0;
						}
						else
						{
							board[i][k] += board[i][j];
							board[i][j] = 0;
							added[i][k] = 1;
							score +=board[i][k];
							updateScore(score);
						}						
						continue;
					}					 
				}
			}
		}
	}
	if(isgameover()) return true;
	else
	{
		setTimeout("updateBoardView();",200);
		
		return true;		
	}
}

function moveRight()
{
	//返回值是布尔值，判断是否可以向右移动
	if(!canMoveRight(board))
	{
		//当前的格子无法移动
		return false;
	}
	
    isaddedArray();
	//完成向右的逻辑
	for(var i=0; i<4; i++)
	{
		for(var j=2; j>=0; j--)
		{
			//当前数字格有值的，一定不是0
			if(board[i][j] !=0 )
			{
				//向右移动的逻辑
				for(var k=3; k>j; k--)
				{
					if(board[i][k] == 0 && noBlokHorizontalCol(i,j,k,board))
					{
						//当前值不为0的数字格，右边的数字格必须值为0，并且中间数字格必须值也是0，才能向右移动
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i,j,k,board))
					{
						//当前值不为0的数字格，与右边的数字格值相等，并且中间数字格必须值也是0，才能向右移动
						//move
						showMoveAnimation(i,j,i,k);
						if(added[i][k]!=0)
						{		
							//目标落脚点是否完成过合并
							board[i][k-1] = board[i][j];
							board[i][j] = 0;
						}
						else
						{
							board[i][k] += board[i][j];
							board[i][j] = 0;
							added[i][k] = 1;
							score +=board[i][k];
							updateScore(score);
						}						
						continue;
					}
				}
			}
		}
	}
	if(isgameover()) return true;
	else
	{
		setTimeout("updateBoardView();",200);
		
		return true;		
	}
}
function moveUp()
{
	//返回值是布尔值，判断是否可以向上移动
	if(!canMoveUp(board))
	{
		//当前的格子无法移动
		return false;
	}
	
    isaddedArray();
	//完成向上的逻辑
	for(var i=0; i<4; i++)
	{
		for(var j=0; j<4; j++)
		{
			//当前数字格有值的，一定不是0
			if(board[i][j] !=0 )
			{
				//向上移动的逻辑
				for(var k=0; k<i; k++)
				{
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board))
					{
						//当前值不为0的数字格，上边的数字格必须值为0，并且中间数字格必须值也是0，才能向上移动
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board))
					{
						//当前值不为0的数字格，与上边的数字格值相等，并且中间数字格必须值也是0，才能向上移动
						//move
						showMoveAnimation(i,j,k,j);
						if(added[k][j]!=0)
						{		
							//目标落脚点是否完成过合并
							board[k+1][j] = board[i][j];
							board[i][j] = 0;
						}
						else
						{
							board[k][j] += board[i][j];
							board[i][j] = 0;
							added[k][j] = 1;
							score +=board[k][j];
							updateScore(score);
						}						
						continue;
					}
				}
			}
		}
	}
	if(isgameover()) return true;
	else
	{
		setTimeout("updateBoardView();",200);
		
		return true;		
	}
}
function moveDown()
{
	//返回值是布尔值，判断是否可以向下移动
	if(!canMoveDown(board))
	{
		//当前的格子无法移动
		return false;
	}
	
    isaddedArray();
	//完成向下的逻辑
	for(var j=0; j<4; j++)
	{
		for(var i=2; i>=0; i--)
		{
			//当前数字格有值的，一定不是0
			if(board[i][j] !=0 )
			{
				//向上移动的逻辑
				for(var k=3; k>i; k--)
				{
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board))
					{
						//当前值不为0的数字格，下边的数字格必须值为0，并且中间数字格必须值也是0，才能向下移动
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board))
					{
						//当前值不为0的数字格，与下边的数字格值相等，并且中间数字格必须值也是0，才能向下移动
						//move
						showMoveAnimation(i,j,k,j);
						if(added[k][j]!=0)
						{		
							//目标落脚点是否完成过合并
							board[k-1][j] = board[i][j];
							board[i][j] = 0;
						}
						else
						{
							board[k][j] += board[i][j];
							board[i][j] = 0;
							added[k][j] = 1;
							score +=board[k][j];
							updateScore(score);
						}						
						continue;
					}
				}
			}
		}
	}
	if(isgameover()) return true;
	else
	{
		setTimeout("updateBoardView();",200);
		
		return true;		
	}

}

function isgameover()
{
	if(nospace(board) && nomove(board))
	{
		gameover(); 
	}
}
 
function gameover(){
    $("#gameover").css('display','block');
}

function isaddedArray()
{	
	//将判断能否合并的数组值置为0
	for(var i = 0;i<4;i++)
	{
        for(var j = 0;j<4;j++)
		{
        	added[i][j] = 0;
        }
   }
}

