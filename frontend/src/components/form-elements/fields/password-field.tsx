'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import { Button, Input } from '@/components/ui'
import { InputProps } from '@/components/ui/input/input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../form'

interface PasswordFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<InputProps, 'name' | 'type' | 'form'> {
  form: UseFormReturn<TFieldValues>
  name: TName
  label?: string
  description?: string
}

export function PasswordField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ form, name, label, description, ...inputProps }: PasswordFieldProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const fieldState = form.getFieldState(name)
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="relative">
                <Input
                  {...inputProps}
                  value={field.value as string | number | readonly string[] | undefined}
                  onChange={field.onChange as React.ChangeEventHandler<HTMLInputElement>}
                  onBlur={field.onBlur as React.FocusEventHandler<HTMLInputElement>}
                  name={field.name}
                  ref={field.ref}
                  type={showPassword ? 'text' : 'password'}
                  error={!!fieldState.error}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
