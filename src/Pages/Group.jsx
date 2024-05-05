import ApiCalls from "@/Api/ApiCalls";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const GroupHandler = () => {
    const { id } = useParams();
    const [tags, setTags] = useState([]);
    const fetchData = async () => {
        try {
            const response = await ApiCalls.GetGroupHandler(id);
            setTags(response); // Set the fetched data in the state
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
        <div className="flex h-screen justify-center items-center">
        <ScrollArea className="h-screen w-screen rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">{tags.Id}</h4>
                {tags.map((tag) => (
                    <>
                        <div key={tag.Id} className="text-sm" >
                                {tag.Name}
                        </div>
                        <Separator className="my-2" />
                    </>
                ))}
            </div>
        </ScrollArea>
    </div>
    </div>
    )
}

export default GroupHandler