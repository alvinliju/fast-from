"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {use} from 'react'
import FormBuilder from "../page";
import { title } from "process";

const dummyContent = [
    {
        type:"formTitle",
        props:{
             title: "Dummy Form Title"
        }
    },
    {
        type:"shortText",
        props:{
            question:"What is your name",
            placeholder:"Enter your name"
        }
    }
]

export default function FormEditPage({ params }: { params: Promise<{ id: string }>  }) {
    const [fromData, setFormData] = useState("")
  const { getToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params)

  useEffect(() => {
   
    console.log("Form ID from params:", id);
    
    const loadForm = async () => {
      try {
        console.log("Attempting to fetch form...");
        const token = await getToken();
        console.log("Got token, making request...");
        
        const response = await fetch(`http://localhost:3001/api/forms/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log("Response status:", response.status);
        
        if (response.ok) {
          const formData = await response.json();
          console.log("Form data received:", formData);
          // Here you would pass this data to your form builder
        } else {
          console.log("Failed to fetch form");
        }
      } catch (error) {
        console.error("Error loading form:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadForm();
    }
  }, [id]);

  if (loading) {
    return <div>Loading form...</div>;
  }

  return (
    <FormBuilder
    formId={id}
    initialContent={dummyContent}
    formMetadata={{title:"Dummy content"}}
    ></FormBuilder>
  )
}