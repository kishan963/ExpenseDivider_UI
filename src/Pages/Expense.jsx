import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ApiCalls from "@/Api/ApiCalls";
import MultipleSelect from "@/components/ui/Dropdown";
import SingleSelect from "@/components/ui/SingleSelect";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularIndeterminate from "@/components/ui/Progress";

// schema for login form 
const loginFormSchema = z.object({
  Description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
  Amount: z.string().min(1, {
    message: "Amount must be at least 1 digits"
  })
});

function ExpenseHandler() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChanges = (event) => {
    setSelectedNames(event.target.value);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

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
  });

  async function onSubmit(values) {
    setIsLoading(true); // Set loading state to true before making the API call
    try {
      const body = {
        Description: values.Description,
        Amount: JSON.parse(values.Amount),
        GroupId: JSON.parse(id),
        PaidBy_User: selectedName.Id,
        Users: selectedNames
      };
      await ApiCalls.AddExpenseHandler(body); // Wait for the API call to finish
      navigate(`/group/${id}`); // Navigate after the API call is finished
    } catch (error) {
      console.error('Error adding expense:', error);
    }
    setIsLoading(false); // Set loading state to false after the API call is completed
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
                      <Input placeholder="Enter description" {...field} />
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
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount" {...field} />
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
                <Button type="submit" disabled={isLoading}>
                  { isLoading ? <CircularIndeterminate /> : "Submit" }
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExpenseHandler;
