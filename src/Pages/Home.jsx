import ApiCalls from "@/Api/ApiCalls"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';



const Home = () => {

    const [tags, setTags] = useState([]);
    const fetchData = async () => {
        try {
            const response = await ApiCalls.GetUserGroupsHandler();
            setTags(response); // Set the fetched data in the state
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex h-screen justify-center items-center">
            <ScrollArea className="h-screen w-screen rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">Groups</h4>
                    {tags.map((tag) => (

                        <>
                            <div key={tag.Id} className="text-sm" >
                                <Link to={`../group/${tag.Id}`}>
                                    {tag.Name}
                                </Link>
                            </div>
                            <Separator className="my-2" />
                        </>
                    ))}
                </div>
                <div>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Fab variant="extended" color="primary">
                    <NavigationIcon sx={{ mr: 1 }} />
                    <Link to={`../createGroup`}>
                        Create Group
                    </Link>

                </Fab>
            </Box>
                </div>
            </ScrollArea>
           
            
        </div>
    )
}

export default Home