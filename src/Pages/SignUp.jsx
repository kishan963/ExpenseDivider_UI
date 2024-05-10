
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
import { Link, useNavigate } from "react-router-dom"


// schema for login form 
const loginFormSchema = z.object({
    Username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    Email: z.string().min(3, {
        message: "Email must be at least 3 characters.",
    }),
    Phone: z.string().min(7, {
        message: "Phone Number must be at least 7 digits"
    })
})


function SignUp() {
    const navigate = useNavigate()
    // 1. Define your loginForm.
    const loginForm = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            Username: "",
            Email: "",
            Phone: ""
        },
        placeholder: {
            Username: "Enter username",
            Email: "Enter your email",
            Phone: "Enter your mobile number"
        }
    })
    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        NavigateToLogin(values)
    }

    async function NavigateToLogin(values) {
        try {
            await ApiCalls.SignUpHandler(values) // Wait for the API call to finish
            navigate(`/login`); // Navigate after the API call is finished
        } catch (error) {
            console.error('Error adding expense:', error);
            // Handle error if needed
        }
    }

    return (
        <div className="w-full h-[100vh] flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={loginForm.control}
                                name="Username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={loginForm.control}
                                name="Email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="Phone"
                                render={({ field }) => (
                                    <FormItem>
                                        {console.log(field)}
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <CardFooter className="flex justify-between">
                                <Link to={`../login`}>
                                    <Button variant="outline">Login</Button>
                                </Link>
                                
                                <Button type="submit">SignUp</Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>

            </Card>

        </div>

    );

}

export default SignUp
