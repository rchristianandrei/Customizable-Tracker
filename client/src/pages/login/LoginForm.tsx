import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface LoginFormProps {
  onLogin?: (data: {
    email: string;
    password: string;
    // remember: boolean;
  }) => Promise<void> | void;
  onRegister?: () => void;
  onForgotPassword?: () => void;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "field is required",
    })
    .regex(/\S+@\S+\.\S+/, {
      message: "Invalid email address",
    }),
  password: z
    .string()
    .min(2, {
      message: "field is required",
    })
    .max(20, {
      message: "must be at most 20 characters",
    }),
  // remember: z.boolean(),
});

export function LoginForm({
  onLogin,
  onRegister,
  onForgotPassword,
}: LoginFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // remember: false,
    },
    mode: "onSubmit",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      await onLogin?.(data);
      form.reset();
      toast.success("Sucessfully Logged In");
    } catch (error: any) {
      setError(() => error.response?.data ?? "Unavailable to Login");
      toast.error("Failed to Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FieldGroup className="">
              <Controller
                name="email"
                disabled={loading}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Password */}
            <FieldGroup className="">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldGroup className="flex flex-row justify-between">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={onForgotPassword}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        Forgot password?
                      </button>
                    </FieldGroup>

                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        disabled={loading}
                        {...field}
                      />

                      <button
                        type="button"
                        disabled={loading}
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Remember Me */}
            {/* <FieldGroup className="flex-row gap-1">
              <Controller
                name="remember"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        aria-invalid={fieldState.invalid}
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm leading-none"
                      >
                        Remember me
                      </FieldLabel>
                    </Field>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup> */}

            {/* Error */}
            {error && (
              <FieldGroup className="text-center text-sm text-destructive">
                {error}
              </FieldGroup>
            )}

            {/* Buttons */}
            <div className="flex flex-col space-y-3">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onRegister}
                disabled={loading}
              >
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
