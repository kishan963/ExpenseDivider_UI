

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import ApiCalls from "@/Api/ApiCalls"
import MultipleSelect from "@/components/ui/Dropdown"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


// schema for login form 
const loginFormSchema = z.object({
  Name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  })
})


function AddGroupHandler() {
  const navigate = useNavigate();
  const [selectedNames, setSelectedNames] = useState([]);
  const handleNameChanges = (event) => {
    setSelectedNames(event.target.value);
  };
  // 1. Define your loginForm.
  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      Name: ""
    },
    placeholder: {
      Name: "Enter Desc"
    }
  })
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    console.log(selectedNames)
    const body = {
      Name: values.Name,
      Users: selectedNames
    }
    console.log(body)
    addExpenseAndNavigate(body);
   
    
    
}

async function addExpenseAndNavigate(body) {
  try {
    await ApiCalls.CreateGroupHandler(body); // Wait for the API call to finish
    navigate(`/home`); // Navigate after the API call is finished
  } catch (error) {
    console.error('Error adding expense:', error);
    // Handle error if needed
  }
}

return (
  <div className="w-screen max-h-full flex justify-center items-center">
    <Card className="w-screen max-h-full  overflow-auto">
      <CardHeader>
        <CardTitle>Create Group</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={loginForm.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           

            <FormItem>
              <FormLabel>PaidTo</FormLabel>
              <FormControl>
                <MultipleSelect selectedNames={selectedNames} onNameChange={handleNameChanges} />
              </FormControl>
              <FormMessage />
            </FormItem>




            <CardFooter className="flex justify-between">
              <Button type="submit">Create Group</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>

    </Card>

  </div>

);

}

export default AddGroupHandler
