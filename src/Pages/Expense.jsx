

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
import SingleSelect from "@/components/ui/SingleSelect"
import { useNavigate, useParams } from "react-router-dom"


// schema for login form 
const loginFormSchema = z.object({
  Description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
  Amount: z.string().min(1, {
    message: "Amount must be at least 1 digits"
  })
})


function ExpenseHandler() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedNames, setSelectedNames] = useState([]);
  const handleNameChanges = (event) => {
    setSelectedNames(event.target.value);
  };

  const [selectedName, setSelectedName] = useState([]);
  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };
  // 1. Define your loginForm.
  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      Description: "",
      Amount: ""
    },
    placeholder: {
      Description: "Enter Desc",
      Amount: "Enter Amount"
    }
  })
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    console.log(selectedName)
    console.log(selectedNames)
    const body = {
      Description: values.Description,
      Amount: JSON.parse(values.Amount),
      GroupId: JSON.parse(id),
      PaidBy_User: selectedName.Id,
      Users: selectedNames
    }
    console.log(body)
    addExpenseAndNavigate(body);
   
    
    
}

async function addExpenseAndNavigate(body) {
  try {
    await ApiCalls.AddExpenseHandler(body); // Wait for the API call to finish
    navigate(`/group/${id}`); // Navigate after the API call is finished
  } catch (error) {
    console.error('Error adding expense:', error);
    // Handle error if needed
  }
}

return (
  <div className="w-screen h-screen flex justify-center items-center">
    <Card className="w-screen max-h-full overflow-auto">
      <CardHeader>
        <CardTitle>Add Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={loginForm.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="Amount"
              render={({ field }) => (
                <FormItem>
                  {console.log(field)}
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}


            />

            <FormItem>
              <FormLabel>PaidBy</FormLabel>
              <FormControl>
                <SingleSelect GroupId={id} selectedNames={selectedName} onNameChange={handleNameChange} />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>PaidTo</FormLabel>
              <FormControl>
                <MultipleSelect GroupId={id} selectedNames={selectedNames} onNameChange={handleNameChanges} />
              </FormControl>
              <FormMessage />
            </FormItem>




            <CardFooter className="flex justify-between">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>

    </Card>

  </div>

);

}

export default ExpenseHandler
