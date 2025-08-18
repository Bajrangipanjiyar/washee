'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUser } from '@/context/user-context';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
});

function ProfileForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, login, logout } = useUser();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                phone: user.phone
            });
        }
    }, [user, form]);
    
    const onSubmit: SubmitHandler<z.infer<typeof profileSchema>> = (data) => {
        setLoading(true);
        login(data);
        toast({ title: 'Profile Saved!', description: 'You are now logged in.' });
        
        const redirectUrl = searchParams.get('redirect');
        if (redirectUrl) {
            router.push(decodeURIComponent(redirectUrl));
        } else {
            router.push('/');
        }
        setLoading(false);
    };

    const handleLogout = () => {
        logout();
        toast({ title: 'Logged Out', description: 'You have been logged out.' });
        form.reset({ name: '', phone: ''});
    }

    return (
        <div className="container flex items-center justify-center py-20 animate-fade-in-up">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{user ? 'Your Profile' : 'Login or Sign Up'}</CardTitle>
                    <CardDescription>
                        {user 
                            ? 'Here are your details. You can book a wash now.' 
                            : 'Please enter your details to continue with your booking.'
                        }
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Enter your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Enter 10-digit number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? 'Saving...' : 'Save & Continue'}
                            </Button>
                            {user && (
                                <Button type="button" variant="outline" onClick={handleLogout} className="w-full">
                                    Logout
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}


export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="text-center p-20">Loading...</div>}>
            <ProfileForm />
        </Suspense>
    )
}
