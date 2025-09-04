"use client"
import FormPlayerv2 from "@/components/form/FormContainerv2";
import FormContainerv4 from "@/components/form/FormContainerv4";
import { div } from "motion/react-client";
import {use} from 'react'
export default function FormPage({params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    console.log(id)
    return (
        
<div className="min-h-screen bg-white -mt-18">
            <FormContainerv4 formId={id}  />
</div>
     
    )
}