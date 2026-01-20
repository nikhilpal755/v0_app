"use client";
import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { PROJECT_TEMPLATES } from '@/utils/constants';

import z from "zod";
import { cn } from '@/lib/utils';
import { FormField } from '@/components/ui/form';
import TextareaAutosize from 'react-textarea-autosize';
import { ArrowUpIcon } from 'lucide-react';
const formShema = z.object({
  content: z
    .string()
    .min(1, "Project description is required")
    .max(1000, "Description is too long")
})

const ProjectForm = () => {
  const [isFocus, setIsFocus] = useState(false);

  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      content: ""
    }
  })

  const onsubmit = (data: z.infer<typeof formShema>) => {
    console.log("Form submitted with data:", data);
  }

  const handleTemplateClick = (prompt: string) => {
    console.log("Template clicked:", prompt);
    form.setValue("content", prompt);
  }

  return (
    <div className='space-y-8'>

      {/* Tempalate grid on dashboard for default prompts  */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {PROJECT_TEMPLATES.map((template, index) => (
          <button
            type='button'
            key={index}
            onClick={() => handleTemplateClick(template.prompt)}
            className='group relative p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all
            duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md
            hover:border-primary/30'>
            <div className='flex flex-col gap-2'>
              <span className='text-3xl' role='img' aria-label={template.title}>{template.emoji}</span>
              <h3 className='text-sm font-medium group-hover:text-primary transition-colors'>{template.title}</h3>
            </div>
            <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
          </button>
        )
        )}
      </div>

      {/* Divider  */}
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-background px-2 text-muted-foreground text-sm'>Or describe your own project</span>
        </div>
      </div>

      {/* Project description form  */}
        <form id='initial-prompt-form' onSubmit={form.handleSubmit(onsubmit)} 
        className={cn('border rounded-lg p-4 transition-shadow duration-200',
        isFocus ? 'shadow-md border-primary/30' : 'shadow-sm border-border')}>

          <FormField 
          control={form.control}
          name="content"
          render = {({ field }) => (
            <TextareaAutosize
            {...field}
            minRows={2}
            maxRows={10}
            placeholder='Describe your project...'
            onFocus ={() => setIsFocus(true)}
            onBlur ={() => setIsFocus(false)}
            className='w-full resize-none bg-transparent outline-none border-0 
            focus:ring-0 text-base leading-6 placeholder:text-muted-foreground'
            onKeyDown={(e) => {
              if(e.key === "Enter" && (e.ctrlKey || e.metaKey)){
                e.preventDefault();
                form.handleSubmit(onsubmit)(e);
              }
            }}
            />
          )}
          />

          <div className='flex gap-x-2 items-center justify-between pt-2'>
            {/* enter icon  */}
            <span className='text-sm text-muted-foreground'> Press
              <kbd className='px-1.5 py-0.5 bg-muted rounded-md text-xs'>Enter</kbd>&nbsp; to submit</span>
            <button 
            type='submit'
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className='p-2 rounded-md bg-primary hover:bg-primary/80'>
              <ArrowUpIcon className='size-4'/>
            </button>
          </div>

        </form>
    </div>
  )
}

export default ProjectForm