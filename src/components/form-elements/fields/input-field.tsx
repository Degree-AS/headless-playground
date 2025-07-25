'use client'

import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import { Input, InputProps } from '@/components/ui/input/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form'

interface InputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<InputProps, 'name' | 'form'> {
  form: UseFormReturn<TFieldValues>
  name: TName
  label?: string
  description?: string
}

export function InputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ form, name, label, description, ...inputProps }: InputFieldProps<TFieldValues, TName>) {
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
              <Input
                {...inputProps}
                {...field}
                value={field.value as string | number | readonly string[] | undefined}
                onChange={field.onChange as React.ChangeEventHandler<HTMLInputElement>}
                onBlur={field.onBlur as React.FocusEventHandler<HTMLInputElement>}
                error={!!fieldState.error}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
