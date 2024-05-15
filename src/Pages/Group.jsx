import ApiCalls from "@/Api/ApiCalls";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from "react-router-dom";



const GroupHandler = () => {
    const { id } = useParams();
    const User_id = JSON.parse(localStorage.getItem('user_id'));
    const [tags, setTags] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [userbalance, setUserBalance] = useState([]);
    const fetchData = async () => {
        try {
            const response = await ApiCalls.GetGroupHandler(id);
            setTags(response);
            setExpenseList(response.Expenses) // Set the fetched data in the state
        } catch (err) {
            console.error('Error fetching data:', err);
        }

        try {
            const response = await ApiCalls.GetUserBalanceHandler(id);
            setTags(response);
            setUserBalance(response) // Set the fetched data in the state
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);


    const DeleteExpense = async (id) => {
        console.log("Expense id ", id)
        await ApiCalls.DeleteExpenseHandler({ Id: id });
        fetchData()
    };

    return (
        <div>
            <h4>Group - {tags.Name}</h4>
            <h2>List of People in Group</h2>
            {/* <Card className="w-[flex] h-[flex] m-4"> */}



            <div className="flex justify-center items-center">
                <ScrollArea className=" w-screen rounded-md ">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Balance</h4>

                        {userbalance.map((tag) => (
                            <>

                                <div className="mr-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <span style={{ color: tag.By_user === User_id ? 'green' : 'red' }}>
                                        {tag.By_user === User_id ? `${tag.For_user_name} owes you Rs. ${tag.Amount}` : `You owe ${tag.By_user_name} Rs. ${tag.Amount}`}
                                    </span>


                                </div>
                                <Separator className="my-2" />
                            </>



                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* </Card> */}
            <Card className="w-[flex] m-4">
                <div className="flex  justify-center items-center">
                    <ScrollArea className=" w-screen rounded-md border">
                        <div className="p-4">
                            <h4 className="mb-4 text-sm font-medium leading-none">Expenses</h4>
                            {console.log(expenseList)}
                            {expenseList.map((tag) => (
                                <>



                                    <div className="mr-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>{tag.Description}</div> {/* Description at the left */}
                                        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>{tag.Amount}Rs</div> {/* Amount centered with margin auto */}
                                        <div onClick={() => DeleteExpense(tag.Id)}>Delete</div> {/* Delete button at the right */}
                                    </div>


                                    <Separator className="my-2" />
                                </>



                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Fab variant="extended" color="primary">
                    <NavigationIcon sx={{ mr: 1 }} />
                    <Link to={`../expense/${id}`}>
                        Add Expense
                    </Link>

                </Fab>
            </Box>

        </div>
    )
}

export default GroupHandler