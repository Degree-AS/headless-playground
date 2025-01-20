"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { login } from "@/actions";
import { schema } from "./login-form.schema";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const form = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "demo@demo.com",
      password: "demo",
    },
  });

  const {
    formState: { errors, touchedFields, isValid },
  } = form;

  const [result, action, isPending] = useActionState(login, undefined);

  return (
    <Card className="mx-auto w-1/3">
      <CardHeader>
        <CardTitle>Login with React Hook Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={action} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={errors.email ? "border-red-400" : touchedFields.email ? "border-green-600" : ""}
                      placeholder="email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className={errors.password ? "border-red-400" : touchedFields.password ? "border-green-600" : ""}
                      type="password"
                      placeholder="password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {result?.errors && (
              <div className="p-4 rounded-md bg-red-950 text-white">
                <p>{JSON.stringify(result.errors)}</p>
              </div>
            )}
            <div className="text-right">
              <Button type="submit" disabled={!isValid || isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
