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
    const [tags, setTags] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const fetchData = async () => {
        try {
            const response = await ApiCalls.GetGroupHandler(id);
            setTags(response);
            setExpenseList(response.Expenses) // Set the fetched data in the state
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);
    

    const DeleteExpense = async (id) => {
        console.log("Expense id ",id)
        await ApiCalls.DeleteExpenseHandler({Id: id}); 
        fetchData()
   };

    return (
        <div>
            <Card className="w-[flex] m-4">
                <h4>Group - {tags.Name}</h4>
                <h2>List of People in Group</h2>

            </Card>
            <Card className="w-[flex] m-4">
                <div className="flex h-screen justify-center items-center">
                    <ScrollArea className="h-screen w-screen rounded-md border">
                        <div className="p-4">
                            <h4 className="mb-4 text-sm font-medium leading-none">Expenses</h4>
                            {console.log(expenseList)}
                            {expenseList.map((tag) => (
                                <>



                                    <div className="mr-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{tag.Description}
                                        <div className="ml-auto mr-auto">{tag.Amount}Rs</div>
                                        {console.log(tag.Id)}
                                        <div onClick={() => DeleteExpense(tag.Id)} >Delete</div>
                                       
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