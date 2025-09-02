"use client"
import FormPlayerv2 from "@/components/form/FormContainerv2";
import FormContainerv3 from "@/components/form/FormContainerv3";
import {use} from 'react'
export default function FormPage({params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    console.log(id)
    return (
        
        <div>
            <FormContainerv3 formId={id}  />
        </div>
    )
}