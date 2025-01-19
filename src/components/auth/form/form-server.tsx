"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { login } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";

export const LoginFormServer = () => {
  const [result, action, isPending] = useActionState(login, undefined);

  return (
    <Card className="mx-auto w-1/3">
      <CardHeader>
        <CardTitle>Login With Server Ations</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div>
            <label className="block mb-1">email</label>
            <Input
              name="email"
              placeholder="email..."
              defaultValue={result?.email}
              className={cn(result?.errors?.email ? "border-red-400" : "")}
            />
            {result?.errors?.email && (
              <div className="text-red-500">{result.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="password..."
              className={cn(result?.errors?.password ? "border-red-400" : "")}
              defaultValue={result?.password}
            />
            {result?.errors?.password && (
              <div className="text-red-500">{result.errors.password}</div>
            )}
          </div>

          <div className="text-right">
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
              )}
              Submit
            </Button>
          </div>
        </form>
        <CardDescription>
          <p>email: demo@demo.com</p>
          <p>passowrd: demo</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
