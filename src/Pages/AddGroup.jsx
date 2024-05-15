import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ApiCalls from "@/Api/ApiCalls";
import MultipleSelect from "@/components/ui/Dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "@/components/ui/Progress";

// schema for login form 
const loginFormSchema = z.object({
  Name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  })
});

function AddGroupHandler() {
  const navigate = useNavigate();
  const [selectedNames, setSelectedNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleNameChanges = (event) => {
    setSelectedNames(event.target.value);
  };

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { Name: "" },
    placeholder: { Name: "Enter Desc" }
  });

  async function onSubmit(values) {
    setIsLoading(true); // Set loading state to true when submitting
    try {
      const body = { Name: values.Name, Users: selectedNames };
      await ApiCalls.CreateGroupHandler(body);
      navigate(`/home`);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
    setIsLoading(false); // Set loading state to false when API call finishes
  }

  return (
    <div className="w-screen max-h-full flex justify-center items-center">
      <Card className="w-screen max-h-full overflow-auto">
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
                  <MultipleSelect GroupId={null} selectedNames={selectedNames} onNameChange={handleNameChanges} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={isLoading}> { isLoading==false ? "Create Group" : <CircularIndeterminate/>}</Button> {/* Disable button if isLoading is true */}
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddGroupHandler;
